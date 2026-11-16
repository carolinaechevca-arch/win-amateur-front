import { Badge } from '../../atoms/Badge/Badge'
import { Icon } from '../../atoms/Icon/Icon'
import './TournamentCard.css'

interface TournamentCardProps {
  city: string
  code: string
  name: string
  teams: number
}

export function TournamentCard({ city, code, name, teams }: TournamentCardProps) {
  return (
    <article className="tournament-card" id={`torneo-${code.toLowerCase()}`}>
      <header><span className="tournament-card__icon"><Icon name="ball" size={21} /></span><Badge>Fútbol</Badge></header>
      <div><h3>{name}</h3><p><Icon name="compass" size={14} />{city}<i />{teams} equipos</p><small>{code}</small></div>
      <a href={`#torneo-${code.toLowerCase()}`}>Ver torneo<Icon name="arrow-right" size={15} /></a>
    </article>
  )
}
