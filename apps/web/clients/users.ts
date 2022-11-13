import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { UsersAppRouter } from 'users';
import { env } from '../env';

export const users = createTRPCProxyClient<UsersAppRouter>({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_USERS_URL}/trpc`,
    }),
  ],
});
