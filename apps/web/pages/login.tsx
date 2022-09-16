import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "../clients";

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

type Schema = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (details) => {
    const result = await client.auth.login.mutate(details);
    console.log({ result });
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
