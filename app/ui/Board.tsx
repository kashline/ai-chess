"use client";

import * as React from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { makeMove, resetGame, setFen } from "@/app/store/chessSlice";
import generatePrompt from "@/app/util/generatePrompt";
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";
import Button from "@/app/ui/Button";
import { PuzzleZype } from "@/app/data/zodels/PuzzleZodel";
import Results from "@/app/ui/Results";
import HistoryLog from "@/app/ui/HistoryLog";

export const models = ["gpt-4o-mini", "gpt-4.1-mini", "gpt-4.1", "o4-mini"];

export default function Board({ puzzles }: { puzzles: PuzzleZype[] }) {
  const dispatch = useAppDispatch();
  const maxTurns = 1;
  const [score, setScore] = React.useState(0);
  const [isInputValid, setIsInputValid] = React.useState(true);
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });
  const { fen, turn, gameOver, history } = useAppSelector(
    (state) => state.chess
  );
  const [startingPuzzle, setStartingPuzzle] = React.useState(puzzles[0]);
  const turnLimitReached = history.length >= maxTurns;
  const game = React.useMemo(() => {
    return new Chess(fen);
  }, [fen]);
  const [started, setStarted] = React.useState(false);
  const [model, setModel] = React.useState("gpt-4o-mini");
  const [prompt, setPrompt] = React.useState("");
  const turnsRemaining = maxTurns - history.length;
  const handleMove = React.useCallback(
    (
      move: string,
      explanation: string,
      rating: string,
      bestmove: string,
      scoreDifference: string
    ) => {
      dispatch(
        makeMove({
          move: move,
          explanation: explanation,
          rating: rating,
          bestmove: bestmove,
          scoreDifference: scoreDifference,
        })
      );
    },
    [dispatch]
  );
  const generateAIMove = React.useCallback(async () => {
    if (turn === "w") {
      const data: { move: number; explanation: string } = await (
        await fetch(`/api/generateMove`, {
          method: "POST",
          body: JSON.stringify({
            prompt: generatePrompt(game, prompt),
            model: model,
          }),
        })
      ).json();
      const { moveEval } = await (
        await fetch("api/stockfish/evaluateMove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fen: fen,
            move: game.moves({ verbose: true })[data.move].lan,
          }),
        })
      ).json();
      return handleMove(
        game.moves()[data.move],
        data.explanation,
        moveEval.rating,
        moveEval.best_move,
        moveEval.score_difference
      );
    } else {
      const { move } = await (
        await fetch("api/stockfish/makeMove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fen: fen,
          }),
        })
      ).json();
      return handleMove(move.best_move, "-", "0", "-", "0");
    }
  }, [fen, game, handleMove, model, prompt, turn]);
  const handleFenChange = React.useCallback(
    (value: string): void => {
      dispatch(setFen(value));
    },
    [dispatch]
  );
  React.useEffect(() => {
    if (turnLimitReached || gameOver) {
      setScore(
        history
          .map((entry) => Number(entry.scoreDifference))
          .reduce((acc, curr) => {
            return acc + curr;
          }, 0)
      );
      setStarted(false);
    }
    if (started) {
      const timeout = setTimeout(() => {
        if (game.isGameOver()) return;
        generateAIMove();
      }, 3000);
      return () => clearTimeout(timeout); // cleanup on unmount
    }
    if (
      !started &&
      startingPuzzle.fen !== fen &&
      !gameOver &&
      history.length === 0
    ) {
      dispatch(setFen(startingPuzzle.fen));
    }
  }, [
    dispatch,
    fen,
    game,
    gameOver,
    generateAIMove,
    handleFenChange,
    history,
    history.length,
    puzzles,
    started,
    startingPuzzle,
    turnLimitReached,
  ]);
  return (
    <div className="w-[60%] mx-auto">
      {/* In progress overlay */}
      {started && !gameOver && (
        <div
          className={`opacity-65 z-10 bg-gunmetal h-screen w-screen absolute left-0 top-0 flex`}
        >
          <div className="mx-auto my-auto bg-black">
            <div className="mx-auto my-auto text-lavendar-blush text-2xl mt-[25%]">
              <p>Game in progress...</p>
              <p>Turns remaining: {turnsRemaining}</p>
            </div>
            <div className="flex">
              <Button
                className="mx-auto my-auto mt-[25%]"
                onClick={() => {
                  setStarted(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Board */}
      <div className="flex">
        {gameOver && (
          <div className="absolute z-10 w-[65%] flex top-1/2 left-1/2">
            <div className="mx-auto my-auto">
              {game.isStalemate() && (
                <p className="text-red-400 bg-black">Stalemate!</p>
              )}
              {game.isCheckmate() && (
                <div>
                  <p className="mx-auto my-auto text-red-400 bg-black">
                    Checkmate!
                  </p>
                  <p className="mx-auto my-auto text-red-400 bg-black">
                    {turn === "w" ? "Black wins!" : "White wins!"}
                  </p>
                </div>
              )}
              {game.isDraw() && (
                <p className="mx-auto my-auto text-red-400 bg-black">Draw!</p>
              )}
            </div>
          </div>
        )}
        <div className="w-[50%] mx-auto ">
          <Chessboard
            position={fen}
            autoPromoteToQueen={true}
            arePiecesDraggable={false}
          />
        </div>
      </div>
      <div className="max-w-[85%] mx-auto">
        {/* Buttons */}
        <div className="flex gap-10 my-5">
          {history.length === 0 && (
            <Button
              className="border-2 mx-auto"
              onClick={async () => {
                if (isInputValid) {
                  setStarted(true);
                }
              }}
            >
              Start
            </Button>
          )}
          {history.length !== 0 && (
            <Button
              className="border-2 mx-auto"
              onClick={async () => {
                setStarted(false);
                dispatch(resetGame(startingPuzzle?.fen));
              }}
            >
              Reset
            </Button>
          )}
        </div>
        {/* Settings */}
        <div className="border-1 border-gunmetal py-4">
          <div className=" flex">
            <div className="mx-auto">Settings</div>
          </div>
          <div className="">
            <div className="flex mx-auto">
              <div className="mx-auto">
                <div>
                  <label>Model: </label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="border-1 rounded-md text-lavendar-blush"
                  >
                    {models.map((model: string, index: number) => {
                      return (
                        <option
                          className="text-lavendar-blush"
                          key={index}
                          value={model}
                        >
                          {model}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="mx-auto">
                <label>Puzzle: </label>
                <select
                  value={JSON.stringify(startingPuzzle)}
                  onChange={(e) => {
                    const parsed = JSON.parse(e.target.value);
                    handleFenChange(parsed.fen);
                    setStartingPuzzle(parsed);
                  }}
                  className="border-1 rounded-md text-lavendar-blush"
                >
                  {puzzles.map(
                    (puzzle: { title: string; fen: string; id: number }) => {
                      return (
                        <option
                          className="text-lavendar-blush"
                          key={puzzle.id}
                          value={JSON.stringify(puzzle)}
                        >
                          {puzzle.title}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Prompt */}
        <div className="gap-2 pb-2 my-4 border-1 border-gunmetal">
          <div className="flex">
            <label className="mx-auto mb-4">Prompt </label>
          </div>
          <div className="mx-12">
            <textarea
              className="bg-gunmetal rounded-md text-lavendar-blush w-full px-2 h-auto overflow-hidden"
              onChange={(e) => {
                setPrompt(e.target.value);
                setIsInputValid(!matcher.hasMatch(e.target.value));
              }}
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              readOnly={
                started || turnLimitReached || turnLimitReached || gameOver
                  ? true
                  : false
              }
              maxLength={255}
              value={prompt}
            />
            {!isInputValid && (
              <div>
                <span className="text-chili-red">Invalid input</span>
              </div>
            )}
          </div>
        </div>
        <HistoryLog />
        {/* Results */}
        {turnLimitReached && (
          <Results
            score={score}
            model={model}
            startingPuzzle={startingPuzzle}
            prompt={prompt}
            turnsRemaining={turnsRemaining}
          />
        )}
        {gameOver && turnLimitReached !== gameOver && (
          <div className="text-chili-red">
            Game ended before all turns were taken! Invalid run.
          </div>
        )}
      </div>
    </div>
  );
}
