import type { ReactNode } from 'react'

function Icon({ size = 16, children }: { size?: number; children: ReactNode }) {
  return (
    <svg
      className="icon"
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

export const ArrowRight = () => <Icon><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
export const ArrowDown = () => <Icon size={18}><path d="M12 5v14M6 13l6 6 6-6" /></Icon>
export const Download = () => <Icon><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></Icon>
export const Menu = () => <Icon><path d="M4 6h16M4 12h16M4 18h10" /></Icon>
export const Close = () => <Icon><path d="M6 6l12 12M18 6L6 18" /></Icon>

export const Sun = () => (
  <Icon size={18}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Icon>
)
export const Moon = () => <Icon size={18}><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" /></Icon>

export function ContactIcon({ kind }: { kind: 'mail' | 'phone' | 'linkedin' | 'github' | 'cv' }) {
  switch (kind) {
    case 'mail':
      return <Icon size={22}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Icon>
    case 'phone':
      return (
        <Icon size={22}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
        </Icon>
      )
    case 'linkedin':
      return <Icon size={22}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></Icon>
    case 'github':
      return (
        <Icon size={22}>
          <path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 2.8 5.6 3.1 5.6 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
        </Icon>
      )
    case 'cv':
      return <Icon size={22}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M12 12v6M9 15l3 3 3-3" /></Icon>
  }
}
