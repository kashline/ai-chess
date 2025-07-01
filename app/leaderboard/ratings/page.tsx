"use server";

import Bot from "@/app/data/models/Bot";
import LatestBotRating from "@/app/data/models/LatestBotRating";
import { redirect } from "next/navigation";
import "@/app/ui/styles/Leaderboard.css";
import Pagination from "@/app/ui/Pagination";
import User from "@/app/data/models/User";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { page, pageSize } = await searchParams;
  const pageSizeNumber = Number(pageSize);
  if (!page || !pageSize) {
    const safeParams = new URLSearchParams({
      page: page || "1",
      pageSize: pageSize || "20",
    });
    redirect(`/leaderboard/ratings?${safeParams.toString()}`);
  }
  const ratings = await LatestBotRating.findAndCountAll({
    order: [["latest_rating", "DESC"]],
    limit: pageSizeNumber,
    offset: (Number(page) - 1) * pageSizeNumber,
    include: [
      {
        model: Bot,
        as: "bot",
        required: true,
        attributes: ["id", "Name", "Model"],
        include: [
          {
            model: User,
            as: "user",
          },
        ],
      },
    ],
  });
  const numPage = Number(page);
  const numPageSize = Number(pageSize);
  const totalPages = Math.ceil(ratings.count / pageSizeNumber);
  return (
    <div className="w-[75%] mx-auto">
      <div className="flex">
        <h1 className="text-4xl mx-auto text-lavendar-blush">Bot rankings</h1>
      </div>
      <table className="mx-auto w-[75%]">
        <thead className="">
          <tr className="">
            <th className="px-4">Rank</th>
            <th className="px-4">Rating</th>
            <th className="px-4">Name</th>
            <th className="px-4">Model</th>
            <th className="px-4">Owner</th>
          </tr>
        </thead>
        <tbody>
          {ratings &&
            ratings.rows.map((rating, index) => {
              return (
                <tr key={index} className="border-2">
                  <td>{index + 1 + (numPage - 1) * numPageSize}</td>
                  <td className="text-center">
                    {rating.dataValues.latest_rating}
                  </td>
                  <td>{rating.dataValues.bot.Name}</td>
                  <td>{rating.dataValues.bot.Model}</td>
                  <td>{rating.dataValues.bot.user.dataValues.username}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="flex">
        <div className="mx-auto">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
