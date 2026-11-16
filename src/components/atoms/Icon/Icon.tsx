import type { ReactNode } from 'react'

export type IconName =
  | 'arrow-right'
  | 'ball'
  | 'bell'
  | 'calendar'
  | 'chart'
  | 'check'
  | 'clock'
  | 'compass'
  | 'dashboard'
  | 'eye'
  | 'eye-off'
  | 'logout'
  | 'plus'
  | 'search'
  | 'shield'
  | 'trophy'
  | 'user'
  | 'users'
  | 'wallet'
  | 'x'

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

const paths: Record<IconName, ReactNode> = {
  'arrow-right': <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  ball: <><circle cx="12" cy="12" r="9" /><path d="m9 8 3-2 3 2-1 4h-4L9 8Z" /><path d="m10 12-3 3 1 3M14 12l3 3-1 3M7 9 4 8M17 9l3-1" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15 9-2 4-4 2 2-4 4-2Z" /></>,
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
  eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
  'eye-off': <><path d="m3 3 18 18" /><path d="M10.6 6.15A10.5 10.5 0 0 1 12 6c6 0 9.5 6 9.5 6a15.5 15.5 0 0 1-2.05 2.75M6.35 6.35C3.9 8 2.5 12 2.5 12s3.5 6 9.5 6a9.8 9.8 0 0 0 3.15-.5" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  shield: <><path d="M12 3 5 6v5c0 4.7 2.8 8.3 7 10 4.2-1.7 7-5.3 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M9 18h6M12 13v5M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  users: <><path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 20v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  wallet: <><path d="M4 6h14a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12" /><path d="M15 11h6v4h-6a2 2 0 0 1 0-4Z" /></>,
  x: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
}

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
      {paths[name]}
    </svg>
  )
}
