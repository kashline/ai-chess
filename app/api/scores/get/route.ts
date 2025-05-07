import UserScore from "@/app/data/models/UserScore";
import User from "@/app/data/models/User";
import Puzzle from "@/app/data/models/Puzzle";

export const GET = async () => {
  try {
    await User.sync();
    await UserScore.sync();
    const res = await UserScore.findAll({order: [['score', 'ASC']], include: {model: Puzzle}});
    console.log(res)
    return Response.json({ userScore: res, success: true }, { status: 200 });
  } catch (error) {
    console.log(`There was an error retrieving leaderboard scores: ${error}`);
    return Response.json(
      {
        success: false,
        message: `There was an error retrieving leaderboard scores: ${error}`,
      },
      { status: 500 }
    );
  }
};
