import { createContext, useContext, useState } from "react";
import { client } from "../clients";
import type { AuthDetails } from "../pages/login";
import type { inferProcedureOutput } from "@trpc/server";
import type { AuthAppRouter } from "auth";

type Auth = inferProcedureOutput<AuthAppRouter["login"]>;

type AuthContextValues = {
  login: (details: AuthDetails) => Promise<void>;
  register: (details: AuthDetails) => Promise<void>;
} & (
  | {
      loading: false;
      loggedIn: true;
      error: undefined;
      auth: Auth;
    }
  | {
      loading: boolean;
      loggedIn: false;
      error?: string;
      auth: undefined;
    }
);

const AuthContext = createContext<AuthContextValues>({
  login: async () => {},
  register: async () => {},
  loading: true,
  loggedIn: false,
  auth: undefined,
});

interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [auth, setAuth] = useState<Auth>();

  const login = async (details: AuthDetails) => {
    setLoading(true);

    try {
      const result = await client.auth.login.mutate(details);
      setAuth(result);
      setLoggedIn(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (details: AuthDetails) => {
    setLoading(true);

    try {
      const result = await client.auth.register.mutate(details);
      setAuth(result);
      setLoggedIn(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const values: AuthContextValues = {
    login,
    register,
    auth,
    loggedIn,
    loading,
    error,
  } as AuthContextValues;

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
