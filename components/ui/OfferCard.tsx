import * as React from "react"
import { Check } from "lucide-react"
import { Button } from "./Button"
import { cn } from "./Button"

interface OfferCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText?: string;
  isPopular?: boolean;
}

export function OfferCard({
  title,
  price,
  description,
  features,
  ctaText = "Demander un audit",
  isPopular,
  className,
  ...props
}: OfferCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border border-clicom-slate/20 bg-clicom-white p-8 transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-[0_8px_24px_rgba(14,42,71,0.08)]",
        isPopular && "border-clicom-blue shadow-sm",
        className
      )}
      {...props}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-clicom-blue px-4 py-1 text-xs font-semibold text-clicom-white">
          Le plus choisi
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-heading font-semibold text-clicom-navy">{title}</h3>
        <p className="mt-2 text-sm text-clicom-slate">{description}</p>
      </div>

      <div className="mb-6 flex items-baseline text-clicom-navy">
        <span className="text-3xl font-heading font-semibold">{price}</span>
        {price !== "Sur devis" && <span className="ml-1 text-sm font-medium text-clicom-slate"> CHF TTC</span>}
      </div>

      <ul className="mb-8 flex-1 space-y-4">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <Check className="mr-3 h-5 w-5 shrink-0 text-clicom-cyan" />
            <span className="text-sm text-clicom-ink">{feature}</span>
          </li>
        ))}
      </ul>

      <Button variant={isPopular ? "default" : "outline"} className="w-full">
        {ctaText}
      </Button>
    </div>
  )
}
