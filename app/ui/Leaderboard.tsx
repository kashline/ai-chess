"use client";

import { PuzzleZype } from "@/app/data/zodels/PuzzleZodel";
import { UserScoreZype } from "@/app/data/zodels/UserScoreZodel";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import "./styles/Leaderboard.css";
import { UserZype } from "@/app/data/zodels/UserZodel";

export default function Leaderboard({
  scores,
}: {
  scores: { userScore: UserScoreZype; puzzle: PuzzleZype; user: UserZype }[];
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));
  const pageSize = Number(searchParams.get("pageNumber"));
  if (scores.length === 0){
    return(<div className="flex"><span className="mx-auto my-4">No scores yet.  Create one!</span></div>)
  }
  return (
    <div>
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
