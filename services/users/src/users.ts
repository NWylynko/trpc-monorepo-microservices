import { randomUUID } from "node:crypto";
import { User } from "./router";

export const users = new Map<string, User>();

const katt: User = {
  userId: randomUUID(),
  email: 'katt@email.com',
};

users.set(katt.userId, katt);
