import { increaseLimitApi, limitChecker } from "@/lib/apiLimit";
import { Message } from "./../../../node_modules/uvu/assert/index.d";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { promptInput, imgAmount } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!promptInput) {
      return new NextResponse("prompt is required", { status: 400 });
    }
    if (!imgAmount) {
      return new NextResponse("imgAmount is required", { status: 400 });
    }
    const isFreeTrial = await limitChecker();

    if (!isFreeTrial)
      return new NextResponse("Free limit has expired", { status: 403 });
    const response = await openai.createImage({
      prompt: promptInput,
      n: imgAmount,
    });
    await increaseLimitApi();
    return NextResponse.json(response.data.data);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
