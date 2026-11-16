import type { TemporarySession } from '../../../types/session'
import { Icon } from '../../atoms/Icon/Icon'
import './AppHeader.css'

interface AppHeaderProps { session: TemporarySession }

export function AppHeader({ session }: AppHeaderProps) {
  const initial = session.firstName.charAt(0).toUpperCase()

  return <header className="app-header"><label className="app-header__search"><Icon name="search" size={17} /><span className="sr-only">Buscar</span><input type="search" placeholder="Buscar torneo por nombre o código" /></label><div className="app-header__profile" aria-label={`Perfil de ${session.firstName}`} title={`@${session.username}`}><span>{initial}</span></div></header>
}
