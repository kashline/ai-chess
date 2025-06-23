"use server";

import { CreateBotZodel } from "@/app/data/zodels/BotZodel";
import BotEditFormClientWrapper from "@/app/ui/BotEditFormClientWrapper";
import { cookies } from "next/headers";

export default async function Page() {
  const userID = (await cookies()).get("userId")?.value;
  const bot = CreateBotZodel.parse({
    Name: "",
    UserID: userID,
    Prompt: "",
    Model: "gpt-4o-mini",
    RemainingGames: 0,
  });
  return (
    <div>
      <div className="flex">
        <h1 className="mx-auto text-4xl text-lavendar-blush py-4">New Bot</h1>
      </div>
      <BotEditFormClientWrapper bot={bot} edit={false} />
    </div>
  );
}
