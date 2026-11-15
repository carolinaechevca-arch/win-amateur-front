import { useId } from 'react'
import type { SelectHTMLAttributes } from 'react'
import './SelectField.css'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: readonly SelectOption[]
  error?: string
}

export function SelectField({ label, options, id, error, ...props }: SelectFieldProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className={`select-field ${error ? 'select-field--error' : ''}`}>
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} aria-invalid={Boolean(error)} aria-describedby={error ? `${selectId}-error` : undefined} {...props}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      {error && <span className="select-field__error" id={`${selectId}-error`}>{error}</span>}
    </div>
  )
}
