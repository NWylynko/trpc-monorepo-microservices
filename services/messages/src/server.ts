import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import Websocket from "@fastify/websocket"
import { createContext } from './context';
import { messagesAppRouter } from './router';

export const server = fastify({
  maxParamLength: 5000,
  logger: true
});

server.register(Websocket);

server.register(fastifyTRPCPlugin, {
  useWSS: true,
  prefix: '/trpc',
  trpcOptions: { router: messagesAppRouter, createContext },
});

