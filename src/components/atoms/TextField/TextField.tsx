import { useId, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Icon } from '../Icon/Icon'
import './TextField.css'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function TextField({ label, id, error, type, tabIndex, ...props }: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const isPassword = type === 'password'
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const passwordActionLabel = isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'

  return (
    <div className={`text-field ${error ? 'text-field--error' : ''}`}>
      <label htmlFor={inputId}>{label}</label>
      <div className="text-field__control">
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={isPassword ? 'text-field__input--with-action' : undefined}
          type={isPassword && isPasswordVisible ? 'text' : type}
          tabIndex={tabIndex}
          {...props}
        />
        {isPassword && (
          <button
            aria-label={passwordActionLabel}
            className="text-field__password-toggle"
            disabled={props.disabled}
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
            tabIndex={tabIndex}
            title={passwordActionLabel}
            type="button"
          >
            <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={19} />
          </button>
        )}
      </div>
      {error && <span className="text-field__error" id={`${inputId}-error`}>{error}</span>}
    </div>
  )
}
