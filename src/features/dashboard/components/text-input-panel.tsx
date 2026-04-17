"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coins, Sparkles } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  TEXT_MAX_LENGTH,
  COST_PER_CHARACTER,
} from "@/features/text-to-speech/data/constants";

export function TextInputPanel() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleGenerate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    router.push(`/text-to-speech?text=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div
      className="
      relative overflow-hidden rounded-[2.5rem] bg-linear-135 from-primary via-accent to-chart-3 p-px shadow-[0_0_45px_rgba(200,255,90,0.16)]
    "
    >
      <div className="absolute right-8 top-6 hidden size-28 rounded-full bg-primary/20 blur-2xl lg:block" />
      <Image
        src="/assets/clay/mic-clay.svg"
        alt=""
        width={128}
        height={128}
        className="pointer-events-none absolute -right-2 -top-4 hidden rotate-12 opacity-80 drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)] md:block"
      />
      <div className="clay-panel relative rounded-[2.45rem] p-2">
        <div className="space-y-4 rounded-[2rem] bg-background/35 p-5 shadow-[inset_-8px_-10px_20px_rgba(0,0,0,0.28),inset_8px_10px_20px_rgba(255,255,255,0.045)]">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles className="size-4" />
            Start a new voiceover
          </div>
          <Textarea
            placeholder="Start typing or paste your text here..."
            className="min-h-38 resize-none border-0 bg-transparent p-0 text-lg leading-relaxed shadow-none focus-visible:ring-0 ps-5 pe-3 pt-4 pb-5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={TEXT_MAX_LENGTH}
          />

          {/* Bottom info */}

          <div className="flex items-center justify-between">
            {/* <Badge variant="outline" className="gap-1.5 border-dashed border-primary/30">
              <Coins className="size-3 text-chart-5" />
              <span className="text-xs">
                {text.length === 0 ? (
                  "Start typing to estimate"
                ) : (
                  <>
                    <span className="tabular-nums">
                      ${(text.length * COST_PER_CHARACTER).toFixed(4)}
                    </span>{" "}
                    estimated
                  </>
                )}
              </span>
            </Badge> */}
            <div></div>
            <span className="text-xs text-muted-foreground">
              {text.length.toLocaleString()} /{" "}
              {TEXT_MAX_LENGTH.toLocaleString()} characters
            </span>
          </div>
        </div>

        {/* Action bar */}

        <div className="flex items-center justify-end p-3">
          <Button
            size="lg"
            disabled={!text.trim()}
            onClick={handleGenerate}
            className="w-full lg:w-auto"
          >
            Generate speech
          </Button>
        </div>
      </div>
    </div>
  );
}
