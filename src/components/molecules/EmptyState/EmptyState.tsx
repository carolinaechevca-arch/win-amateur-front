import { Icon } from '../../atoms/Icon/Icon'
import type { IconName } from '../../atoms/Icon/Icon'
import './EmptyState.css'

interface EmptyStateProps { icon: IconName; title: string; description: string; action: string }

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return <div className="empty-state"><span><Icon name={icon} size={24} /></span><strong>{title}</strong><p>{description}</p><button type="button">{action} <Icon name="arrow-right" size={15} /></button></div>
}
