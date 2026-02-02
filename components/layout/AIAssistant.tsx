"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  Loader2, 
  Sparkles, 
  Maximize2, 
  Minimize2,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "mb-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-in-out flex flex-col",
              isMaximized ? "w-[90vw] h-[80vh] md:w-[600px] md:h-[700px]" : "w-[90vw] h-[500px] sm:w-[400px]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/20">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">UIForge Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] text-slate-400">Online & Ready</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                  onClick={() => setIsMaximized(!isMaximized)}
                >
                  {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar" ref={scrollRef}>
              <div className="space-y-4 pb-4">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
                      <Sparkles className="h-8 w-8 text-indigo-400" />
                    </div>
                    <h4 className="text-sm font-medium text-white">How can I help you today?</h4>
                    <p className="mt-1 text-xs text-slate-400">
                      Ask me about components, React patterns, or how to use the dashboard!
                    </p>
                  </div>
                )}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex flex-col gap-1 max-w-[85%]",
                      m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                        m.role === "user"
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"
                      )}
                    >
                      {m.content}
                    </div>
                    <span className="px-1 text-[10px] text-slate-500">
                      {m.role === "user" ? "You" : "Assistant"}
                    </span>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex mr-auto items-start max-w-[85%]">
                    <div className="rounded-2xl px-4 py-2.5 bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700">
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-slate-800 bg-slate-900/50 p-4"
            >
              <div className="relative flex items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={handleInputChange}
                  className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600 text-slate-200 grow h-10 px-4 rounded-xl"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="rounded-xl h-10 w-10 p-0 bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 shadow-lg shadow-indigo-500/20"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center p-0 overflow-hidden",
          isOpen ? "bg-slate-800 hover:bg-slate-700 rotate-90" : "bg-indigo-600 hover:bg-indigo-500 scale-100 hover:scale-105"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 border-2 border-indigo-600"></span>
            </span>
          </div>
        )}
      </Button>
    </div>
  );
}
