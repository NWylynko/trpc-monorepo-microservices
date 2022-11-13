import { accounts, accountSchema } from "./accounts";
import { users } from "./clients/users";
import { t } from './trpc';

export const authAppRouter = t.router({
  register: t.procedure
    .input(accountSchema)
    .mutation(async ({ input: details }) => {
      const { email } = details;

      const { userId } = await users.create.mutate({ email })

      const account = { ...details, userId }

      accounts.set(email, account)

      const token = account.userId

      return { ...account, token }

    }),
  login: t.procedure
    .input(accountSchema)
    .mutation(async ({ input: details }) => {
      const { email, password } = details;

      const account = accounts.get(email);

      if (!account) {
        throw new Error(`account does not exist`)
      }

      if (account.password !== password) {
        throw new Error(`Password does not match`)
      }

      const token = account.userId

      return {
        ...account,
        token
      }
    })
});

export type AuthAppRouter = typeof authAppRouter;
