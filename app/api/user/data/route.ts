import { NextRequest, NextResponse } from "next/server";
import User from "@/app/data/models/User";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("email");
    const user = await User.findOne({ where: { email: userEmail } });
    const response = NextResponse.json(user, { status: 200 });
    response.cookies.set("userId", user!.dataValues.id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    return response;
  } catch (error) {
    console.log(`There was an error retrieving user: ${error}`);
    return Response.json(
      {
        success: false,
        message: `There was an error retrieving user: ${error}`,
      },
      { status: 500 }
    );
  }
};
