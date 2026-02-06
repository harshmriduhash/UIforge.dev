"use client";

import { useState } from "react";
import { useCompletion } from "ai/react";
import {
  Sparkles,
  Wand2,
  Loader2,
  Code2,
  Eye,
  Save,
  Rocket,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface AIGeneratorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (code: string, name: string) => void;
}

export function AIGeneratorDialog({
  isOpen,
  onClose,
  onGenerated,
}: AIGeneratorDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ description: prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate");

      // Handle streaming or just get the text
      // For simplicity in this first iteration, we'll get the full text
      // but the API supports streaming. We can use a reader here.
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let code = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          // Clean up Vercel AI SDK data stream prefixes (0:, 1:, etc)
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const content = JSON.parse(line.substring(2));
                code += content;
              } catch (e) {
                // If it's not JSON, it might be raw text in some protocol versions
                code += line.substring(2).replace(/^"(.*)"$/, "$1");
              }
            }
          }
        }
      }

      onGenerated(code, "Generated Component");
      toast({
        title: "Component Generated!",
        description: "You can now preview and edit your component.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Something went wrong while generating the component.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-slate-950 border-slate-800 text-white shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Sparkles className="h-5 w-5 fill-indigo-400/20" />
            <span className="text-xs font-bold uppercase tracking-widest">
              AI Component Forge
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            What should we build today?
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Describe the UI component you need. Be specific about features,
            colors, and behavior.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
            <Textarea
              placeholder="e.g., A pricing section with three tiers, glassmorphism cards, and a toggle for monthly/yearly billing. Use indigo accents."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="relative min-h-[150px] bg-slate-900 border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 text-slate-200 rounded-xl resize-none p-4"
              disabled={isGenerating}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Pricing Table",
              "Glass Navigation",
              "User Profile Card",
              "Data Dashboard",
            ].map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setPrompt(
                    `A professional ${tag.toLowerCase()} using React and Tailwind CSS...`,
                  )
                }
                className="text-[10px] px-2 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
                disabled={isGenerating}
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-900"
            disabled={isGenerating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-6 min-w-[140px] shadow-lg shadow-indigo-500/20 border-0"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Forging...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Component
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
