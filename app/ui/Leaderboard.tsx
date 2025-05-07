import { PuzzleZype } from "@/app/data/zodels/PuzzleZodel";
import { UserScoreZype } from "@/app/data/zodels/UserScoreZodel";
import * as React from "react";
import './styles/Leaderboard.css'

export default function Leaderboard({scores}: {scores: {userScore: UserScoreZype, puzzle: PuzzleZype}[]}) {
  return (
    <div>
      <div className="flex">
        <h1 className="text-4xl mx-auto">Leaderboard</h1>
      </div>
      <div>
        <table className="mx-auto">
          <thead className="">
            <tr className="">
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
                    <td>{score.userScore.score}</td>
                    <td>{score.userScore.email}</td>
                    <td>{score.userScore.model}</td>
                    <td>{score.userScore.prompt || '<None>'}</td>
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
