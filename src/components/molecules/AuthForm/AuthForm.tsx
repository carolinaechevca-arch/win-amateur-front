import { useState } from 'react'
import type { FormEvent } from 'react'
import { APP_ROUTES, DOCUMENT_TYPES, FORM_CONSTRAINTS, MAX_BIRTH_DATE, VALIDATION_PATTERNS } from '../../../config/constants'
import { registerAccount } from '../../../services/accountService'
import { AuthenticationError, login } from '../../../services/authService'
import { getOrCreateDeviceId, getTemporarySession, saveAuthenticatedSession, saveTemporarySession } from '../../../services/sessionService'
import type { AccountRegistrationRequest } from '../../../types/account'
import { navigateTo } from '../../../utils/navigation'
import { Button } from '../../atoms/Button/Button'
import { SelectField } from '../../atoms/SelectField/SelectField'
import { TextField } from '../../atoms/TextField/TextField'
import { InlineAlert } from '../InlineAlert/InlineAlert'
import './AuthForm.css'

interface AuthFormProps {
  mode: 'sign-in' | 'sign-up'
  isActive: boolean
}

function optionalValue(formData: FormData, name: string) {
  const value = String(formData.get(name) ?? '').trim()
  return value || null
}

function profileFromEmail(email: string) {
  const username = email.split('@')[0]
  const firstSegment = username.split(/[._-]/)[0]
  const firstName = firstSegment ? `${firstSegment.charAt(0).toUpperCase()}${firstSegment.slice(1)}` : 'Jugador'
  return { firstName, username }
}

function loginErrorMessage(error: unknown) {
  if (error instanceof AuthenticationError) {
    const messages: Record<string, string> = {
      ACCOUNT_DISABLED: 'Tu cuenta no está habilitada para iniciar sesión.',
      ACCOUNT_LOCKED: 'Tu cuenta está bloqueada temporalmente. Intenta nuevamente más tarde.',
      INVALID_CREDENTIALS: 'El correo electrónico o la contraseña no coinciden.',
      VALIDATION_ERROR: 'Revisa el correo electrónico y la contraseña ingresados.',
    }

    return messages[error.code] ?? 'No fue posible iniciar sesión. Intenta nuevamente.'
  }

  return 'No pudimos conectar con el servicio. Verifica que el backend esté activo.'
}

type ValidatableField = HTMLInputElement | HTMLSelectElement
type FieldErrors = Record<string, string>

function fieldValidationMessage(field: ValidatableField) {
  if (field.validity.valid) return null
  if (field.validity.valueMissing) return 'Este campo es obligatorio.'
  if (field.validity.typeMismatch) return 'Ingresa un correo electrónico válido.'
  if (field.validity.tooShort && field instanceof HTMLInputElement) return `Usa al menos ${field.minLength} caracteres.`
  if (field.validity.rangeOverflow) return 'Selecciona una fecha válida.'
  if (field.validity.patternMismatch && field.name === 'documentCountry') return 'Usa un código de país de dos letras.'
  if (field.validity.patternMismatch && field.name === 'password') return 'Incluye mayúscula, minúscula, número y carácter especial.'
  return 'Revisa este campo.'
}

function validateForm(form: HTMLFormElement) {
  return Array.from(form.elements).reduce<FieldErrors>((errors, element) => {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement) || !element.name) return errors

    const message = fieldValidationMessage(element)
    if (message) errors[element.name] = message
    return errors
  }, {})
}

