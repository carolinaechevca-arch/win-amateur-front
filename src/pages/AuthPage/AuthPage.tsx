import { AuthCard } from '../../components/organisms/AuthCard/AuthCard'
import './AuthPage.css'

export function AuthPage() {
  return (
    <main className="auth-page">
      <div className="auth-page__orb auth-page__orb--one" aria-hidden="true" />
      <div className="auth-page__orb auth-page__orb--two" aria-hidden="true" />
      <AuthCard />
      <p className="auth-page__legal">Al continuar aceptas los términos de uso y la política de privacidad.</p>
    </main>
  )
}
