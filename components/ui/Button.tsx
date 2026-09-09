import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[10px] font-sans font-medium transition-all hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clicom-blue disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-clicom-blue text-clicom-white hover:bg-clicom-blue/90 shadow-[0_4px_14px_rgba(46,111,219,0.25)]",
        destructive: "bg-red-500 text-clicom-white hover:bg-red-500/90",
        outline: "border border-clicom-slate bg-transparent hover:bg-clicom-mist text-clicom-ink",
        secondary: "bg-clicom-mist text-clicom-ink hover:bg-clicom-slate/20",
        ghost: "hover:bg-clicom-mist text-clicom-ink",
        link: "text-clicom-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 text-[15px]",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
