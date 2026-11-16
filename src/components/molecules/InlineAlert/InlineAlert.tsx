import { Icon } from '../../atoms/Icon/Icon'
import './InlineAlert.css'

interface InlineAlertProps {
  message: string
  onDismiss?: () => void
}

export function InlineAlert({ message, onDismiss }: InlineAlertProps) {
  return (
    <div className="inline-alert inline-alert--error" role="alert">
      <span className="inline-alert__status" aria-hidden="true">
        <Icon name="x" size={14} />
      </span>
      <span className="inline-alert__message">{message}</span>
      {onDismiss && (
        <button className="inline-alert__dismiss" aria-label="Cerrar alerta" onClick={onDismiss} type="button">
          <Icon name="x" size={19} />
        </button>
      )}
    </div>
  )
}
