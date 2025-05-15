"use server";

import Puzzle from "@/app/data/models/Puzzle";
import { PuzzleZodel } from "@/app/data/zodels/PuzzleZodel";
import Board from "@/app/ui/Board";
import * as React from "react";

export default async function Page() {
  const puzzles = (await Puzzle.findAll()).map((puzzle) => {
    return PuzzleZodel.parse(puzzle);
  });

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
