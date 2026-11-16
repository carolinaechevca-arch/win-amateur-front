import { useEffect, useRef } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { APP_ROUTES } from '../../../config/constants'
import { clearTemporarySession } from '../../../services/sessionService'
import { navigateTo } from '../../../utils/navigation'
import { AppMark } from '../../atoms/AppMark/AppMark'
import { Icon } from '../../atoms/Icon/Icon'
import { NavItem } from '../../molecules/NavItem/NavItem'
import './AppSidebar.css'

const primaryNavigation = [
  { href: '#inicio', icon: 'dashboard' as const, label: 'Inicio', active: true },
  { href: '#torneos', icon: 'trophy' as const, label: 'Mis torneos' },
  { href: '#partidos', icon: 'calendar' as const, label: 'Partidos' },
  { href: '#equipos', icon: 'users' as const, label: 'Equipos' },
  { href: '#estadisticas', icon: 'chart' as const, label: 'Estadísticas' },
  { href: '#disciplina', icon: 'shield' as const, label: 'Disciplina' },
  { href: '#finanzas', icon: 'wallet' as const, label: 'Finanzas' },
]

interface AppSidebarProps {
  expanded: boolean
  onClose: () => void
  onOpen: () => void
}

export function AppSidebar({ expanded, onClose, onOpen }: AppSidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!expanded) return

    const handleOutsidePointer = (event: PointerEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) onClose()
    }

    document.addEventListener('pointerdown', handleOutsidePointer)
    return () => document.removeEventListener('pointerdown', handleOutsidePointer)
  }, [expanded, onClose])

  const handleExit = () => {
    clearTemporarySession()
    navigateTo(APP_ROUTES.auth)
  }

  const handleCollapsedClick = (event: MouseEvent<HTMLElement>) => {
    if (expanded || window.matchMedia('(max-width: 760px)').matches) return
    if ((event.target as HTMLElement).closest('a, button')) return
    onOpen()
  }

  const handleCollapsedKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (expanded || event.currentTarget !== event.target) return
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onOpen()
  }

  return (
    <aside
      ref={sidebarRef}
      className={`app-sidebar ${expanded ? 'app-sidebar--expanded' : 'app-sidebar--collapsed'}`}
      aria-label={expanded ? 'Menú principal abierto' : 'Abrir menú principal'}
      tabIndex={expanded ? -1 : 0}
      onClick={handleCollapsedClick}
      onKeyDown={handleCollapsedKeyDown}
    >
      <div className="app-sidebar__header">
        <div className="app-sidebar__brand"><AppMark /></div>
      </div>

      <nav aria-label="Navegación principal">
        {primaryNavigation.map((item) => <NavItem {...item} expanded={expanded} key={item.href} />)}
      </nav>

      <div className="app-sidebar__bottom">
        <NavItem href="#notificaciones" icon="bell" label="Notificaciones" notification expanded={expanded} />
        <button className="app-sidebar__logout" type="button" aria-label="Salir de la vista temporal" title={expanded ? undefined : 'Salir'} onClick={handleExit}>
          <Icon name="logout" size={20} /><span>Salir</span>
        </button>
      </div>
    </aside>
  )
}
