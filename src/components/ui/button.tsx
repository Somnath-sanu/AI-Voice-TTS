import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[inset_-5px_-7px_12px_rgba(0,0,0,0.22),inset_5px_7px_14px_rgba(255,255,255,0.28),0_12px_30px_rgba(200,255,90,0.18)] hover:bg-primary/95 hover:shadow-[inset_-5px_-7px_12px_rgba(0,0,0,0.2),inset_5px_7px_14px_rgba(255,255,255,0.32),0_16px_42px_rgba(200,255,90,0.28)]",
        destructive:
          "bg-destructive text-white shadow-[inset_-5px_-7px_12px_rgba(0,0,0,0.22),inset_5px_7px_14px_rgba(255,255,255,0.16),0_12px_30px_rgba(255,90,60,0.18)] hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/80",
        outline:
          "clay-pill text-foreground hover:border-primary/45 hover:text-primary hover:shadow-[var(--clay-glow)]",
        secondary:
          "clay-soft text-secondary-foreground hover:border-accent/40 hover:text-accent",
        ghost:
          "hover:bg-white/8 hover:text-primary hover:shadow-[inset_-4px_-5px_10px_rgba(0,0,0,0.24),inset_4px_5px_10px_rgba(255,255,255,0.06)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        xs: "h-7 gap-1 px-2.5 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 px-7 has-[>svg]:px-5",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
