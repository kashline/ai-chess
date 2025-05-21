"use client";

import { useAppSelector } from "@/app/store/hooks";
import ChevronDownIcon from "@/app/ui/icons/ChevronDownIcon";
import ChevronLeftIcon from "@/app/ui/icons/ChevronLeftIcon";
import * as React from "react";

export default function HistoryLog() {
  const { history } = useAppSelector((state) => state.chess);
  const logEndRef = React.useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = React.useState("0px");
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
  React.useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen, history]);
  return (
    <div className="pb-6">
      <div className="w-full bg-gunmetal">
        <button
          className="w-full flex items-center justify-between px-4 py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lavendar-blush">Move History</span>
          {!isOpen && (
            <ChevronLeftIcon
              className="stroke-lavendar-blush"
              width={25}
              height={25}
            />
          )}
          {isOpen && (
            <ChevronDownIcon
              className="stroke-lavendar-blush"
              width={25}
              height={25}
            />
          )}
        </button>
      </div>
      <div
        ref={containerRef}
        style={{
          height,
          transition: "height 0.4s ease",
          overflow: "hidden",
        }}
        className="w-full text-lavendar-blush bg-gunmetal rounded shadow-inner font-mono text-sm"
      >
        <div ref={contentRef} className="p-2">
          <div className="w-full h-px bg-lavendar-blush my-4" />
          <div className="border-1 rounded-md">
            {history.length === 0 && (
              <div>
                <span>No history</span>
              </div>
            )}
            {history.length !== 0 &&
              history.map(
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
                    return (
                      <div key={index} className="border-1">
                        <div className="flex">
                          <p className="mx-auto">
                            {index + 1}. {event.move}
                          </p>
                        </div>
                        <div className="flex">
                          <p className={`mx-auto ${ratingColor}`}>
                            Opponent move
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="">
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
                      <div className="flex">
                        <div className="mx-auto">{event.explanation}</div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
        <div ref={logEndRef}></div>
      </div>
    </div>
  );
}
