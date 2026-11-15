import { useState } from 'react'
import type { FormEvent } from 'react'
import { DOCUMENT_TYPES, FORM_CONSTRAINTS, MAX_BIRTH_DATE, VALIDATION_PATTERNS } from '../../../config/constants'
import { registerAccount } from '../../../services/accountService'
import type { AccountRegistrationRequest } from '../../../types/account'
import { Button } from '../../atoms/Button/Button'
import { SelectField } from '../../atoms/SelectField/SelectField'
import { TextField } from '../../atoms/TextField/TextField'
import './AuthForm.css'

interface AuthFormProps {
  mode: 'sign-in' | 'sign-up'
  isActive: boolean
}

function optionalValue(formData: FormData, name: string) {
  const value = String(formData.get(name) ?? '').trim()
  return value || null
}

export function AuthForm({ mode, isActive }: AuthFormProps) {
  const isSignUp = mode === 'sign-up'
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isSignUp) {
      console.warn('El servicio de inicio de sesión aún no está disponible.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload: AccountRegistrationRequest = {
      firstName: String(formData.get('firstName') ?? '').trim(),
      middleName: optionalValue(formData, 'middleName'),
      firstSurname: String(formData.get('firstSurname') ?? '').trim(),
      secondSurname: optionalValue(formData, 'secondSurname'),
      documentCountry: String(formData.get('documentCountry') ?? '').trim().toUpperCase(),
      documentType: String(formData.get('documentType') ?? '').trim(),
      documentNumber: String(formData.get('documentNumber') ?? '').trim(),
      birthDate: optionalValue(formData, 'birthDate'),
      email: String(formData.get('email') ?? '').trim(),
      username: String(formData.get('username') ?? '').trim(),
      password: String(formData.get('password') ?? ''),
    }

    setIsSubmitting(true)

    try {
      const response = await registerAccount(payload)
      console.info('Cuenta creada correctamente.', response)
      form.reset()
    } catch (error) {
      console.error('No fue posible crear la cuenta.', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={`auth-form auth-form--${mode} ${isActive ? 'auth-form--active' : ''}`} aria-hidden={!isActive}>
      <form onSubmit={handleSubmit}>
        <span className="auth-form__eyebrow">Win Amateur</span>
        <h1>{isSignUp ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}</h1>
        <p>{isSignUp ? 'Completa tus datos para empezar a vivir tus torneos.' : 'Ingresa para continuar donde dejaste tu torneo.'}</p>

        <div className={`auth-form__fields ${isSignUp ? 'auth-form__fields--registration' : ''}`}>
          {isSignUp && (
            <>
              <TextField label="Primer nombre" name="firstName" type="text" autoComplete="given-name" maxLength={FORM_CONSTRAINTS.personNameMaxLength} required tabIndex={isActive ? 0 : -1} />
              <TextField label="Segundo nombre (opcional)" name="middleName" type="text" autoComplete="additional-name" maxLength={FORM_CONSTRAINTS.personNameMaxLength} tabIndex={isActive ? 0 : -1} />
              <TextField label="Primer apellido" name="firstSurname" type="text" autoComplete="family-name" maxLength={FORM_CONSTRAINTS.personNameMaxLength} required tabIndex={isActive ? 0 : -1} />
              <TextField label="Segundo apellido (opcional)" name="secondSurname" type="text" maxLength={FORM_CONSTRAINTS.personNameMaxLength} tabIndex={isActive ? 0 : -1} />
              <TextField label="País del documento" name="documentCountry" type="text" defaultValue="CO" minLength={FORM_CONSTRAINTS.countryCodeLength} maxLength={FORM_CONSTRAINTS.countryCodeLength} pattern={VALIDATION_PATTERNS.countryCode} title="Código de país de dos letras, por ejemplo CO" required tabIndex={isActive ? 0 : -1} />
              <SelectField label="Tipo de documento" name="documentType" options={DOCUMENT_TYPES} required tabIndex={isActive ? 0 : -1} />
              <TextField label="Número de documento" name="documentNumber" type="text" maxLength={FORM_CONSTRAINTS.documentNumberMaxLength} required tabIndex={isActive ? 0 : -1} />
              <TextField label="Fecha de nacimiento (opcional)" name="birthDate" type="date" max={MAX_BIRTH_DATE} tabIndex={isActive ? 0 : -1} />
            </>
          )}
          <TextField label="Correo electrónico" name="email" type="email" placeholder="tu@correo.com" autoComplete="email" maxLength={FORM_CONSTRAINTS.emailMaxLength} required tabIndex={isActive ? 0 : -1} />
          {isSignUp && <TextField label="Nombre de usuario" name="username" type="text" autoComplete="username" maxLength={FORM_CONSTRAINTS.usernameMaxLength} required tabIndex={isActive ? 0 : -1} />}
          <TextField label="Contraseña" name="password" type="password" placeholder="Mínimo 8 caracteres" autoComplete={isSignUp ? 'new-password' : 'current-password'} minLength={FORM_CONSTRAINTS.passwordMinLength} maxLength={FORM_CONSTRAINTS.passwordMaxLength} pattern={isSignUp ? VALIDATION_PATTERNS.password : undefined} title={isSignUp ? 'Incluye mayúscula, minúscula, número y carácter especial' : undefined} required tabIndex={isActive ? 0 : -1} />
        </div>

        {isSignUp && <small className="auth-form__password-help">La contraseña debe incluir mayúscula, minúscula, número y carácter especial.</small>}
        {!isSignUp && <a className="auth-form__forgot" href="#recuperar" tabIndex={isActive ? 0 : -1}>¿Olvidaste tu contraseña?</a>}
        <Button fullWidth type="submit" disabled={isSubmitting} tabIndex={isActive ? 0 : -1}>
          {isSubmitting ? 'Creando cuenta…' : isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
        </Button>
      </form>
    </section>
  )
}
