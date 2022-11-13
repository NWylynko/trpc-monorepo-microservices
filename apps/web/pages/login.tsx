import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../providers/AuthProvider";

export const authSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type AuthDetails = z.infer<typeof authSchema>;

export default function LoginPage() {
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
    await auth.login(details);
    router.push(`/`);
  });

  return (
    <>
      <h2>Login</h2>
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
