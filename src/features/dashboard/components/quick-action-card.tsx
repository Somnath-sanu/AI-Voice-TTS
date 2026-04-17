import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type QuickAction } from "../data/quick-actions";

type QuickActionCardProps = QuickAction;

export function QuickActionCard({
  title,
  description,
  gradient,
  href,
}: QuickActionCardProps) {
  const assetSrc = title.includes("Podcast") || title.includes("Story")
    ? "/assets/clay/headphone-dynamic-clay.png"
    : title.includes("Meditation")
      ? "/assets/clay/music-dynamic-clay.png"
      : "/assets/clay/mic-clay.svg";

  return (
    <div className="clay-soft group relative flex min-h-44 overflow-hidden rounded-[2rem] p-4 transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute -right-10 -top-12 size-36 rounded-full bg-primary/15 blur-3xl transition-opacity group-hover:opacity-100" />
      <div
        className={cn(
          "relative h-32 w-32 shrink-0 overflow-hidden rounded-[1.7rem] bg-linear-to-br shadow-[inset_-7px_-8px_16px_rgba(0,0,0,0.22),inset_7px_8px_16px_rgba(255,255,255,0.12)]",
          gradient,
        )}
      >
        <Image
          src={assetSrc}
          alt=""
          width={120}
          height={120}
          className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.26)] transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-3 rounded-[1.25rem] ring-2 ring-inset ring-white/25" />
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col justify-between py-1 pl-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold tracking-[-0.03em]">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <Button variant="outline" size="xs" className="w-fit" asChild>
          <Link href={href}>
            Try now
            <ArrowRight className="size-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
