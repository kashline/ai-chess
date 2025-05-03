import { z } from "zod";

export const UserZodel = z.object({
  id: z.number().optional(),
  user_id: z.number(),
  sub: z.string(),
  score: z.string(),
  model: z.boolean(),
  prompt: z.string(),
  startingPos: z.string(),
  turnsRemaining: z.number(),
  results: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
});

export type UserScoreZype = z.infer<typeof UserZodel>;
