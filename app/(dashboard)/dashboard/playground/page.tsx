"use client";

import React, { useState, useMemo, useCallback, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useComponents } from "@/lib/api";
import { motion } from "framer-motion";
import { Search, Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FixedSizeList } from "react-window";
import dynamic from "next/dynamic";
import { useDebounce } from "@/lib/performance";

const ComponentPreview = dynamic(() => import("@/components/playground/component-preview"), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
});

interface ComponentCardProps {
  component: {
    id: string;
    name: string;
    description: string;
    category: string;
  };
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const ComponentCard = ({ component, onSelect, isSelected }: ComponentCardProps) => {
  const { data: session } = useSession();
  const isLocked = component.isPremium && session?.user?.plan !== "PRO";

  const handleClick = useCallback(() => {
    onSelect(component.id);
  }, [component.id, onSelect]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`cursor-pointer transition-all relative overflow-hidden ${
          isSelected ? "ring-2 ring-primary" : ""
        } ${isLocked ? "opacity-75 grayscale-[0.5]" : ""}`}
        onClick={handleClick}
      >
        {isLocked && (
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-yellow-500/10 text-yellow-500 text-[10px] font-bold px-2 py-1 rounded-full border border-yellow-500/20 flex items-center gap-1">
              <Zap size={10} className="fill-yellow-500" />
              PRO
            </div>
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            {component.name}
            {isLocked && <span className="text-muted-foreground opacity-50">🔒</span>}
          </CardTitle>
          <CardDescription className="line-clamp-2">{component.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-1 rounded">
            {component.category}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MemoizedComponentCard = React.memo(ComponentCard);

function PlaygroundContent() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading } = useComponents(debouncedSearch, selectedCategory, page);
  const { toast } = useToast();

  const categories = useMemo(() => {
    if (!data?.components) return [];
    const cats = new Set(data.components.map((c) => c.category));
    return Array.from(cats);
  }, [data?.components]);

  const handleSelectComponent = useCallback((id: string) => {
    setSelectedComponent(id);
  }, []);

  const selectedComponentData = useMemo(() => {
    if (!selectedComponent || !data?.components) return null;
    return data.components.find((c) => c.id === selectedComponent);
  }, [selectedComponent, data?.components]);

  const handleCopyCode = useCallback(() => {
    if (selectedComponentData?.code) {
      navigator.clipboard.writeText(selectedComponentData.code);
      toast({
        title: "Copied!",
        description: "Component code copied to clipboard",
      });
    }
  }, [selectedComponentData, toast]);

  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">UI Playground</h1>
        <p className="text-muted-foreground">
          Explore and test UI components in real-time
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search components..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2 mt-2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data?.components.map((component) => (
                <MemoizedComponentCard
                  key={component.id}
                  component={component}
                  onSelect={handleSelectComponent}
                  isSelected={selectedComponent === component.id}
                />
              ))}
            </div>
          )}

          {data && data.total > page * 20 && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
              >
                Load More
              </Button>
            </div>
          )}
        </div>

        {selectedComponentData && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-96 space-y-4"
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedComponentData.name}</CardTitle>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={handleCopyCode}
                    disabled={selectedComponentData.isPremium && session?.user?.plan !== "PRO"}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>{selectedComponentData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedComponentData.isPremium && session?.user?.plan !== "PRO" ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-background/50 rounded-lg border border-dashed">
                    <Zap className="h-12 w-12 text-yellow-500 fill-yellow-500 animate-pulse" />
                    <div>
                      <h3 className="font-bold">Premium Component</h3>
                      <p className="text-sm text-muted-foreground">Unlock access to production-ready patterns.</p>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 border-0"
                      onClick={() => window.location.href = '/pricing'}
                    >
                      Upgrade to PRO
                    </Button>
                  </div>
                ) : (
                  <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded" />}>
                    <ComponentPreview component={selectedComponentData} />
                  </Suspense>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="flex-1 p-8">Loading...</div>}>
      <PlaygroundContent />
    </Suspense>
  );
}
