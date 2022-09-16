import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import fastify from 'fastify';
import cors from '@fastify/cors'
import Websocket from "@fastify/websocket"

import { createContext } from './context';
import { messagesAppRouter } from './router';

export const server = fastify({
  maxParamLength: 5000,
  logger: true
});

server.register(cors, {
  origin: `http://localhost:3000`
})

server.register(Websocket);

server.register(fastifyTRPCPlugin, {
  useWSS: true,
  prefix: '/trpc',
  trpcOptions: { router: messagesAppRouter, createContext },
});

