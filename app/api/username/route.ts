import { auth } from "@/auth";
import { NextResponse } from "next/server";
import User from "@/app/data/models/User";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username } = await req.json();

  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return NextResponse.json(
      { error: "Username must be alphanumeric (letters, numbers, or _)" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    return NextResponse.json({ error: "Username already taken" }, { status: 409 });
  }

  await User.update(
    { username },
    {
      where: { email: session.user.email },
    }
  );

  return NextResponse.json({ success: true });
}
