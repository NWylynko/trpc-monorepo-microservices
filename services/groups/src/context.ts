import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { z } from "zod";

const headersSchema = z.object({
  token: z.string()
})

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const { token } = headersSchema.parse(req.headers)

  const user = {
    userId: token
  }

  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;