import { Chess } from "chess.js";

export default function generatePrompt(
  game: Chess,
  options: { skill?: string; move?: string },
  reevaluate?: boolean,
) {
  const { skill, move } = options;
  const base = reevaluate
    ? `This fen represents a game of chess: ${game.fen()}.  The move ${move} was suggested.  Critique that move and provide your suggestion from this array of possible moves: [${game.moves()}]. Select a move from this list and respond with the index the move has in the array.  Also provide a concise (1 sentence) explanation as to why you chose that move.`
    : `This fen represents a game of chess that we are currently playing: ${game.fen()}.  Here is an array of possible moves: [${game.moves()}].  Emulate Stockfish at depth 10 and select a move from this list and respond with the index the move has in the array.  Also provide a concise (1 sentence) explanation as to why you chose that move instead of the other.`;

  //   if (reevaluate) {
  //     return `This fen represents a game of chess: ${game.fen()}.  The move ${move} was suggested.  Critique that move and provide your suggestion from this array of possible moves: [${game.moves()}]. Select a move from this list and respond with the index the move has in the array.  Also provide a concise (1 sentence) explanation as to why you chose that move.`;
  //   }
  return `You are a chess ${skill || "beginner"}. ${base}`;
}
