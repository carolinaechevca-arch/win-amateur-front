import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'solid' | 'outline'
  fullWidth?: boolean
}

export function Button({ children, variant = 'solid', fullWidth = false, className = '', ...props }: ButtonProps) {
  const classes = `button button--${variant} ${fullWidth ? 'button--full' : ''} ${className}`.trim()
  return <button className={classes} {...props}>{children}</button>
}
