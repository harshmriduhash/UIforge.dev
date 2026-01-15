import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


// Mock component data - in production, this would come from a database
const mockComponents = [
  {
    id: "1",
    name: "Button",
    description: "A versatile button component with multiple variants",
    category: "Buttons",
    code: `import { Button } from "@/components/ui/button";

<Button>Click me</Button>`,
    props: { variant: "default", size: "default" },
  },
  {
    id: "2",
    name: "Card",
    description: "A flexible card component for displaying content",
    category: "Cards",
    code: `import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Card content goes here</CardContent>
</Card>`,
  },
  {
    id: "3",
    name: "Input",
    description: "A styled input component for forms",
    category: "Forms",
    code: `import { Input } from "@/components/ui/input";

<Input type="text" placeholder="Enter text..." />`,
  },
  {
    id: "4",
    name: "Modal",
    description: "A dialog/modal component for overlays",
    category: "Overlays",
    code: `import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
  },
  {
    id: "5",
    name: "Toast",
    description: "A toast notification component",
    category: "Feedback",
    code: `import { useToast } from "@/components/ui/use-toast";

const { toast } = useToast();
toast({ title: "Hello", description: "World" });`,
  },
  {
    id: "6",
    name: "Accordion",
    description: "A collapsible accordion component",
    category: "Layout",
    code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  let filtered = mockComponents;

  if (search) {
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search)
    );
  }

  if (category) {
    filtered = filtered.filter((c) => c.category === category);
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return NextResponse.json({
    components: paginated,
    total: filtered.length,
    page,
    limit,
  });
}
