import { z } from "zod";

export const UserZodel = z.object({
  id: z.number().optional(),
  sub: z.string(),
  email: z.string(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string(),
  username: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
});

export type UserZype = z.infer<typeof UserZodel>;
