"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  Code2, 
  Zap, 
  Loader2,
  Settings2,
  SearchCode
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface AIEditorProps {
  initialCode?: string;
  onSave?: (code: string) => void;
  className?: string;
}

export function AIEditor({ initialCode = "", onSave, className }: AIEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isCopied, setIsCopied] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [refinePrompt, setRefinePrompt] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  const handleRefine = async () => {
    if (!refinePrompt.trim()) return;

    setIsRefining(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are an expert React refactoring assistant. Apply the user's requested changes to the provided code. Return ONLY the complete updated code block.",
            },
            {
              role: "user",
              content: `Current Code:\n\`\`\`tsx\n${code}\n\`\`\`\n\nRequest: ${refinePrompt}`,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("Refinement failed");

      // Handle raw stream (simplifying for now, following the same pattern as generator)
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let newCode = "";
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith('0:')) {
               try {
                const content = JSON.parse(line.substring(2));
                newCode += content;
              } catch (e) {
                newCode += line.substring(2).replace(/^"(.*)"$/, '$1'); 
              }
            }
          }
        }
      }

      // Cleanup markdown if AI included it
      const cleanedCode = newCode.replace(/```(tsx|jsx|javascript|typescript|react)?/g, "").replace(/```/g, "").trim();
      
      setCode(cleanedCode);
      setRefinePrompt("");
      toast({
        title: "Code Refined!",
        description: "AI has successfully updated your component.",
      });
    } catch (error) {
       toast({
        title: "Refinement failed",
        description: "Could not apply AI suggestions.",
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className={cn("flex flex-col rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl", className)}>
      <Tabs defaultValue="editor" className="w-full">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-4 py-2">
          <div className="flex items-center gap-4">
            <TabsList className="bg-slate-950/50 border border-slate-800 h-9 p-0.5">
              <TabsTrigger value="editor" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white h-7 px-3 text-xs">
                <Code2 className="h-3.5 w-3.5 mr-1.5" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white h-7 px-3 text-xs">
                <Play className="h-3.5 w-3.5 mr-1.5" />
                Live Preview
              </TabsTrigger>
            </TabsList>
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950/50 border border-slate-800">
               <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">AI Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800" onClick={handleCopy}>
              {isCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </Button>
            {onSave && (
              <Button size="sm" onClick={() => onSave(code)} className="bg-indigo-600 hover:bg-indigo-500 text-white h-8 text-xs font-semibold">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Export Code
              </Button>
            )}
          </div>
        </div>

        <TabsContent value="editor" className="p-0 m-0 border-0 focus-visible:ring-0">
          <div className="h-[500px] w-full relative">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "var(--font-mono)",
                padding: { top: 16 },
                scrollbar: {
                  vertical: "visible",
                  horizontal: "visible",
                },
                automaticLayout: true,
                border: "none"
              }}
            />
            
            {/* AI Refinement Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-2/3">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-30 group-focus-within:opacity-60 transition duration-1000"></div>
                <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1.5 shadow-2xl">
                  <div className="px-3">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                  </div>
                  <input
                    placeholder="Ask AI to edit this code (e.g., 'Make it dark mode', 'Add a search bar')..."
                    className="flex-1 bg-transparent border-0 focus:ring-0 text-sm text-slate-200 placeholder:text-slate-500"
                    value={refinePrompt}
                    onChange={(e) => setRefinePrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
                    disabled={isRefining}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleRefine}
                    disabled={isRefining || !refinePrompt.trim()}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white h-8 rounded-lg"
                  >
                    {isRefining ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Apply"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="p-0 m-0 border-0 focus-visible:ring-0">
          <div className="h-[500px] w-full bg-slate-900 overflow-auto p-4 items-center justify-center flex bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="bg-slate-950 rounded-lg p-8 border border-slate-800 shadow-2xl min-w-[300px] text-center">
              <SearchCode className="h-12 w-12 text-slate-600 mb-4 mx-auto" />
              <p className="text-slate-400 text-sm">
                Generated code preview is being simulated.<br/>
                In a full environment, this would render your component live.
              </p>
              <Button variant="outline" className="mt-4 border-slate-800 text-slate-400" onClick={() => (window as any).value = "editor"}>
                Back to Code
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-slate-900/50 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-[10px] text-slate-500">
        <div className="flex items-center gap-4">
          <span>TypeScript / React</span>
          <span>Tailwind CSS v3.4</span>
        </div>
        <div className="flex items-center gap-2">
          <Settings2 className="h-3 w-3" />
          <span>IntelliSense Enabled</span>
        </div>
      </div>
    </div>
  );
}
