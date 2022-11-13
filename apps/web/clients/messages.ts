import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { MessagesAppRouter } from 'messages';
import { env } from '../env';

export const messages = createTRPCProxyClient<MessagesAppRouter>({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_MESSAGES_URL}/trpc`,
    }),
  ],
});
