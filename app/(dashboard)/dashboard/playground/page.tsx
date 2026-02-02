"use client";

import React, { useState, useMemo, useCallback, Suspense, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useComponents } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  Wand2, 
  Layout, 
  Code2, 
  Zap, 
  Filter, 
  Loader2,
  X,
  Plus
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useDebounce } from "@/lib/performance";
import { useSession } from "next-auth/react";
import { AIGeneratorDialog } from "@/components/playground/ai-generator-dialog";
import { AIEditor } from "@/components/playground/ai-editor";
import { cn } from "@/lib/utils";

interface ComponentCardProps {
  component: {
    id: string;
    name: string;
    description: string;
    category: string;
    isPremium?: boolean;
    code?: string;
  };
  onSelect: (component: any) => void;
  isSelected: boolean;
}

const ComponentCard = ({ component, onSelect, isSelected }: ComponentCardProps) => {
  const { data: session } = useSession();
  const isLocked = component.isPremium && session?.user?.plan !== "PRO";

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all relative overflow-hidden h-full border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-indigo-500/50 group",
          isSelected ? "ring-2 ring-indigo-500 border-transparent bg-indigo-500/5" : "",
          isLocked ? "opacity-75" : ""
        )}
        onClick={() => onSelect(component)}
      >
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {isLocked && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-amber-500/10 text-amber-500 text-[10px] font-bold px-2 py-1 rounded-full border border-amber-500/20 flex items-center gap-1 backdrop-blur-sm">
              <Zap size={10} className="fill-amber-500" />
              PRO
            </div>
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 mb-2">
              <Layout className="h-4 w-4 text-indigo-400" />
            </div>
          </div>
          <CardTitle className="text-base font-bold text-slate-100 group-hover:text-white truncate">
            {component.name}
          </CardTitle>
          <CardDescription className="text-xs text-slate-400 line-clamp-2">
            {component.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400 bg-indigo-400/5 border border-indigo-400/20 px-2 py-0.5 rounded-md">
              {component.category}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

function PlaygroundContent() {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [activeComponent, setActiveComponent] = useState<any>(null);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isAISearchLoading, setIsAISearchLoading] = useState(false);
  const [aiFilteredIds, setAiFilteredIds] = useState<string[] | null>(null);
  
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = useComponents(aiFilteredIds ? "" : debouncedSearch, selectedCategory, page, aiFilteredIds || undefined);
  const { toast } = useToast();

  // Handle AI Smart Search
  useEffect(() => {
    async function performAISearch() {
      // Only trigger AI search if query length > 4 and no basic search matches well
      // Or if it looks like natural language
      const isNaturalLanguage = debouncedSearch.includes(" ") || debouncedSearch.length > 10;
      
      if (isNaturalLanguage && debouncedSearch.trim()) {
        setIsAISearchLoading(true);
        try {
          const res = await fetch("/api/search", {
            method: "POST",
            body: JSON.stringify({ query: debouncedSearch }),
          });
          const result = await res.json();
          setAiFilteredIds(result.componentIds);
        } catch (error) {
          console.error("AI Search failed");
        } finally {
          setIsAISearchLoading(false);
        }
      } else {
        setAiFilteredIds(null);
      }
    }

    performAISearch();
  }, [debouncedSearch]);

  const filteredComponents = useMemo(() => {
    if (!data?.components) return [];
    if (aiFilteredIds === null) return data.components;
    
    // Sort components by AI filter priority
    return [...data.components].sort((a, b) => {
      const aIndex = aiFilteredIds.indexOf(a.id);
      const bIndex = aiFilteredIds.indexOf(b.id);
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  }, [data?.components, aiFilteredIds]);

  const categories = useMemo(() => {
    if (!data?.components) return [];
    const cats = new Set(data.components.map((c) => c.category));
    return Array.from(cats);
  }, [data?.components]);

  const handleGenerated = (code: string, name: string) => {
    const newComp = {
      id: "gen-" + Date.now(),
      name,
      code,
      description: "AI Generated Component",
      category: "AI Generated",
    };
    setActiveComponent(newComp);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden">
      {/* Premium Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-8 border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
              UI Playground
            </h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
               <Sparkles className="h-3 w-3 text-indigo-400" />
               <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">AI Enhanced</span>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Forge production-ready components with real-time AI assistance
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsGeneratorOpen(true)}
            className="group relative bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-5 h-10 shadow-lg shadow-indigo-500/20 border-0 overflow-hidden"
          >
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
            <Wand2 className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            New with AI
          </Button>
          <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-300 rounded-xl h-10 px-5 hover:bg-slate-800 hover:text-white transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Custom
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Browser */}
        <div className="w-full lg:w-[400px] flex flex-col border-r border-slate-800 bg-slate-950/30">
          <div className="p-4 space-y-4 border-b border-slate-800/50">
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                {isAISearchLoading ? (
                  <Loader2 className="h-4 w-4 text-indigo-400 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                )}
              </div>
              <Input
                placeholder="Describe what you need..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-800 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-slate-200 placeholder:text-slate-500 rounded-xl h-11"
              />
              {aiFilteredIds && (
                 <button 
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <Filter className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
               <button
                  onClick={() => setSelectedCategory("")}
                  className={cn(
                    "whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                    selectedCategory === "" 
                      ? "bg-indigo-600 border-indigo-500 text-white" 
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                >
                  All
                </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                    selectedCategory === cat 
                      ? "bg-indigo-600 border-indigo-500 text-white" 
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {isLoading && !filteredComponents.length ? (
              <div className="grid gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-32 rounded-xl bg-slate-900/50 animate-pulse border border-slate-800/50" />
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredComponents.map((component) => (
                    <ComponentCard
                      key={component.id}
                      component={component}
                      onSelect={setActiveComponent}
                      isSelected={activeComponent?.id === component.id}
                    />
                  ))}
                </AnimatePresence>
                
                {!isLoading && filteredComponents.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                    <div className="h-16 w-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
                      <Search className="h-8 w-8 text-slate-700" />
                    </div>
                    <h3 className="text-white font-semibold">No components found</h3>
                    <p className="text-sm text-slate-500 mt-2">
                       Try describing something else or use the AI Generator to create it from scratch.
                    </p>
                    <Button 
                      variant="link" 
                      className="text-indigo-400 mt-4 h-auto p-0"
                      onClick={() => setIsGeneratorOpen(true)}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create it with AI
                    </Button>
                  </div>
                )}

                {data && data.total > page * 20 && (
                  <Button
                    variant="ghost"
                    onClick={() => setPage((p) => p + 1)}
                    className="w-full mt-4 border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white"
                  >
                    Load More
                  </Button>
                )
                  }
              </div>
            )}
          </div>
        </div>

        {/* Right Content: AI Editor */}
        <div className="hidden lg:flex flex-1 flex-col overflow-hidden bg-slate-900/20">
          {activeComponent ? (
            <div className="flex flex-col h-full p-6">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20">
                      <Code2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">{activeComponent.name}</h2>
                      <p className="text-xs text-slate-500">Editing in production-grade React environment</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveComponent(null)}
                    className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
               </div>
               
               <div className="flex-1 overflow-hidden min-h-0">
                  <AIEditor 
                    key={activeComponent.id} 
                    initialCode={activeComponent.code || ""} 
                    className="h-full border border-slate-800 shadow-2xl"
                  />
               </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
                <div className="relative h-24 w-24 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-2xl">
                   <Code2 className="h-10 w-10 text-slate-700" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Select a component to begin</h2>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                Choose a component from the library or use our AI Generator to forge something entirely new in seconds.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <Button 
                  onClick={() => setIsGeneratorOpen(true)}
                  className="h-11 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/10 border-0"
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  AI Generator
                </Button>
                <Button 
                   variant="outline"
                   className="h-11 border-slate-800 bg-slate-900 text-slate-300 rounded-xl hover:bg-slate-800 hover:text-white"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Browse All
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AIGeneratorDialog 
        isOpen={isGeneratorOpen} 
        onClose={() => setIsGeneratorOpen(false)}
        onGenerated={handleGenerated}
      />
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center bg-slate-950 text-white">Loading UI Forge...</div>}>
      <PlaygroundContent />
    </Suspense>
  );
}