export function AuthForm({ mode, isActive }: AuthFormProps) {
  const isSignUp = mode === 'sign-up'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const handleInput = (event: FormEvent<HTMLFormElement>) => {
    const field = event.target
    if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement) || !field.name) return

    setSubmitError(null)
    setFieldErrors((currentErrors) => {
      if (!currentErrors[field.name]) return currentErrors

      const nextErrors = { ...currentErrors }
      const message = fieldValidationMessage(field)
      if (message) nextErrors[field.name] = message
      else delete nextErrors[field.name]
      return nextErrors
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const validationErrors = validateForm(form)

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      setSubmitError(null)
      form.querySelector<ValidatableField>(`[name="${Object.keys(validationErrors)[0]}"]`)?.focus()
      return
    }

    setFieldErrors({})
    const formData = new FormData(form)

    if (!isSignUp) {
      setIsSubmitting(true)
      setSubmitError(null)

      try {
        const email = String(formData.get('email') ?? '').trim().toLowerCase()
        const response = await login({
          email,
          password: String(formData.get('password') ?? ''),
          deviceId: getOrCreateDeviceId(),
        })
        const previousSession = getTemporarySession()
        const derivedProfile = profileFromEmail(response.email)
        const profile = previousSession?.email.toLowerCase() === response.email.toLowerCase()
          ? previousSession
          : { ...derivedProfile, email: response.email }

        saveAuthenticatedSession(response)
        saveTemporarySession(profile)
        console.info('Sesión iniciada correctamente.', {
          email: response.email,
          sessionId: response.sessionId,
          status: response.status,
        })
        form.reset()
        navigateTo(APP_ROUTES.dashboard)
      } catch (error) {
        setSubmitError(loginErrorMessage(error))
        console.error('No fue posible iniciar sesión.', error)
      } finally {
        setIsSubmitting(false)
      }

      return
    }

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
      saveTemporarySession({
        firstName: payload.firstName,
        email: response.email,
        username: payload.username,
      })
      form.reset()
      navigateTo(APP_ROUTES.dashboard)
    } catch (error) {
      console.error('No fue posible crear la cuenta.', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={`auth-form auth-form--${mode} ${isActive ? 'auth-form--active' : ''}`} aria-hidden={!isActive}>
      <form noValidate onInput={handleInput} onSubmit={handleSubmit}>
        <span className="auth-form__eyebrow">Win Amateur</span>
        <h1>{isSignUp ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}</h1>
        <p>{isSignUp ? 'Completa tus datos para empezar a vivir tus torneos.' : 'Ingresa para continuar donde dejaste tu torneo.'}</p>

        <div className={`auth-form__fields ${isSignUp ? 'auth-form__fields--registration' : ''}`}>
          {isSignUp && (
            <>
              <TextField label="Primer nombre" name="firstName" type="text" autoComplete="given-name" error={fieldErrors.firstName} maxLength={FORM_CONSTRAINTS.personNameMaxLength} required tabIndex={isActive ? 0 : -1} />
              <TextField label="Segundo nombre (opcional)" name="middleName" type="text" autoComplete="additional-name" maxLength={FORM_CONSTRAINTS.personNameMaxLength} tabIndex={isActive ? 0 : -1} />
              <TextField label="Primer apellido" name="firstSurname" type="text" autoComplete="family-name" error={fieldErrors.firstSurname} maxLength={FORM_CONSTRAINTS.personNameMaxLength} required tabIndex={isActive ? 0 : -1} />
              <TextField label="Segundo apellido (opcional)" name="secondSurname" type="text" maxLength={FORM_CONSTRAINTS.personNameMaxLength} tabIndex={isActive ? 0 : -1} />
              <TextField label="País del documento" name="documentCountry" type="text" defaultValue="CO" error={fieldErrors.documentCountry} minLength={FORM_CONSTRAINTS.countryCodeLength} maxLength={FORM_CONSTRAINTS.countryCodeLength} pattern={VALIDATION_PATTERNS.countryCode} title="Código de país de dos letras, por ejemplo CO" required tabIndex={isActive ? 0 : -1} />
              <SelectField label="Tipo de documento" name="documentType" options={DOCUMENT_TYPES} error={fieldErrors.documentType} required tabIndex={isActive ? 0 : -1} />
              <TextField label="Número de documento" name="documentNumber" type="text" error={fieldErrors.documentNumber} maxLength={FORM_CONSTRAINTS.documentNumberMaxLength} required tabIndex={isActive ? 0 : -1} />
              <TextField label="Fecha de nacimiento (opcional)" name="birthDate" type="date" error={fieldErrors.birthDate} max={MAX_BIRTH_DATE} tabIndex={isActive ? 0 : -1} />
            </>
          )}
          <TextField label="Correo electrónico" name="email" type="email" placeholder="tu@correo.com" autoComplete="email" error={fieldErrors.email} maxLength={FORM_CONSTRAINTS.emailMaxLength} required tabIndex={isActive ? 0 : -1} />
          {isSignUp && <TextField label="Nombre de usuario" name="username" type="text" autoComplete="username" error={fieldErrors.username} maxLength={FORM_CONSTRAINTS.usernameMaxLength} required tabIndex={isActive ? 0 : -1} />}
          <TextField label="Contraseña" name="password" type="password" placeholder="Mínimo 8 caracteres" autoComplete={isSignUp ? 'new-password' : 'current-password'} error={fieldErrors.password} minLength={FORM_CONSTRAINTS.passwordMinLength} maxLength={FORM_CONSTRAINTS.passwordMaxLength} pattern={isSignUp ? VALIDATION_PATTERNS.password : undefined} title={isSignUp ? 'Incluye mayúscula, minúscula, número y carácter especial' : undefined} required tabIndex={isActive ? 0 : -1} />
        </div>

        {isSignUp && <small className="auth-form__password-help">La contraseña debe incluir mayúscula, minúscula, número y carácter especial.</small>}
        {!isSignUp && <a className="auth-form__forgot" href="#recuperar" tabIndex={isActive ? 0 : -1}>¿Olvidaste tu contraseña?</a>}
        {!isSignUp && submitError && <InlineAlert message={submitError} onDismiss={() => setSubmitError(null)} />}
        <Button fullWidth type="submit" disabled={isSubmitting} tabIndex={isActive ? 0 : -1}>
          {isSubmitting ? (isSignUp ? 'Creando cuenta…' : 'Iniciando sesión…') : isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
        </Button>
      </form>
    </section>
  )
}
