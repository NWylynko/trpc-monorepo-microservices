import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "../providers/AuthProvider";
import type { AuthDetails } from "./login";
import { authSchema } from "./login";

export default function RegisterPage() {
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDetails>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = handleSubmit(async (details) => {
    await auth.register(details);
    router.push(`/createAccount`);
  });

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="email" {...register("email")} />
        {errors.email?.message && <span>{errors.email?.message}</span>}
        <input placeholder="password" {...register("password")} />
        {errors.password?.message && <span>{errors.password?.message}</span>}
        <button type="submit">Continue</button>
      </form>
    </>
  );
}
