import { initTRPC } from '@trpc/server';
import { z } from "zod"
import merge from 'lodash.merge';
import { users } from "./users";
import { randomUUID } from "node:crypto";

export const t = initTRPC.create();

const userSchema = z.object({
  userId: z.string().uuid().default(() => randomUUID()),
  email: z.string().email(),
  name: z.string().optional(),
  status: z.string().optional(),
})

export type User = z.infer<typeof userSchema>

const userIdSchema = z.object({
  userId: z.string().uuid()
})

export const appRouter = t.router({
  create: t.procedure
    .input(userSchema)
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
    .input(userSchema)
    .mutation(async ({ input: updateUser }) => {
      const { userId } = updateUser

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
    })
});

export type UsersAppRouter = typeof appRouter;