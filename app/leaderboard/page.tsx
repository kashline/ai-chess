"use server";

import Puzzle from "@/app/data/models/Puzzle";
import User from "@/app/data/models/User";
import UserScore from "@/app/data/models/UserScore";
import { PuzzleZodel } from "@/app/data/zodels/PuzzleZodel";
import { UserScoreZodel } from "@/app/data/zodels/UserScoreZodel";
import Leaderboard from "@/app/ui/Leaderboard";

export default async function Page() {
  await User.sync();
  await UserScore.sync();
  await Puzzle.sync();
  const scores = (
    await UserScore.findAll({
      order: [["score", "ASC"]],
      include: { model: Puzzle },
    })
  ).map((score) => {
    return {userScore: UserScoreZodel.parse(score), puzzle: PuzzleZodel.parse(score.dataValues.Puzzle.dataValues)};
  });
  return (
    <div>
      <Leaderboard scores={scores} />
    </div>
  );
}
