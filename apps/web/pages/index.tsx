import Link from "next/link";
import { useAuth } from "../providers/AuthProvider";

export default function Web() {
  const { auth, loggedIn } = useAuth();

  return (
    <div>
      <h1>Web</h1>
      {loggedIn && <pre>{JSON.stringify(auth, null, 2)}</pre>}
      {!loggedIn && (
        <>
          <Link passHref href="/login">
            <a>
              <button>Login</button>
            </a>
          </Link>
          <Link passHref href="/register">
            <a>
              <button>Register</button>
            </a>
          </Link>
        </>
      )}
    </div>
  );
}
