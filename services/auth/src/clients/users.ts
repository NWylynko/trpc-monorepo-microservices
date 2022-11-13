import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { UsersAppRouter } from 'users';
import { env } from '../env';

const url = env.usersUrl + '/trpc'

export const users = createTRPCProxyClient<UsersAppRouter>({
  links: [
    httpBatchLink({
      url,
    }),
  ],
});