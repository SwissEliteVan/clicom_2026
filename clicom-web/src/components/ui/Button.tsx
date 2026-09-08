import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: 'primary' | 'outline' | 'cyan'; arrow?: boolean }

export function Button({ children, variant = 'primary', arrow = true, className = '', ...props }: ButtonProps) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}{arrow && <Icon name="arrow" size={17} />}</button>
}