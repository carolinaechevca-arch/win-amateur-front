import { useState } from 'react'
import { Brand } from '../../atoms/Brand/Brand'
import { Button } from '../../atoms/Button/Button'
import { AuthForm } from '../../molecules/AuthForm/AuthForm'
import './AuthCard.css'

export function AuthCard() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className={`auth-card ${isSignUp ? 'auth-card--sign-up' : ''}`}>
      <AuthForm mode="sign-in" isActive={!isSignUp} />
      <AuthForm mode="sign-up" isActive={isSignUp} />

      <aside className="auth-card__panel" aria-live="polite">
        <div className="auth-card__panel-content auth-card__panel-content--signup">
          <Brand inverse />
          <div>
            <span>¿Primera vez aquí?</span>
            <h2>Tu torneo comienza contigo.</h2>
            <p>Crea una cuenta y lleva equipos, partidos y resultados siempre al día.</p>
            <Button variant="outline" type="button" onClick={() => setIsSignUp(true)}>Crear cuenta</Button>
          </div>
        </div>

        <div className="auth-card__panel-content auth-card__panel-content--signin">
          <Brand inverse />
          <div>
            <span>¿Ya eres parte?</span>
            <h2>La cancha te estaba esperando.</h2>
            <p>Inicia sesión y vuelve a la acción de tu comunidad deportiva.</p>
            <Button variant="outline" type="button" onClick={() => setIsSignUp(false)}>Iniciar sesión</Button>
          </div>
        </div>
      </aside>
    </div>
  )
}
