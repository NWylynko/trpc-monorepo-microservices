import { users } from "../clients/users";
import { groupIdSchema, groups } from "../groups";
import { t } from "../trpc";

export const usersRouter = t.router({
  add: t.procedure
    .input(groupIdSchema)
    .mutation(async ({ input, ctx: { user } }) => {
      const { groupId } = input;
      const { userId } = user;

      const group = groups.get(groupId);

      if (!group) {
        throw new Error(`group does not exist`);
      }

      group.users.add(userId);

      await users.groups.add.mutate({ groupId }, {
        context: { user: { userId } }
      })

      return { groupId, userId }
    }),
  remove: t.procedure
    .input(groupIdSchema)
    .mutation(async ({ input, ctx: { user } }) => {
      const { groupId } = input;
      const { userId } = user;

      const group = groups.get(groupId);

      if (!group) {
        throw new Error(`group does not exist`);
      }

      group.users.delete(userId);

      const numberOfUsers = group.users.size

      if (numberOfUsers <= 0) {

        // if nobody is left in the group, delete it
        groups.delete(groupId)
      }

      await users.groups.remove.mutate({ groupId }, {
        context: { user: { userId } }
      })

      return { groupId, userId }
    }),
});
