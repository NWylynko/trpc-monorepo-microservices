import { randomUUID } from 'node:crypto';
import { t } from './trpc';
import { z } from "zod";
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'stream';

const groupSchema = z.object({
  groupId: z.string().uuid()
})

const messageSchema = groupSchema.merge(
  z.object({
    text: z.string(),
    messageId: z.string().uuid().default(() => randomUUID()),
    timestamp: z.number().default(() => Date.now())
  })
)

type Message = z.infer<typeof messageSchema> & { userId: string }

const events = new EventEmitter()

const messages = new Map<string, Message[]>()

export const messagesAppRouter = t.router({
  send: t.procedure
    .input(messageSchema)
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx.user;
      const message = { userId, ...input }

      if (!messages.has(message.groupId)) {
        messages.set(message.groupId, [])
      }

      const messageList = messages.get(message.groupId);

      if (!messageList) {
        throw new Error(`Message List doesn't exist`)
      }

      messageList.push(message);
      events.emit(message.groupId, message);

      return message.timestamp;
    }),
  get: t.procedure
    .input(groupSchema)
    .query(async ({ input: { groupId } }) => {
      const messageList = messages.get(groupId);
      return messageList || [];
    }),
  listen: t.procedure
    .input(groupSchema)
    .subscription(({ input: { groupId } }) => {
      return observable((emit) => {

        const handler = (message: Message) => {
          emit.next(message)
        }

        events.addListener(groupId, handler)

        return () => events.removeListener(groupId, handler)

      })
    })
});

export type MessagesAppRouter = typeof messagesAppRouter;