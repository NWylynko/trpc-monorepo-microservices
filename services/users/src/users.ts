import { randomUUID } from "node:crypto";
import { z } from "zod";

// whats needed to look up the object
export const userIdSchema = z.object({
  userId: z.string().uuid()
})

export const newUserSchema = z.object({

  // details needed to create object
  email: z.string().email(),

  // setup things that can't be edited directly
  userId: z.string().uuid().default(() => randomUUID()),
  groups: z.set(z.string()).default(() => new Set<string>())
})

// these are things that can be edited directly
export const updateUserSchema = z.object({
  name: z.string().optional(),
  status: z.string().optional(),
})

// combine it all together to make the object
// you probably won't even need this, but we want its type
export const userSchema =
  userIdSchema.merge(
    newUserSchema.merge(
      updateUserSchema
    )
  )

export type User = z.infer<typeof userSchema>

export const users = new Map<string, User>();
