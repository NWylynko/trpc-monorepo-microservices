/* eslint-disable turbo/no-undeclared-env-vars */
import "dotenv/config";

const port = process.env.PORT

if (!port) {
  throw new Error(`The environment variable PORT is not defined`);
}

export const env = {
  port: Number(port)
}
