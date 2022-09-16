/* eslint-disable turbo/no-undeclared-env-vars */
import "dotenv/config";

const port = process.env.PORT

if (!port) {
  throw new Error(`The environment variable PORT is not defined`);
}

const usersUrl = process.env.USERS_URL

if (!usersUrl) {
  throw new Error(`The environment variable USERS_URL is not defined`);
}

export const env = {
  port: Number(port),
  usersUrl
}
