import { useAppSelector } from "@/app/store/hooks";
import * as React from "react";

export default function HistoryLog() {
  const { history } = useAppSelector((state) => state.chess);
  const logEndRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);
  return (
    <div className="w-full max-w-xl max-h-[900] overflow-y-auto bg-black text-green-400 p-2 rounded shadow-inner font-mono text-sm">
      {history.map(
        (event: { move: string; explanation: string }, index: number) => {
          return (
            <div key={index} className="border-2">
              <div className="flex">
                <p className="mx-auto">{index + 1}. {event.move}</p>
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
