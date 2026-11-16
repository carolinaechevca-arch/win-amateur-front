import './AppMark.css'

interface AppMarkProps {
  compact?: boolean
}

export function AppMark({ compact = false }: AppMarkProps) {
  return (
    <div className={`app-mark ${compact ? 'app-mark--compact' : ''}`} aria-label="Win Amateur">
      <svg viewBox="0 0 42 42" aria-hidden="true"><path d="M21 3 36 8.3v10.9c0 8.9-5.8 15.8-15 19.1C11.8 35 6 28.1 6 19.2V8.3L21 3Z" /><path d="m13.5 15.2 3.9 12.2 3.7-7.5 3.8 7.5 3.8-12.2" /></svg>
      {!compact && <span>WIN <strong>AMATEUR</strong></span>}
    </div>
  )
}
