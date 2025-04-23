import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export const POST = async (request: NextRequest) => {
  try {
    const data: { model: string; prompt: string } = await request.json();
    const { object } = await generateObject({
      model: openai(data.model, { structuredOutputs: true }),
      schema: z.object({
        move: z.number(),
        explanation: z.string(),
      }),
      prompt: data.prompt,
    });
    return Response.json(object, { status: 200 });
  } catch (error) {
    console.log(`There was an error generating AI move: ${error}`);
    return Response.json(
      {
        success: false,
        message: `There was an error generating AI move: ${error}`,
      },
      { status: 500 }
    );
  }
};
