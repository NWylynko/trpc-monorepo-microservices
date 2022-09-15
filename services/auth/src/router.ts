import "source-map-support/register"
import "dotenv/config"

import { initTRPC } from '@trpc/server';
import { accounts, accountSchema } from "./accounts";
import { users } from "./clients/users";

export const t = initTRPC.create();

export const appRouter = t.router({
  register: t.procedure
    .input(accountSchema)
    .mutation(async ({ input: details }) => {
      const { email } = details;

      const { userId } = await users.create.mutate({ email })

      accounts.set(email, { ...details, userId })

      return { userId, email }

    }),
  login: t.procedure
    .input(accountSchema)
    .query(async ({ input: details }) => {
      const { email, password } = details;

      const account = accounts.get(email);

      if (!account) {
        throw new Error(`account does not exist`)
      }

      if (account.password !== password) {
        throw new Error(`Password does not match`)
      }

      const token = `123-very-long-token-321`

      return {
        ...account,
        token
      }
    })
});

export type AuthAppRouter = typeof appRouter;