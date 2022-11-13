import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { GroupsAppRouter } from 'groups';
import { env } from '../env';

export const groups = createTRPCProxyClient<GroupsAppRouter>({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_GROUPS_URL}/trpc`,
    }),
  ],
});
