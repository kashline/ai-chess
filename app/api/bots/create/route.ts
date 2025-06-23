import { NextRequest } from "next/server";
import { BotZype } from "@/app/data/zodels/BotZodel";
import Bot from "@/app/data/models/Bot";

export const POST = async (request: NextRequest) => {
  try {
    const reqBot: BotZype = await request.json();
    const bot = await Bot.create({ ...reqBot });
    return Response.json(bot, { status: 200 });
  } catch (error) {
    console.log(`There was an error creating bot: ${error}`);
    return Response.json(
      {
        success: false,
        message: `There was an error creating bot: ${error}`,
      },
      { status: 500 }
    );
  }
};
