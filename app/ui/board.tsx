"use client";

import * as React from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { makeMove, resetGame } from "@/app/store/chessSlice";
import generatePrompt from "@/app/util/generatePrompt";

type GameOptions = {
  white: { skill?: string; move?: string; model?: string };
  black: { skill?: string; move?: string; model?: string };
};

export default function PlayRandomMoveEngine() {
  const dispatch = useAppDispatch();
  const { fen, turn, gameOver } = useAppSelector((state) => state.chess);
  const models = ["gpt-4o-mini", "gpt-4.1-mini", "gpt-4.1", "o4-mini"];
  const game = React.useMemo(() => {
    return new Chess(fen);
  }, [fen]);
  const [started, setStarted] = React.useState(false);
  const [gameOptions, setGameOptions] = React.useState<GameOptions>({
    white: { skill: "Beginner", model: "gpt-4o-mini" },
    black: { skill: "Beginner", model: "gpt-4o-mini" },
  });

  const handleMove = React.useCallback(
    (move: string, explanation: string) => {
      dispatch(makeMove({ move: move, explanation: explanation }));
    },
    [dispatch]
  );
  const generateAIMove = React.useCallback(async () => {
    const data: { move: number; explanation: string } = await (
      await fetch(`/api/generateMove`, {
        method: "POST",
        body: JSON.stringify({
          prompt: generatePrompt(
            game,
            turn === "w" ? gameOptions.white : gameOptions.black
          ),
          model:
            turn === "w" ? gameOptions.white.model : gameOptions.black.model,
        }),
      })
    ).json();
    return handleMove(game.moves()[data.move], data.explanation);
  }, [game, gameOptions.black, gameOptions.white, handleMove, turn]);
  const handleOptionsChange = (event: {
    skill?: string;
    color: string;
    model?: string;
  }) => {
    const data =
      event.color === "w" ? { white: { ...event } } : { black: { ...event } };
    setGameOptions({ ...gameOptions, ...data });
  };
  React.useEffect(() => {
    if (started) {
      const timeout = setTimeout(() => {
        if (game.isGameOver()) return;
        generateAIMove();
      }, 1000);
      return () => clearTimeout(timeout); // cleanup on unmount
    }
  }, [game, gameOptions, generateAIMove, started]);
  return (
    <div>
      <div>
        {gameOver && (
          <div className="absolute z-10 w-[65%] flex aspect-square">
            <div className="mx-auto my-auto">
              {game.isStalemate() && (
                <p className="text-red-400 bg-black">
                  Stalemate!
                </p>
              )}
              {game.isCheckmate() && (
                <p className="mx-auto my-auto text-red-400 bg-black">
                  Checkmate!
                </p>
              )}
              {turn === "w" ? (
                <p className="mx-auto my-auto text-red-400 bg-black">
                  Black wins!
                </p>
              ) : (
                <p className="mx-auto my-auto text-red-400 bg-black">
                  White wins!
                </p>
              )}
            </div>
          </div>
        )}
        <Chessboard
          position={fen}
          // onPieceDrop={onDrop}
          autoPromoteToQueen={true} // always promote to a queen for example simplicity
        />
      </div>

      {/* buttons */}
      <div>
        <button
          className="border-2"
          onClick={async () => {
            setStarted(true);
          }}
        >
          Start game
        </button>
        <button
          className="border-2"
          onClick={async () => {
            setStarted(false);
          }}
        >
          Pause game
        </button>
        <button
          className="border-2"
          onClick={async () => {
            dispatch(resetGame());
          }}
        >
          Reset game
        </button>
      </div>

      <div className=" flex">
        <div className="mx-auto">AI Settings</div>
      </div>
      {/* Difficulties */}
      <div className="flex">
        <div className="">
          <p>White</p>
          <div>
            <label>Model: </label>
            <select
              value={gameOptions.white.model}
              onChange={(e) =>
                handleOptionsChange({ color: "w", model: e.target.value })
              }
              className="border-1 rounded-md text-white"
            >
              {models.map((model: string, index: number) => {
                return (
                  <option className="text-white" key={index} value={model}>
                    {model}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <fieldset className="">
            <legend>Skill level</legend>
            <div>
              <input
                type="radio"
                id="Beginner"
                name="wskill"
                value={"Beginner"}
                onClick={(e: React.MouseEvent) => {
                  const target = e.target as HTMLInputElement;
                  handleOptionsChange({ skill: target.value, color: "w" });
                }}
              ></input>
              <label htmlFor="Beginner">Beginner</label>
            </div>
            <div>
              <input
                type="radio"
                id="Intermediate"
                name="wskill"
                value={"Intermediate"}
                onClick={(e: React.MouseEvent) => {
                  const target = e.target as HTMLInputElement;
                  handleOptionsChange({ skill: target.value, color: "w" });
                }}
              ></input>
              <label htmlFor="Intermediate">Intermediate</label>
            </div>
            <div>
              <input
                type="radio"
                id="Advanced"
                name="wskill"
                value={"Advanced"}
                onClick={(e: React.MouseEvent) => {
                  const target = e.target as HTMLInputElement;
                  handleOptionsChange({ skill: target.value, color: "w" });
                }}
              ></input>
              <label htmlFor="Advanced">Advanced</label>
            </div>
            <div>
              <input
                type="radio"
                id="Grandmaster"
                name="wskill"
                value={"Grandmaster"}
                onClick={(e: React.MouseEvent) => {
                  const target = e.target as HTMLInputElement;
                  handleOptionsChange({ skill: target.value, color: "w" });
                }}
              ></input>
              <label htmlFor="Grandmaster">Grandmaster</label>
            </div>
          </fieldset> */}
        </div>
        <div className="ml-auto">
          <p>Black</p>
          <div>
            <label>Model: </label>
            <select
              value={gameOptions.black.model}
              onChange={(e) =>
                handleOptionsChange({ color: "b", model: e.target.value })
              }
              className="border-1 rounded-md text-white"
            >
              {models.map((model: string, index: number) => {
                return (
                  <option className="text-white" key={index} value={model}>
                    {model}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <fieldset className="">
            <legend>Skill level</legend>
            <div>
              <input
                type="radio"
                id="Beginner"
                name="bskill"
                value={"Beginner"}
                onClick={(e: React.MouseEvent) => {
                  const target = e.target as HTMLInputElement;
                  handleOptionsChange({ skill: target.value, color: "b" });
                }}
              ></input>
              <label htmlFor="Beginner">Beginner</label>
            </div>
            <div>
              <input
                type="radio"
                id="Intermediate"
                name="bskill"
                value={"Intermediate"}
                onClick={(e: React.MouseEvent) => {
                  const target = e.target as HTMLInputElement;
                  handleOptionsChange({ skill: target.value, color: "b" });
                }}
              ></input>
              <label htmlFor="Intermediate">Intermediate</label>
            </div>
            <div>
              <input
                type="radio"
                id="Advanced"
                name="bskill"
                value={"Advanced"}
                onClick={(e: React.MouseEvent) => {
                  const target = e.target as HTMLInputElement;
                  handleOptionsChange({ skill: target.value, color: "b" });
                }}
              ></input>
              <label htmlFor="Advanced">Advanced</label>
            </div>
            <div>
              <input
                type="radio"
                id="Grandmaster"
                name="bskill"
                value={"Grandmaster"}
                onClick={(e: React.MouseEvent) => {
                  const target = e.target as HTMLInputElement;
                  handleOptionsChange({ skill: target.value, color: "b" });
                }}
              ></input>
              <label htmlFor="Grandmaster">Grandmaster</label>
            </div>
          </fieldset> */}
        </div>
      </div>
    </div>
  );
}
