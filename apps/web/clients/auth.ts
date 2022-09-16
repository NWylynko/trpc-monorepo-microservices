import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AuthAppRouter } from 'auth';
import { env } from '../env';

export const auth = createTRPCProxyClient<AuthAppRouter>({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_AUTH_URL}/trpc`,
    }),
  ],
});
