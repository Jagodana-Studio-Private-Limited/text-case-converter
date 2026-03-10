"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Trash2, ClipboardPaste, CaseSensitive } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { caseFormats } from "@/lib/case-converter";
import { trackEvent } from "@/lib/analytics";

const SAMPLE_TEXT = "my example variable name";

export function CaseConverterTool() {
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const results = useMemo(() => {
    const text = input.trim();
    if (!text) return null;
    return caseFormats.map((fmt) => ({
      ...fmt,
      result: fmt.convert(text),
    }));
  }, [input]);

  const handleCopy = useCallback(async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Copied to clipboard!");
      trackEvent("result_copied", { format: id });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      toast.success("Pasted from clipboard!");
    } catch {
      toast.error("Failed to paste — check clipboard permissions");
    }
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
    toast("Input cleared");
  }, []);

  const handleSample = useCallback(() => {
    setInput(SAMPLE_TEXT);
  }, []);

  return (
    <div className="space-y-6">
      {/* Input Area */}
      <Card className="p-6 border-border/50 bg-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CaseSensitive className="h-5 w-5 text-brand" />
            <h2 className="font-semibold text-lg">Input Text</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSample}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Try Sample
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePaste}
              className="gap-1"
            >
              <ClipboardPaste className="h-4 w-4" />
              Paste
            </Button>
            {input && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="gap-1 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text here... e.g. myVariableName, some-kebab-text, MY_CONSTANT"
          className="w-full min-h-[120px] p-4 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground/60 resize-y focus:outline-none focus:ring-2 focus:ring-brand/30 font-mono text-sm leading-relaxed"
          spellCheck={false}
          autoFocus
        />
        {input && (
          <p className="mt-2 text-xs text-muted-foreground">
            {input.trim().length} characters · {input.trim().split(/\s+/).filter(Boolean).length} word{input.trim().split(/\s+/).filter(Boolean).length !== 1 ? "s" : ""}
          </p>
        )}
      </Card>

      {/* Results Grid */}
      <AnimatePresence mode="wait">
        {results ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {results.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="p-4 border-border/50 bg-card hover:border-brand/30 transition-colors group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-brand">
                          {item.name}
                        </span>
                      </div>
                      <p className="font-mono text-sm break-all leading-relaxed text-foreground">
                        {item.result}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(item.id, item.result)}
                      className="shrink-0 h-8 w-8 p-0 opacity-50 group-hover:opacity-100 transition-opacity"
                      aria-label={`Copy ${item.name} result`}
                    >
                      {copiedId === item.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <CaseSensitive className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Enter some text above to see all case conversions
            </p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              Try pasting a variable name, sentence, or any text
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
