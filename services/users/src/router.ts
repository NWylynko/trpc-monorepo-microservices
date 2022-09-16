import merge from 'lodash.merge';
import { groupsRouter } from './routers/groups';
import { t } from './trpc';
import { newUserSchema, updateUserSchema, userIdSchema, users } from "./users";

export const usersAppRouter = t.router({
  create: t.procedure
    .input(newUserSchema)
    .mutation(async ({ input: newUser }) => {
      users.set(newUser.userId, newUser)
      return newUser
    }),
  get: t.procedure
    .input(userIdSchema)
    .query(async ({ input }) => {
      const user = users.get(input.userId)

      if (!user) {
        throw new Error(`user does not exist`)
      }

      return user;
    }),
  update: t.procedure
    .input(updateUserSchema)
    .mutation(async ({ input: updateUser, ctx: { user } }) => {
      const { userId } = user

      if (!users.has(userId)) {
        throw new Error(`user does not exist`)
      }

      const existingUser = users.get(userId)
      const updatedUser = merge(updateUser, existingUser);
      users.set(userId, updatedUser)
      return updatedUser
    }),
  delete: t.procedure
    .input(userIdSchema)
    .mutation(async ({ input }) => {
      const { userId } = input

      users.delete(userId);

      return userId;
    }),
  groups: groupsRouter
});

export type UsersAppRouter = typeof usersAppRouter;
