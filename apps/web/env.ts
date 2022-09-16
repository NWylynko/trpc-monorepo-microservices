/* eslint-disable turbo/no-undeclared-env-vars */
import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_USERS_URL: z.string().url(),
  NEXT_PUBLIC_AUTH_URL: z.string().url(),
  NEXT_PUBLIC_GROUPS_URL: z.string().url(),
  NEXT_PUBLIC_MESSAGES_URL: z.string().url(),
})

export const env = schema.parse({
  NEXT_PUBLIC_USERS_URL: process.env.NEXT_PUBLIC_USERS_URL,
  NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
  NEXT_PUBLIC_GROUPS_URL: process.env.NEXT_PUBLIC_GROUPS_URL,
  NEXT_PUBLIC_MESSAGES_URL: process.env.NEXT_PUBLIC_MESSAGES_URL,
});
