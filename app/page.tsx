import Puzzle from "@/app/data/models/Puzzle";
import { PuzzleZodel } from "@/app/data/zodels/PuzzleZodel";
import Board from "@/app/ui/tmp/Board";
import HistoryLog from "@/app/ui/tmp/HistoryLog";
import * as React from "react";

export default async function Page() {
  const puzzles = (await Puzzle.findAll()).map((puzzle) => {return PuzzleZodel.parse(puzzle)});
  return (
    <div className="flex max-w-full">
      <div className={`flex mx-auto w-[85%}]`}>
        <div className={`w-[65%}] mx-auto}`}>
          <Board puzzles={puzzles}/>
        </div>
        <div className="w-[35%]">
          <div className="w-full flex">
            <h1 className="mx-auto text-green-400 rounded shadow-inner font-mono text-sm">
              History
            </h1>
          </div>
          <HistoryLog />
        </div>
      </div>
    </div>
  );
}
