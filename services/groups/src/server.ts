import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { createContext } from './context';
import { groupsAppRouter } from './router';

export const server = fastify({
  maxParamLength: 5000,
  logger: true
});

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: groupsAppRouter, createContext },
});

