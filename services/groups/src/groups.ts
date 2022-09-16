import { randomUUID } from "node:crypto";
import { z } from "zod";

export const groupIdSchema = z.object({
  groupId: z.string().uuid()
})

export const newGroupSchema = z.object({

  name: z.string(),

  groupId: z.string().uuid().default(() => randomUUID()),
  users: z.set(z.string()).default(() => new Set<string>())
})

export const updateGroupSchema = z.object({

  // need to be careful here,
  // we want to pass through the groupId,
  // but we don't want to let users update the groupId
  groupId: z.string().uuid(),
  name: z.string()
})

export const groupSchema =
  groupIdSchema.merge(
    newGroupSchema.merge(
      updateGroupSchema
    )
  )

export type Group = z.infer<typeof groupSchema>

export const groups = new Map<string, Group>();

