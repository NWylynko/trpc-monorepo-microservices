import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AuthAppRouter } from 'auth';
import { env } from '../env';

export const groups = createTRPCProxyClient<AuthAppRouter>({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_GROUPS_URL}/trpc`,
    }),
  ],
});
