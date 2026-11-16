import { Icon } from '../../atoms/Icon/Icon'
import type { IconName } from '../../atoms/Icon/Icon'
import './HomeActionCard.css'

interface HomeActionCardProps {
  action: string
  description: string
  featured?: boolean
  href: string
  icon: IconName
  title: string
}

export function HomeActionCard({ action, description, featured = false, href, icon, title }: HomeActionCardProps) {
  return (
    <article className={`home-action-card ${featured ? 'home-action-card--featured' : ''}`}>
      <div className="home-action-card__icon"><Icon name={icon} size={38} /></div>
      <div className="home-action-card__content"><h2>{title}</h2><p>{description}</p></div>
      <footer><a href={href}>{action}<Icon name="arrow-right" size={16} /></a></footer>
    </article>
  )
}
