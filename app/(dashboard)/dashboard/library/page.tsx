"use client";

import { useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useComponents } from "@/lib/api";
import { motion } from "framer-motion";
import { Search, Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useDebounce } from "@/lib/performance";
import { memo } from "react";

interface ComponentItemProps {
  component: {
    id: string;
    name: string;
    description: string;
    code: string;
  };
}

const ComponentItem = memo(({ component }: ComponentItemProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(component.code);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Component code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  }, [component.code, toast]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{component.name}</CardTitle>
            <CardDescription>{component.description}</CardDescription>
          </div>
          <Button size="icon" variant="ghost" onClick={handleCopy}>
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
          <code>{component.code}</code>
        </pre>
      </CardContent>
    </Card>
  );
});

ComponentItem.displayName = "ComponentItem";

function LibraryContent() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading } = useComponents(debouncedSearch, undefined, currentPage);
  const { toast } = useToast();

  const totalPages = useMemo(() => {
    if (!data?.total) return 1;
    return Math.ceil(data.total / itemsPerPage);
  }, [data?.total]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">UI Library</h1>
        <p className="text-muted-foreground">
          Browse and copy production-ready UI components
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Components</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2 mt-2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {data?.components.map((component, index) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <AccordionItem value={component.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="text-left">
                            <h3 className="font-semibold">{component.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {component.description}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ComponentItem component={component} />
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="buttons">
          <p className="text-muted-foreground">Button components coming soon...</p>
        </TabsContent>

        <TabsContent value="forms">
          <p className="text-muted-foreground">Form components coming soon...</p>
        </TabsContent>

        <TabsContent value="cards">
          <p className="text-muted-foreground">Card components coming soon...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function LibraryPage() {
  return <LibraryContent />;
}
