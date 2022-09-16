import { t } from "../trpc";
import { z } from "zod"
import { users, userSchema } from "../users";

export const groupIdSchema = z.object({
  groupId: z.string().uuid()
})

export const groupsRouter = t.router({
  add: t.procedure
    .input(groupIdSchema)
    .mutation(async ({ input, ctx }) => {
      const { groupId } = input;
      const { userId } = await userSchema.parseAsync(ctx.user)

      const user = users.get(userId)

      if (!user) {
        throw new Error(`user does not exist`)
      }

      user.groups.add(groupId);

      return { userId, groupId }
    }),
  remove: t.procedure
    .input(groupIdSchema)
    .mutation(async ({ input, ctx }) => {
      const { groupId } = input;
      const { userId } = await userSchema.parseAsync(ctx.user)

      const user = users.get(userId)

      if (!user) {
        throw new Error(`user does not exist`)
      }

      user.groups.delete(groupId);

      return { userId, groupId }
    })
});
