import Link from "next/link";
import { AudioLines, BookOpen, Sparkles, Volume2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export function VoicePreviewPlaceholder() {
  return (
    <div className="relative hidden h-full flex-1 flex-col items-center justify-center gap-6 overflow-hidden border-t border-white/10 lg:flex">
      <div className="absolute inset-x-16 top-12 h-40 rounded-full bg-accent/10 blur-3xl" />
      <Image
        src="/assets/clay/music-dynamic-clay.png"
        alt=""
        width={180}
        height={180}
        className="pointer-events-none absolute right-12 bottom-8 rotate-12 opacity-35 blur-[0.2px] drop-shadow-[0_28px_40px_rgba(0,0,0,0.34)]"
      />
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex w-32 items-center justify-center">
          <div className="clay-soft absolute left-0 -rotate-30 rounded-full p-4">
            <Volume2 className="size-5 text-muted-foreground" />
          </div>

          <div className="relative z-10 rounded-full bg-primary p-4 text-primary-foreground shadow-[0_0_28px_rgba(200,255,90,0.28)]">
            <Sparkles className="size-5 text-background" />
          </div>

          <div className="clay-soft absolute right-0 -rotate-30 rounded-full p-4">
            <AudioLines className="size-5 text-muted-foreground" />
          </div>
        </div>

        <p className="text-lg font-semibold tracking-tight text-foreground">
          Preview blooms here
        </p>
        <p className="max-w-64 text-center text-sm text-muted-foreground">
          Once you generate, your audio result will appear here. Sit back and
          relax.
        </p>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href="mailto:somnath100dbi@gmail.com">
          <BookOpen />
          Don&apos;t know how?
        </Link>
      </Button>
    </div>
  );
}
