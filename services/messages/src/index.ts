import "source-map-support/register"
import "dotenv/config"

export type { MessagesAppRouter } from "./router"

import { server } from "./server";
import { env } from "./env";

(async () => {
  try {
    await server.listen({ port: env.port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
