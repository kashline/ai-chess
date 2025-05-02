// app/api/proxy-cloud-run/route.ts
import { GoogleAuth } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const fen = requestBody.fen;
    const move = requestBody.move;
    if (!fen || !move) {
      return NextResponse.json(
        {
          error: "You must provide the move and fen query parameters.",
        },
        { status: 403 }
      );
    }
    const cloudRunUrl = `${process.env.STOCKFISH_API}/evaluatemove`;
    const targetAudience = cloudRunUrl; // required for ID token

    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY,
      }, // path to service account JSON or use `credentials` object
    });

    const client = await auth.getIdTokenClient(targetAudience);
    const response = await client.request({
      url: cloudRunUrl,
      method: "POST",
      data: {
        fen: fen,
        move: move,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json({ moveEval: response.data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Cloud Run request failed:", error.message);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
