import { Icon } from '../../atoms/Icon/Icon'
import type { IconName } from '../../atoms/Icon/Icon'
import './NavItem.css'

interface NavItemProps {
  href: string
  icon: IconName
  label: string
  active?: boolean
  expanded?: boolean
  notification?: boolean
}

export function NavItem({ href, icon, label, active = false, expanded = false, notification = false }: NavItemProps) {
  const className = ['nav-item', active && 'nav-item--active', expanded && 'nav-item--expanded'].filter(Boolean).join(' ')

  return <a className={className} href={href} aria-label={label} title={expanded ? undefined : label} onClick={(event) => event.stopPropagation()}><Icon name={icon} size={20} /><span className="nav-item__label">{label}</span>{notification && <i className="nav-item__dot" />}</a>
}
