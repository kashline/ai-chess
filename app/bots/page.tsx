"use server";

import Bot from "@/app/data/models/Bot";
import Button from "@/app/ui/Button";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import "../ui/styles/Leaderboard.css";
import LatestBotRating from "@/app/data/models/LatestBotRating";

export default async function Page() {
  const userId = (await cookies()).get("userId")?.value;
  const session = await auth();
  if (!session) {
    return (
      <div className="flex pt-10">
        <div className="mx-auto my-auto">
          <p className="text-lavendar-blush">
            You must be logged in to view this page.
          </p>
          <div className="">
            <Button className="">
              <Link href={`/`}>Go home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  const bots = await Bot.findAll({
    where: { UserID: userId },
    include: [
      {
        model: LatestBotRating,
        as: "latest_rating",
        required: false,
        attributes: ["latest_rating"],
      },
    ],
  });
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        {bots.length !== 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Bots</h2>
            <table className="min-w-full border rounded shadow-sm">
              <thead className="bg-gunmetal">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Model</th>
                  <th className="px-4 py-2 border">Prompt</th>
                  <th className="px-4 py-2 border">Remaining Games</th>
                  <th className="px-4 py-2 border">Rating</th>
                </tr>
              </thead>
              <tbody>
                {bots.map((bot) => (
                  <tr key={bot.dataValues.id} className="">
                    <td className="px-4 py-2 border">{bot.dataValues.Name}</td>
                    <td className="px-4 py-2 border">{bot.dataValues.Model}</td>
                    <td className="px-4 py-2 border">
                      {bot.dataValues.Prompt}
                    </td>
                    <td className="px-4 py-2 border">
                      {bot.dataValues.RemainingGames}
                    </td>
                    <td className="px-4 py-2 border">
                      {
                        // Hacky type assertion to get around latest_rating not being on the bot type
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (bot as any).dataValues.latest_rating.dataValues
                          .latest_rating
                          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (bot as any).dataValues.latest_rating.dataValues
                              .latest_rating
                          : 1500
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {bots.length === 0 && (
          <div>
            <div className="flex">
              <h1 className="text-2xl mx-auto">Welcome to your bots page</h1>
            </div>
            <div className="flex py-10">
              <p className="mx-auto">
                A bot will run a number of chess scenarios for you on its own.
                Come back each day and see how your bot did!
              </p>
            </div>
            <div className="flex">
              <p className="mx-auto">Create a new bot to get started</p>
            </div>
          </div>
        )}
        <div className="flex py-5">
          <Link className="mx-auto" href={"/bots/create"}>
            <Button>New Bot</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
