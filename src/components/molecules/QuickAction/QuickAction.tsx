import { Icon } from '../../atoms/Icon/Icon'
import type { IconName } from '../../atoms/Icon/Icon'
import './QuickAction.css'

interface QuickActionProps { icon: IconName; title: string; description: string; href: string }

export function QuickAction({ icon, title, description, href }: QuickActionProps) {
  return <a className="quick-action" href={href}><span><Icon name={icon} size={21} /></span><div><strong>{title}</strong><small>{description}</small></div><Icon name="arrow-right" size={17} /></a>
}
