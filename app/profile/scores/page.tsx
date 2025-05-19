"use server";

import Puzzle from "@/app/data/models/Puzzle";
import User from "@/app/data/models/User";
import UserScore from "@/app/data/models/UserScore";
import { PuzzleZodel } from "@/app/data/zodels/PuzzleZodel";
import UserScoreHistory from "@/app/profile/UserScoreHistory";
import LeaderboardButtons from "@/app/ui/LeaderboardButtons";
import Pagination from "@/app/ui/Pagination";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const session = await auth();
  const { id } = (
    await User.findOne({ where: { email: session?.user?.email } })
  )?.dataValues;
  const { model, PuzzleId, page, pageSize } = await searchParams;
  const pageSizeNumber = Number(pageSize);
  const whereClause = { UserId: id };
  if (model) {
    Object.assign(whereClause, { model: model });
  }
  if (PuzzleId) {
    Object.assign(whereClause, { PuzzleId: PuzzleId });
  }
  if (!page || !pageSize || !model || !PuzzleId) {
    const safeParams = new URLSearchParams({
      model: model || "gpt-4o-mini",
      PuzzleId: PuzzleId || "2",
      page: page || "1",
      pageSize: pageSize || "20",
    });
    redirect(`/profile/scores?${safeParams.toString()}`);
  }
  const res = await UserScore.findAndCountAll({
    order: [["score", "ASC"]],
    where: whereClause,
    include: [{ model: Puzzle }],
    limit: pageSizeNumber,
    offset: (Number(page) - 1) * pageSizeNumber,
  });
  const userScores = res.rows.map((score) => score.dataValues);
  const puzzles = (await Puzzle.findAll()).map((puzzle) => {
    return PuzzleZodel.parse(puzzle);
  });
  const totalPages = Math.ceil(res.count / pageSizeNumber);
  return (
    <div className="mx-10 text-lavendar-blush">
      <div className="flex">
        <h1 className="mx-auto text-4xl">My scores</h1>
      </div>

      <LeaderboardButtons puzzles={puzzles} />
      <UserScoreHistory userScores={userScores} />
      <div className="flex my-6">
        <div className="mx-auto">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
