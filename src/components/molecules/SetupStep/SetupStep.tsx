import { Icon } from '../../atoms/Icon/Icon'
import './SetupStep.css'

interface SetupStepProps { number: number; title: string; description: string; completed?: boolean }

export function SetupStep({ number, title, description, completed = false }: SetupStepProps) {
  return <li className={`setup-step ${completed ? 'setup-step--completed' : ''}`}><span>{completed ? <Icon name="check" size={15} /> : number}</span><div><strong>{title}</strong><small>{description}</small></div></li>
}
