"use client";

import { useState } from "react";
import { Pause, Play, Download, Redo, Undo } from "lucide-react";
// import Image from "next/image";
// import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useWaveSurfer } from "../hooks/use-wavesurfer";


type VoicePreviewPanelVoice = {
  id?: string;
  name: string;
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function VoicePreviewPanel({
  audioUrl,
  voice,
  text,
}: {
  audioUrl: string;
  voice: VoicePreviewPanelVoice | null;
  text: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const selectedVoiceName = voice?.name ?? null;
  const selectedVoiceSeed = voice?.id ?? null;

  const {
    containerRef,
    isPlaying,
    isReady,
    currentTime,
    duration,
    togglePlayPause,
    seekBackward,
    seekForward,
  } = useWaveSurfer({
    url: audioUrl,
    autoplay: true,
  });

  const handleDownload = () => {
    setIsDownloading(true);

    const safeName =
      text
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase() || "speech";

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${safeName}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  // console.log("VoicePreviewPanel render", { audioUrl, voice, text });
  
  return (
    <div className="relative hidden h-50 flex-1 flex-col gap-4 border-t border-white/10 lg:flex overflow-y-auto no-scrollbar">
      <div className="absolute -left-16 top-16 size-64 rounded-full bg-accent/10 blur-3xl" />
      {/* <Image
        src="/assets/clay/file-clay.svg"
        alt=""
        width={50}
        height={100}
        className="pointer-events-none absolute right-8 top-6 opacity-70 drop-shadow-[0_24px_32px_rgba(0,0,0,0.36)]"
      /> */}
      {/* <div className="relative p-6 pb-0">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          Download ready
        </p>
        <h3 className="text-2xl font-bold tracking-[-0.05em] text-foreground">
          Voice preview
        </h3>
      </div> */}

      {/* Content */}
      <div className="relative flex flex-1 items-center justify-center">
        {!isReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Badge
              variant="outline"
              className="gap-2 bg-background/90 px-3 py-1.5 text-sm text-muted-foreground shadow-sm"
            >
              <Spinner className="size-4" />
              <span>Loading audio...</span>
            </Badge>
          </div>
        )}
        <div
          ref={containerRef}
          className={cn(
            "w-full cursor-pointer px-8 transition-opacity duration-200",
            !isReady && "opacity-0",
          )}
        />
      </div>
      {/* Time display */}
      <div className="flex items-center justify-center">
        <p className="clay-pill px-6 py-3 text-3xl font-bold tabular-nums tracking-[-0.05em] text-foreground">
          {formatTime(currentTime)}&nbsp;
          <span className="text-muted-foreground">
            /&nbsp;{formatTime(duration)}
          </span>
        </p>
      </div>

      {/* Footer */}
      <div className="relative flex flex-col items-center p-6">
        <div className="clay-soft grid w-full grid-cols-3 rounded-[2rem] p-4">
          {/* Metadata */}
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate text-sm font-medium text-foreground">
              {text}
            </p>
            {selectedVoiceName && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <VoiceAvatar
                  seed={selectedVoiceSeed ?? selectedVoiceName}
                  name={selectedVoiceName}
                  className="shrink-0"
                />
                <span className="truncate">{selectedVoiceName}</span>
              </div>
            )}
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              size="icon-lg"
              className="flex-col"
              onClick={() => seekBackward(10)}
              disabled={!isReady}
            >
              <Undo className="size-4 -mb-1" />
              <span className="text-[10px] font-medium">10</span>
            </Button>

            <Button
              variant="default"
              size="icon-lg"
              className="size-14 rounded-full"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="fill-background" />
              ) : (
                <Play className="fill-background" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon-lg"
              className="flex-col"
              onClick={() => seekForward(10)}
              disabled={!isReady}
            >
              <Redo className="size-4 -mb-1" />
              <span className="text-[10px] font-medium">10</span>
            </Button>
          </div>

          {/* Download */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="size-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
