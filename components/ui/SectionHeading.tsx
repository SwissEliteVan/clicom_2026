import * as React from "react"
import { cn } from "./Button" // Assuming cn is accessible here

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  kicker?: string;
  align?: "left" | "center";
}

export function SectionHeading({ 
  title, 
  kicker, 
  align = "left", 
  className, 
  ...props 
}: SectionHeadingProps) {
  return (
    <div 
      className={cn(
        "flex flex-col space-y-3 mb-10",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )} 
      {...props}
    >
      {kicker && (
        <span className="text-sm font-semibold tracking-wider text-clicom-cyan uppercase">
          {kicker}
        </span>
      )}
      <h2 className="text-4xl md:text-[40px] leading-tight font-heading font-semibold text-clicom-navy">
        {title}
      </h2>
    </div>
  )
}
