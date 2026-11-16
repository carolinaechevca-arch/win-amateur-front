import { Icon } from '../../atoms/Icon/Icon'
import type { IconName } from '../../atoms/Icon/Icon'
import './FeatureTile.css'

interface FeatureTileProps { icon: IconName; title: string; description: string; accent: string }

export function FeatureTile({ icon, title, description, accent }: FeatureTileProps) {
  return <article className="feature-tile" style={{ '--feature-accent': accent } as React.CSSProperties}><span><Icon name={icon} size={20} /></span><h3>{title}</h3><p>{description}</p></article>
}
