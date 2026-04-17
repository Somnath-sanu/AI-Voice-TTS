import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-white/10 bg-background/70 px-4 py-4 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-bold tracking-[-0.04em]">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
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
  );
}
