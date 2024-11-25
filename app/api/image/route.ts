import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt, amount = '1' , resolution = '512x512' } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("Open Api key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is reequired", { status: 500 });
    }
    if (!amount) {
      return new NextResponse("amount is required", { status: 500 });
    }
    if (!resolution) {
      return new NextResponse("resolution is required", { status: 500 });
    }

    console.log(configuration.apiKey);

    const response = await openai.createImage({
      prompt,
      n : parseInt(amount, 10),
      size : resolution
    })

    console.log(response.data.data)

    return NextResponse.json(response.data.data);
  } catch (e: unknown) {
    console.log("[image error]", e);
    return new NextResponse("internal error", { status: 500 });
  }
}