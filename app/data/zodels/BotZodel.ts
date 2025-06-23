import { z } from "zod";

export const BotZodel = z.object({
  id: z.number(),
  UserID: z.coerce.number(),
  Name: z.string(),
  Model: z.string(),
  Prompt: z.string(),
  RemainingGames: z.coerce.number(),
});

// Omit some fields for creating bots
export const CreateBotZodel = BotZodel.omit({
  id: true,
});

export type BotZype = z.infer<typeof BotZodel>;
export type CreateBotZype = z.infer<typeof CreateBotZodel>;
