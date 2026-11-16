import { useEffect, useState } from 'react'
import { APP_ROUTES } from './config/constants'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { DashboardPage } from './pages/DashboardPage/DashboardPage'
import { NAVIGATION_EVENT } from './utils/navigation'

function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handleNavigation = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handleNavigation)
    window.addEventListener(NAVIGATION_EVENT, handleNavigation)

    return () => {
      window.removeEventListener('popstate', handleNavigation)
      window.removeEventListener(NAVIGATION_EVENT, handleNavigation)
    }
  }, [])

  useEffect(() => {
    document.title = pathname.startsWith(APP_ROUTES.dashboard)
      ? 'Inicio | Win Amateur'
      : 'Acceso | Win Amateur'
  }, [pathname])

  if (pathname.startsWith(APP_ROUTES.dashboard)) return <DashboardPage />

  return <AuthPage />
}

export default App
