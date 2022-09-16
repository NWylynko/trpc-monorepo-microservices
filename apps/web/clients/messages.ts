import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AuthAppRouter } from 'auth';
import { env } from '../env';

export const messages = createTRPCProxyClient<AuthAppRouter>({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_MESSAGES_URL}/trpc`,
    }),
  ],
});
