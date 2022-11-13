import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { client } from "../clients";
import { useAuth } from "../providers/AuthProvider";

export const userSchema = z.object({
  name: z.string(),
  status: z.string(),
});

export type UserDetails = z.infer<typeof userSchema>;

export default function CreateAccount() {
  const { loggedIn, auth } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = handleSubmit(async (details) => {
    const result = await client.users.update.mutate(details);
    console.log({ result });
    router.push(`/`);
  });

  return (
    <>
      <h2>Create Account</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="name" {...register("name")} />
        {errors.name?.message && <span>{errors.name?.message}</span>}
        <input placeholder="status" {...register("status")} />
        {errors.status?.message && <span>{errors.status?.message}</span>}
        <button type="submit">Continue</button>
      </form>
    </>
  );
}
