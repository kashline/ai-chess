import { NextRequest } from "next/server";
import { BotZype } from "@/app/data/zodels/BotZodel";
import Bot from "@/app/data/models/Bot";

export const POST = async (request: NextRequest) => {
  try {
    const reqBot: BotZype = await request.json();
    const bot = await Bot.findByPk(reqBot.UserID);
    if (bot) {
      bot.Name = reqBot.Name;
      bot.Prompt = reqBot.Prompt;
      bot.save()
    }
    return Response.json(bot, { status: 200 });
  } catch (error) {
    console.log(`There was an error editing bot: ${error}`);
    return Response.json(
      {
        success: false,
        message: `There was an error editing bot: ${error}`,
      },
      { status: 500 }
    );
  }
};
