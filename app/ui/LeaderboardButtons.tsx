"use client";

import { PuzzleZype } from "@/app/data/zodels/PuzzleZodel";
import { models } from "@/app/ui/Board";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

export default function LeaderboardButtons({
  puzzles,
}: {
  puzzles: PuzzleZype[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [model, setModel] = React.useState(
    searchParams.get("model") || models[0]
  );
  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };
  const puzzle = Number(searchParams.get("PuzzleId"));
  const [startingPuzzle, setStartingPuzzle] = React.useState(
    puzzles.find((ipuzzle) => ipuzzle.id === puzzle)
  );
  return (
    <div>
      <div className="flex">
        <div className="mx-auto flex gap-2 my-4">
          <div className="">
            <label>Model: </label>
            <select
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                updateParam("model", e.target.value);
              }}
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
          <div className="">
            <label>Puzzle: </label>
            <select
              value={JSON.stringify(startingPuzzle)}
              onChange={(e) => {
                const parsed = JSON.parse(e.target.value);
                updateParam("PuzzleId", parsed.id);
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
  );
}
