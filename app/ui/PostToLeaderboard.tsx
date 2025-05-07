import {
  UserScoreZodel,
  UserScoreZype,
} from "@/app/data/zodels/UserScoreZodel";
import { useAppSelector } from "@/app/store/hooks";
import Button from "@/app/ui/Button";
import * as React from "react";

export default function PostToLeaderboard({
  score,
  prompt,
  model,
  turnsRemaining,
  puzzleId,
}: {
  score: number;
  prompt: string;
  model: string;
  turnsRemaining: number;
  puzzleId: number;
}) {
  const reduxUser = useAppSelector((state) => state.user);
  const [res, setRes] = React.useState<boolean | null>(null);
  const userScore: UserScoreZype = UserScoreZodel.parse({
    sub: reduxUser.user?.sub,
    score: score,
    prompt: prompt,
    UserId: reduxUser.user?.id,
    model: model,
    puzzle: puzzleId,
    turnsRemaining: turnsRemaining,
    email: reduxUser.user?.email,
  });
  const handleClick = React.useCallback(async () => {
    try {
      const data = await (
        await fetch(`/api/scores/create`, {
          method: "POST",
          body: JSON.stringify({
            userScore,
          }),
        })
      ).json();
      setRes(data.success);
    } catch (err) {
      console.log(err);
      setRes(false);
    }
  }, [userScore]);
  if (!reduxUser) {
    return <></>;
  }
  return (
    <div>
      <Button onClick={handleClick}>Post to leaderboard</Button>
      {res && (
        <div>
          <p className="text-green-500">Successfully submitted score</p>
        </div>
      )}
      {res === false && (
        <div>
          <p className="text-red-500">Failed to submit! Please retry.</p>
        </div>
      )}
    </div>
  );
}
