import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  PORT: z.string().transform((port) => Number(port))
})

const { PORT } = schema.parse(process.env);

export const env = {
  port: PORT,
}
