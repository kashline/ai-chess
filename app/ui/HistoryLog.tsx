"use client";

import { useAppSelector } from "@/app/store/hooks";
import ChevronDownIcon from "@/app/ui/icons/ChevronDownIcon";
import ChevronLeftIcon from "@/app/ui/icons/ChevronLeftIcon";
import * as React from "react";

export default function HistoryLog() {
  const { history } = useAppSelector((state) => state.chess);
  const logEndRef = React.useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
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
    <div>
      <div className="w-full bg-gunmetal">
        <button
          className="w-full flex items-center justify-between px-4 py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lavendar-blush">History</span>
          {!isOpen && <ChevronLeftIcon className="stroke-lavendar-blush" />}
          {isOpen && <ChevronDownIcon className="stroke-lavendar-blush"/>}
        </button>
      </div>
      {isOpen && (
        <div className="w-full max-h-svh overflow-y-auto text-lavendar-blush p-2 rounded shadow-inner font-mono text-sm bg-gunmetal">
          <div className="w-full h-px bg-lavendar-blush my-4" />
          {history.length === 0 && <div><span>No history</span></div>}
          {history.length !== 0 && history.map(
            (
              event: {
                move: string;
                explanation: string;
                rating: string;
                bestmove: string;
                scoreDifference: string;
              },
              index: number
            ) => {
              const ratingColor = ratingColors.get(event.rating);
              if (index % 2 !== 0) {
                return;
              }
              return (
                <div key={index} className="border-2">
                  <div className="flex">
                    <p className="mx-auto">
                      {index + 1}. {event.move} {event.bestmove}
                    </p>
                  </div>
                  <div className="flex">
                    <p className={`mx-auto ${ratingColor}`}>
                      {event.rating} Score {event.scoreDifference}
                    </p>
                  </div>
                  <div>{event.explanation}</div>
                </div>
              );
            }
          )}
          <div ref={logEndRef}></div>
        </div>
      )}
    </div>
  );
}
