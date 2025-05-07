'use client'

import { useAppSelector } from "@/app/store/hooks";
import * as React from "react";

export default function HistoryLog() {
  const { history } = useAppSelector((state) => state.chess);
  const logEndRef = React.useRef<HTMLDivElement | null>(null);
  const ratingColors = new Map<string, string>([
    ["Brilliant move", "text-brilliant-teal"],
    ["Great move", "text-great-blue"],
    ["Good move", "text-good-green"],
    ["Inaccuracy", "text-inaccuracy-orange"],
    ["Mistake", "text-mistake-rose"],
    ["CRITICAL BLUNDER", "text-red-800"],
    ["Blunder", "text-blunder-red"],
  ]);
  React.useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);
  return (
    <div className="w-full max-w-xl max-h-[900] overflow-y-auto text-green-400 p-2 rounded shadow-inner font-mono text-sm ">
      {history.map(
        (
          event: { move: string; explanation: string; rating: string, bestmove: string, scoreDifference: string },
          index: number
        ) => {
          const ratingColor = ratingColors.get(event.rating);
          if (index % 2 !== 0){ return }
          return (
            <div key={index} className="border-2">
              <div className="flex">
                <p className="mx-auto">
                  {index + 1}. {event.move} {event.bestmove}
                </p>
              </div>
              <div className="flex">
                <p className={`mx-auto ${ratingColor}`}>{event.rating} Score {event.scoreDifference}</p>
              </div>
              <div>{event.explanation}</div>
            </div>
          );
        }
      )}
      <div ref={logEndRef}></div>
    </div>
  );
}
