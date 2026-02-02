import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { query, categories } = await req.json();

  if (!query) {
    return Response.json({ componentIds: null });
  }

  // Fetch all component names and descriptions to filter them with AI
  const components = await prisma.component.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
    },
  });

  const componentList = components.map(c => 
    `ID: ${c.id}, Name: ${c.name}, Desc: ${c.description}, Cat: ${c.category}`
  ).join("\n");

  const system = `You are a search assistant for UIforge.dev. 
The user will provide a natural language query. 
You will return a JSON object with a 'componentIds' array containing the IDs of components that best match the query.
If no components match well, return an empty array.
Query: "${query}"

Available Components:
${componentList}`;

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: "Identify the best matching component IDs for the query. Return ONLY valid JSON.",
      system,
    });

    // Extract JSON from potential markdown fluff
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(jsonStr);

    return Response.json(result);
  } catch (error) {
    console.error("AI Search Error:", error);
    return Response.json({ componentIds: [] });
  }
}
