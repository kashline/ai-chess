"use server";

import Puzzle from "@/app/data/models/Puzzle";
import User from "@/app/data/models/User";
import UserScore from "@/app/data/models/UserScore";
import { PuzzleZodel } from "@/app/data/zodels/PuzzleZodel";
import Board from "@/app/ui/Board";
// import HistoryLog from "@/app/ui/HistoryLog";
import * as React from "react";

export default async function Page() {
  const puzzles = (await Puzzle.findAll()).map((puzzle) => {
    return PuzzleZodel.parse(puzzle);
  });
  await User.sync();
  await Puzzle.sync();
  await UserScore.sync();
  return (
    <div className="flex">
      <div className={`flex mx-auto w-full h-full`}>
        <div className={`w-full h-full max-h-[90vh]`}>
          <Board puzzles={puzzles} />
        </div>
      </div>
    </div>
  );
}
