import type { ReactNode } from 'react'
import './Badge.css'

interface BadgeProps { children: ReactNode; tone?: 'primary' | 'success' | 'warning' | 'neutral' }

export function Badge({ children, tone = 'primary' }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}
