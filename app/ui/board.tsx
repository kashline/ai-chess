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
import Button from "@/app/ui/button";

export default function Board() {
  const dispatch = useAppDispatch();
  const maxTurns = 10;
  const [score, setScore] = React.useState(0);
  const [startingFen, setStartingFen] = React.useState("");
  const [isInputValid, setIsInputValid] = React.useState(true);
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });
  const { fen, turn, gameOver, history } = useAppSelector(
    (state) => state.chess
  );
  const turnLimitReached = history.length >= maxTurns;
  const models = ["gpt-4o-mini", "gpt-4.1-mini", "gpt-4.1", "o4-mini"];
  const fens = React.useMemo(() => {
    return [
      {
        title: "The Corner Trap",
        fen: "7k/5K2/5P2/8/8/8/8/8 w - - 0 1",
      },
      {
        title: "Storm Breaker",
        fen: "r1b1kb1r/pppp1ppp/2n2n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 2 5",
      },
      {
        title: "Royal Cage",
        fen: "rnb1kbnr/ppp2ppp/8/3pp3/3P4/3B1N2/PPP2PPP/RNBQK2R w KQkq - 0 5",
      },
      {
        title: "Edge of the World",
        fen: "6k1/5ppp/8/8/8/8/PPP5/4R1K1 w - - 0 1",
      },
      {
        title: "Silent Strike",
        fen: "r3kb1r/ppp2ppp/2n2n2/3pp3/3P4/2P2NP1/PP2PPBP/RNB1K2R w KQkq - 2 6",
      },
      {
        title: "Final Embrace",
        fen: "r1bqk2r/ppp2ppp/2n2n2/3pp3/3P1B2/2N2N2/PPP2PPP/R2QK2R w KQkq - 4 6",
      },
      {
        title: "Net Tightening",
        fen: "6k1/5ppp/8/8/8/8/5PPP/5RK1 w - - 0 1",
      },
      {
        title: "Frozen King",
        fen: "7k/5ppp/8/8/8/8/PPP2PPP/6K1 w - - 0 1",
      },
      {
        title: "Web of Death",
        fen: "r2qkb1r/ppp2ppp/2n2n2/3pp3/2P5/2N2NP1/PP2PPBP/R1BQ1RK1 w kq - 4 7",
      },
    ];
  }, []);
  const game = React.useMemo(() => {
    return new Chess(fen);
  }, [fen]);
  const [started, setStarted] = React.useState(false);
  const [model, setModel] = React.useState("gpt-4o-mini");
  const [prompt, setPrompt] = React.useState("");
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
    if (!startingFen) {
      setStartingFen(fens[0].fen);
      handleFenChange(fens[0].fen);
    }
  }, [
    fens,
    game,
    gameOver,
    generateAIMove,
    handleFenChange,
    history,
    history.length,
    started,
    startingFen,
    turnLimitReached,
  ]);
  return (
    <div>
      {started && !gameOver && (
        <div
          className={`opacity-65 z-10 bg-gunmetal h-screen w-screen absolute left-0 top-0 flex`}
        >
          <div className="mx-auto my-auto bg-black">
            <div className="mx-auto my-auto text-lavendar-blush text-2xl mt-[25%]">
              Game in progress...
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
      <div className="relative">
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
              {/* {turn === "w" && game.isCheckmate() && (
                <p className="mx-auto my-auto text-red-400 bg-black">
                  Black wins!
                </p>
              )}
              {turn === "b" && game.isCheckmate() && (
                <p className="mx-auto my-auto text-red-400 bg-black">
                  White wins!
                </p>
              )} */}
              {game.isDraw() && (
                <p className="mx-auto my-auto text-red-400 bg-black">Draw!</p>
              )}
            </div>
          </div>
        )}
        {(turnLimitReached || gameOver) && (
          <div className="absolute z-10 w-[65%] flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="">
              <p className="text-red-400 bg-black">Sim over</p>
              <p className="text-red-400 bg-black">Score: {`${score}`}</p>
            </div>
          </div>
        )}
        <Chessboard
          position={fen}
          // onPieceDrop={onDrop}
          autoPromoteToQueen={true}
          arePiecesDraggable={false}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-10 my-5">
        {history.length === 0 && (
          <Button
            className="border-2 mx-auto"
            onClick={async () => {
              if (isInputValid) {
                setStartingFen(fen);
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
              dispatch(resetGame(startingFen));
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
        <div className="flex">
          <div className="flex mx-auto">
            <div className="">
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
          <div className="mx-auto">
            <label>FEN: </label>
            <select
              value={startingFen}
              onChange={(e) => {
                handleFenChange(e.target.value);
                setStartingFen(e.target.value);
              }}
              className="border-1 rounded-md text-lavendar-blush"
            >
              {fens.map(
                (fen: { title: string; fen: string }, index: number) => {
                  return (
                    <option
                      className="text-lavendar-blush"
                      key={index}
                      value={fen.fen}
                    >
                      {fen.title}
                    </option>
                  );
                }
              )}
            </select>
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
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            readOnly={started || turnLimitReached ? true : false}
            maxLength={512}
            value={prompt}
          />
          {!isInputValid && (
            <div>
              <span className="text-chili-red">Invalid input</span>
            </div>
          )}
        </div>
      </div>
      {/* Results */}
      {(turnLimitReached || gameOver) && (
        <div className="border-2 border-green-600 py-2">
          <div className="flex">
            <h1 className="mx-auto text-lg">Run Complete</h1>
          </div>
          <div className="flex">
            <p className="mx-auto text-lg">Score: {score}</p>
          </div>
          <div className="border-gray-50 border-1">
            <div className="flex">
              <h1 className="mx-auto text-2xl">Parameters</h1>
            </div>
            <div className="flex mx-auto">
              <label>Model:</label>
              <p>{model}</p>
            </div>
            <div className="flex mx-auto">
              <label>Starting FEN:</label>
              <p>{startingFen}</p>
            </div>
            <div className="flex mx-auto">
              <h1 className="mx-auto">Prompt</h1>
            </div>
            <div className="flex">
              <p className="mx-auto  wrap-break-word overflow-hidden max-w-[80%] rounded-sm">
                {prompt || "None"}
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="mx-auto my-4">
              <button className="border-2 border-gray-500 rounded-md hover:border-blue-400">
                Save to Leaderboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
