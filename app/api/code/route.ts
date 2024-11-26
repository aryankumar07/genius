import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage : ChatCompletionRequestMessage = {
  role : 'system',
  content : 'You are a code generator . You must answer only in markdown code snippets. use code comments for explanation'
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("Open Api key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Message are reequired", { status: 500 });
    }

    const freetrial = await checkApiLimit(userId)

    if (!freetrial) {
      return new NextResponse("Free Trial Expired", { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages : [instructionMessage , ...messages],
    });

    await increaseApiLimit(userId);

    return NextResponse.json(response.data.choices[0].message);
  } catch (e: unknown) {
    console.log("[Code error]", e);
    return new NextResponse("internal error", { status: 500 });
  }
}
