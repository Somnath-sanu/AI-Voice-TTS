"use client";

import { useUser } from "@clerk/nextjs";
import { Headphones, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { isLoaded, user } = useUser();

  return (
    <div className="clay-panel relative overflow-hidden rounded-[2.5rem] p-5 lg:p-8">
      <div className="absolute -right-8 -top-16 size-64 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-[-6rem] right-36 size-56 rounded-full bg-accent/12 blur-3xl" />
      <Image
        src="/assets/clay/headphone-dynamic-clay.png"
        alt=""
        width={190}
        height={190}
        priority
        className="pointer-events-none absolute -right-5 -bottom-12 hidden rotate-[-10deg] opacity-90 drop-shadow-[0_28px_38px_rgba(0,0,0,0.34)] lg:block"
      />

      <div className="relative flex items-start justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Velora Voice Studio
          </p>
          <h1 className="text-3xl font-bold tracking-[-0.06em] lg:text-5xl">
            Nice to see you,{" "}
            <span className="neon-text">
              {isLoaded ? (user?.firstName ?? user?.fullName ?? "creator") : "..."}
            </span>
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-base italic">
            Shape cinematic voiceovers, preview expressive voices, and download
            polished audio from one tactile dark studio.
          </p>
        </div>

        <div className="hidden items-center gap-3 pr-42 lg:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="mailto:somnath100dbi@gmail.com">
              <ThumbsUp />
              <span className="hidden lg:block">Feedback</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="mailto:somnath100dbi@gmail.com">
              <Headphones />
              <span className="hidden lg:block">Need help?</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
