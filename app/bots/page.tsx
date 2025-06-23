"use server";

import Bot from "@/app/data/models/Bot";
import Button from "@/app/ui/Button";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import "../ui/styles/Leaderboard.css";

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
  const bots = await Bot.findAll({ where: { UserID: userId } });
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Bots</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded shadow-sm">
          <thead className="bg-gunmetal">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Model</th>
              <th className="px-4 py-2 border">Prompt</th>
              <th className="px-4 py-2 border">Remaining Games</th>
            </tr>
          </thead>
          <tbody>
            {bots.map((bot) => (
              <tr key={bot.dataValues.id} className="">
                <td className="px-4 py-2 border">{bot.dataValues.Name}</td>
                <td className="px-4 py-2 border">{bot.dataValues.Model}</td>
                <td className="px-4 py-2 border">{bot.dataValues.Prompt}</td>
                <td className="px-4 py-2 border">
                  {bot.dataValues.RemainingGames}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href={"/bots/create"}>
          <Button>New Bot</Button>
        </Link>
      </div>
    </div>
  );
}
