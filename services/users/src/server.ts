import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import fastify from 'fastify';
import cors from '@fastify/cors'

import { createContext } from './context';
import { usersAppRouter } from './router';

export const server = fastify({
  maxParamLength: 5000,
  logger: true
});

server.register(cors, {
  origin: `http://localhost:3000`
})

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: usersAppRouter, createContext },
});

