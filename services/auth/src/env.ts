import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  PORT: z.string().transform((port) => Number(port)),
  USERS_URL: z.string()
})

const { PORT, USERS_URL } = schema.parse(process.env);

export const env = {
  port: PORT,
  usersUrl: USERS_URL
}
