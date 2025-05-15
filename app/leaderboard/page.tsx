"use server";

import Puzzle from "@/app/data/models/Puzzle";
import User from "@/app/data/models/User";
import UserScore from "@/app/data/models/UserScore";
import { PuzzleZodel } from "@/app/data/zodels/PuzzleZodel";
import { UserScoreZodel } from "@/app/data/zodels/UserScoreZodel";
import { UserZodel } from "@/app/data/zodels/UserZodel";
import Leaderboard from "@/app/ui/Leaderboard";
import PageSizeSelector from "@/app/ui/PageSizeSelector";
import Pagination from "@/app/ui/Pagination";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: {searchParams: Promise<{ [key: string]: string }>}) {
  const { model, PuzzleId, page, pageSize } = await searchParams;
  const pageSizeNumber = Number(pageSize);
  const whereClause = {};
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
    redirect(`/leaderboard?${safeParams.toString()}`);
  }
  const res = await UserScore.findAndCountAll({
    order: [["score", "ASC"]],
    where: whereClause,
    include: [{ model: Puzzle }, { model: User }],
    limit: pageSizeNumber,
    offset: (Number(page) - 1) * pageSizeNumber,
  });
  const puzzles = (await Puzzle.findAll()).map((puzzle) => {
    return PuzzleZodel.parse(puzzle);
  });
  const scores = res.rows.map((score) => {
    return {
      userScore: UserScoreZodel.parse(score),
      puzzle: PuzzleZodel.parse(score.dataValues.Puzzle.dataValues),
      user: UserZodel.parse(score.dataValues.User.dataValues)
    };
  });
  const totalPages = Math.ceil(res.count / pageSizeNumber);
  return (
    <div className="mx-10">
      <Leaderboard scores={scores} puzzles={puzzles} />
      <div className="flex">
        <div className="mx-auto">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
      <div className="flex">
        <div className="mx-auto">
          <PageSizeSelector />
        </div>
      </div>
    </div>
  );
}
