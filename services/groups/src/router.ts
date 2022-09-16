import { usersRouter } from './routers/users';
import { Group, groupIdSchema, groups, newGroupSchema, updateGroupSchema, } from "./groups";
import { t } from './trpc';

export const groupsAppRouter = t.router({
  create: t.procedure
    .input(newGroupSchema)
    .mutation(async ({ input, ctx: { user } }) => {
      const { groupId, users, name } = input;
      const { userId } = user;

      users.add(userId);

      const group: Group = {
        groupId,
        users,
        name
      }

      groups.set(groupId, group)

      return group
    }),
  get: t.procedure
    .input(groupIdSchema)
    .query(async ({ input, ctx: { user } }) => {
      const { groupId } = input;

      const group = groups.get(groupId);

      if (!group) {
        throw new Error(`this group does not exist`)
      }

      return group
    }),
  update: t.procedure
    .input(updateGroupSchema)
    .mutation(async ({ input, ctx: { user } }) => {
      const { groupId, name } = input;

      const group = groups.get(groupId);

      if (!group) {
        throw new Error(`this group does not exist`)
      }

      group.name = name;

      return group
    }),
  users: usersRouter
});

export type GroupsAppRouter = typeof groupsAppRouter;