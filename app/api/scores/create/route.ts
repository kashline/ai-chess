import { NextRequest } from "next/server";
import UserScore from "@/app/data/models/UserScore";
import { UserScoreZype } from "@/app/data/zodels/UserScoreZodel";
import User from "@/app/data/models/User";

export const POST = async (request: NextRequest) => {
  try {
    await User.sync();
    await UserScore.sync();
    const { userScore }: { userScore: UserScoreZype } = await request.json();
    const res = await UserScore.findOrCreate({where: { ...userScore }});
    return Response.json({ userScore: res, success: true }, { status: 200 });
  } catch (error) {
    console.log(`There was an error creating leaderboard score: ${error}`);
    return Response.json(
      {
        success: false,
        message: `There was an error creating leaderboard score: ${error}`,
      },
      { status: 500 }
    );
  }
};
