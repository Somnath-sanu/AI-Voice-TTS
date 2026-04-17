import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-2xl bg-white/10 shadow-[inset_-5px_-6px_12px_rgba(0,0,0,0.2),inset_5px_6px_12px_rgba(255,255,255,0.04)]", className)}
      {...props}
    />
  )
}

export { Skeleton }
