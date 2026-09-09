import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./Button" // using cn from Button for convenience, ideally cn is in lib/utils

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-clicom-blue focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-clicom-mist text-clicom-ink",
        ia:
          "border-transparent bg-gradient-to-r from-clicom-navy to-clicom-cyan text-clicom-white shadow-sm",
        local:
          "border-transparent bg-clicom-blue/10 text-clicom-blue",
        nouveau:
          "border-transparent bg-clicom-amber text-clicom-white",
        outline: "text-clicom-ink border-clicom-slate",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
