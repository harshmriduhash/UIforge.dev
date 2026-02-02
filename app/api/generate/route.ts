import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const maxDuration = 60;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { description } = await req.json();

  const system = `You are an expert React and Tailwind CSS developer. 
Your goal is to generate high-quality, production-ready UI components based on user descriptions.
Requirements:
- Use React with TypeScript.
- Use Tailwind CSS for styling.
- Use Lucide React for icons if needed.
- Focus on clean, modular, and accessible code.
- Provide ONLY the component code block without any explanation or additional text.
- The component should be a default export.
- Ensure the component is visually stunning and follows modern UI trends (glassmorphism, subtle gradients, etc.).`;

  const result = streamText({
    model: openai("gpt-4o"),
    system,
    prompt: `Generate a React component for: ${description}`,
  });

  return result.toDataStreamResponse();
}
