import { z } from "zod";

export const PuzzleZodel = z.object({
  id: z.number(),
  title: z.string(),
  fen: z.string(),
});

export type PuzzleZype = z.infer<typeof PuzzleZodel>;
