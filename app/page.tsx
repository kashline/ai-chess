"use client";

import Board from "@/app/ui/board";
import HistoryLog from "@/app/ui/historylog";
import * as React from "react";

export default function Page() {
  return (
    <div className="flex max-w-full">
      <div className="flex mx-auto w-[800]">
        <div className="w-[65%]">
          <Board />
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
