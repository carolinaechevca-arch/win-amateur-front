import { Icon } from '../../atoms/Icon/Icon'
import type { IconName } from '../../atoms/Icon/Icon'
import './StatCard.css'

interface StatCardProps { icon: IconName; value: string; label: string; detail: string; tone?: 'purple' | 'blue' | 'green' | 'orange' }

export function StatCard({ icon, value, label, detail, tone = 'purple' }: StatCardProps) {
  return <article className={`stat-card stat-card--${tone}`}><span className="stat-card__icon"><Icon name={icon} size={21} /></span><div><strong>{value}</strong><span>{label}</span><small>{detail}</small></div></article>
}
