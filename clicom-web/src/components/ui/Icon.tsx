import type { SVGProps } from 'react'

export type IconName = 'arrow' | 'check' | 'chevron' | 'globe' | 'menu' | 'search' | 'shield' | 'sparkles' | 'workflow' | 'x'

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number }

export function Icon({ name, size = 20, ...props }: IconProps) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...props }

  switch (name) {
    case 'arrow': return <svg {...common}><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
    case 'check': return <svg {...common}><path d="m5 12.5 4.2 4.2L19 7" /></svg>
    case 'chevron': return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>
    case 'globe': return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M3.8 9h16.4M3.8 15h16.4M12 3.5c2.1 2.3 3.2 5.1 3.2 8.5s-1.1 6.2-3.2 8.5c-2.1-2.3-3.2-5.1-3.2-8.5S9.9 5.8 12 3.5Z" /></svg>
    case 'menu': return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
    case 'search': return <svg {...common}><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
    case 'shield': return <svg {...common}><path d="M12 3.5 19 6v5.2c0 4.6-2.8 7.7-7 9.3-4.2-1.6-7-4.7-7-9.3V6l7-2.5Z" /><path d="m8.7 12 2.2 2.2 4.5-4.6" /></svg>
    case 'sparkles': return <svg {...common}><path d="m12 3 1.3 4.2L17.5 9l-4.2 1.3L12 14.5l-1.3-4.2L6.5 9l4.2-1.8L12 3Z" /><path d="m19 14 .6 2.1 1.9.9-1.9.7L19 20l-.7-2.3-1.8-.7 1.8-.9L19 14ZM5 14l.6 1.8 1.9.7-1.9.8L5 19l-.6-1.7-1.9-.8 1.9-.7L5 14Z" /></svg>
    case 'workflow': return <svg {...common}><rect x="3.5" y="4" width="6" height="5" rx="1" /><rect x="14.5" y="4" width="6" height="5" rx="1" /><rect x="9" y="15" width="6" height="5" rx="1" /><path d="M6.5 9v2.5h11V9M12 11.5V15" /></svg>
    case 'x': return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>
  }
}