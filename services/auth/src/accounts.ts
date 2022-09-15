import { randomUUID } from "node:crypto";
import { z } from "zod";

export const accountSchema = z.object({
  accountId: z.string().uuid().default(() => randomUUID()),
  email: z.string().email(),
  password: z.string()
})

type Account = z.infer<typeof accountSchema> &
{
  userId: string;
}

export const accounts = new Map<string, Account>();

const katt: Account = {
  accountId: randomUUID(),
  userId: randomUUID(),
  email: 'katt@email.com',
  password: 'super-secret'
};

accounts.set(katt.email, katt);
