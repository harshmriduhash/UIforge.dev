import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: "You are the Glint Assistant. You help users learn how to use Glint, find components, and master professional UI engineering with React and Tailwind CSS. Glint is a platform for high-quality UI patterns. You can answer questions about the platform, explain component implementation details, and suggest the best patterns for specific use cases.",
    messages,
  });

  return result.toDataStreamResponse();
}
