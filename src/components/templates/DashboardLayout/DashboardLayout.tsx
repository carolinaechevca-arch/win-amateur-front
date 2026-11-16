import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import type { TemporarySession } from '../../../types/session'
import { AppHeader } from '../../organisms/AppHeader/AppHeader'
import { AppSidebar } from '../../organisms/AppSidebar/AppSidebar'
import './DashboardLayout.css'

interface DashboardLayoutProps { children: ReactNode; session: TemporarySession }

export function DashboardLayout({ children, session }: DashboardLayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const closeSidebar = useCallback(() => setIsSidebarExpanded(false), [])
  const openSidebar = useCallback(() => setIsSidebarExpanded(true), [])

  return <div className={`dashboard-layout ${isSidebarExpanded ? 'dashboard-layout--sidebar-expanded' : ''}`}><AppSidebar expanded={isSidebarExpanded} onClose={closeSidebar} onOpen={openSidebar} /><div className="dashboard-layout__content"><AppHeader session={session} /><main>{children}</main></div></div>
}
