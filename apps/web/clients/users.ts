import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AuthAppRouter } from 'auth';
import { env } from '../env';

export const users = createTRPCProxyClient<AuthAppRouter>({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_USERS_URL}/trpc`,
    }),
  ],
});
