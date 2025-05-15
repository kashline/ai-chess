"use client";

import { PuzzleZype } from "@/app/data/zodels/PuzzleZodel";
import { UserScoreZype } from "@/app/data/zodels/UserScoreZodel";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./styles/Leaderboard.css";
import { models } from "@/app/ui/Board";
import { UserZype } from "@/app/data/zodels/UserZodel";

export default function Leaderboard({
  scores,
  puzzles,
}: {
  scores: { userScore: UserScoreZype; puzzle: PuzzleZype; user: UserZype }[];
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
    // Update URL with new query string
    router.push(`?${params.toString()}`);
  };
  const page = Number(searchParams.get("page"));
  const pageSize = Number(searchParams.get("pageNumber"));
  const puzzle = Number(searchParams.get("PuzzleId")) - 1;
  const [startingPuzzle, setStartingPuzzle] = React.useState(puzzles[puzzle]);
  return (
    <div>
      <div className="flex">
        <h1 className="text-4xl mx-auto">Leaderboard</h1>
      </div>
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
      <div>
        <table className="mx-auto">
          <thead className="">
            <tr className="">
              <th className="px-4">Rank</th>
              <th className="px-4">Score</th>
              <th className="px-4">Username</th>
              <th className="px-4">Model</th>
              <th className="px-4">Prompt</th>
              <th className="px-4">Starting Position</th>
            </tr>
          </thead>
          <tbody>
            {scores &&
              scores.map((score, index) => {
                return (
                  <tr key={index} className="border-2 ">
                    <td>{index + 1 + (page - 1) * pageSize}</td>
                    <td>{score.userScore.score}</td>
                    <td>{score.user.username}</td>
                    <td>{score.userScore.model}</td>
                    <td className="max-w-[200px] break-words p-2 border">
                      {score.userScore.prompt || "<None>"}
                    </td>
                    <td>{score.puzzle.title}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
