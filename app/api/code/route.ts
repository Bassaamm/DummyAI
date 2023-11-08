import { Configuration, OpenAIApi } from "openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { increaseLimitApi, limitChecker } from "@/lib/apiLimit";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAIApi(configuration);
const behivor = {
  role: "system",
  content:
    "your are code generator you only answer question related to coding, solving coding problems, use markdown code sinppets, use comments to explain needed explantion code lines,don't answer any question that is not related to programing  ",
};
export const runtime = 'edge'; // 'nodejs' is the default

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    const isFreeTrial = await limitChecker();

    if (!isFreeTrial)
      return new NextResponse("Free limit has expired", { status: 403 });
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [behivor, ...messages],
    });
    await increaseLimitApi();
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
