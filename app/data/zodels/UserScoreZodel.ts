import { z } from "zod";

export const UserScoreZodel = z.object({
  id: z.number().optional(),
  UserId: z.number(),
  score: z.number(),
  model: z.string(),
  prompt: z.string(),
  PuzzleId: z.number(),
  turnsRemaining: z.number(),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
});

export type UserScoreZype = z.infer<typeof UserScoreZodel>;
