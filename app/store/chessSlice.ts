// store/chessSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chess } from "chess.js";

export interface ChessState {
  fen: string;
  history: { move: string; explanation: string }[];
  gameOver: boolean;
  turn: "w" | "b";
}

const initialGame = new Chess();

const initialState: ChessState = {
  fen: initialGame.fen(),
  history: [],
  gameOver: false,
  turn: initialGame.turn(),
};

const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    makeMove: (
      state,
      action: PayloadAction<{ move: string; explanation: string }>
    ) => {
      const game = new Chess(state.fen);
      const move = game.move(action.payload.move);

      if (move) {
        state.fen = game.fen();
        state.history = [
          ...state.history,
          { move: game.history()[0], explanation: action.payload.explanation },
        ];
        state.gameOver = game.isGameOver();
        state.turn = game.turn();
      }
    },
    resetGame: (state) => {
      const game = new Chess();
      state.fen = game.fen();
      state.history = [];
      state.gameOver = false;
      state.turn = game.turn();
    },
  },
});

export const { makeMove, resetGame } = chessSlice.actions;
export default chessSlice.reducer;
