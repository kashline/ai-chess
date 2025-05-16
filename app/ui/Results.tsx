import { PuzzleZype } from "@/app/data/zodels/PuzzleZodel";
import { useAppSelector } from "@/app/store/hooks";
import PostToLeaderboard from "@/app/ui/PostToLeaderboard";

export default function Results({
  score,
  model,
  startingPuzzle,
  prompt,
  turnsRemaining,
}: {
  score: number;
  model: string;
  startingPuzzle: PuzzleZype;
  prompt: string;
  turnsRemaining: number;
}) {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="border-2 bg-[#7af07a96] rounded-xl py-2">
      <div className="flex">
        <h1 className="mx-auto text-lg">Run Complete</h1>
      </div>
      <div className="flex">
        <p className="mx-auto text-lg">Score: {score}</p>
      </div>
      <div className="border-gray-50 border-1">
        <div className="flex">
          <h1 className="mx-auto text-2xl">Parameters</h1>
        </div>
        <div className="flex">
          <div className="mx-auto">
            <label>Model:</label>
            <p>{model}</p>
          </div>
          <div className="mx-auto">
            <label>Starting FEN:</label>
            <p>{startingPuzzle.title}</p>
          </div>
        </div>
        <div className="flex mx-auto">
          <h1 className="mx-auto">Prompt</h1>
        </div>
        <div className="flex">
          <p className="mx-auto  wrap-break-word overflow-hidden max-w-[80%] rounded-sm">
            {prompt || "None"}
          </p>
        </div>
      </div>
      <div className="flex"></div>
      {user && (
        <div className="mx-auto w-fit my-5">
          <PostToLeaderboard
            score={score}
            puzzleId={startingPuzzle.id}
            prompt={prompt}
            model={model}
            turnsRemaining={turnsRemaining}
          />
        </div>
      )}
      {!user && (
        <div className="text-lavendar-blush flex">
          <span className="mx-auto">
            Create an account to post this result to the leaderboard
          </span>
        </div>
      )}
    </div>
  );
}
