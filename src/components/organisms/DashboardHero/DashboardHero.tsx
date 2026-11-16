import { Badge } from '../../atoms/Badge/Badge'
import { Icon } from '../../atoms/Icon/Icon'
import './DashboardHero.css'

interface DashboardHeroProps { firstName: string }

export function DashboardHero({ firstName }: DashboardHeroProps) {
  return <section className="dashboard-hero"><div className="dashboard-hero__copy"><Badge>Primeros pasos</Badge><h1>Hola, {firstName}.<br />Tu cancha digital está lista.</h1><p>Crea tu primera competencia o explora torneos para seguir partidos, resultados y estadísticas.</p><div className="dashboard-hero__actions"><button type="button"><Icon name="plus" size={18} /> Crear mi primer torneo</button><a href="#explorar"><Icon name="compass" size={18} /> Explorar torneos</a></div></div><div className="dashboard-hero__visual" aria-hidden="true"><div className="dashboard-hero__arena"><div className="dashboard-hero__orbit dashboard-hero__orbit--outer" /><div className="dashboard-hero__orbit dashboard-hero__orbit--inner" /><span className="dashboard-hero__spark dashboard-hero__spark--one" /><span className="dashboard-hero__spark dashboard-hero__spark--two" /><span className="dashboard-hero__spark dashboard-hero__spark--three" /><div className="dashboard-hero__emblem"><span><Icon name="trophy" size={42} /></span></div><div className="dashboard-hero__token dashboard-hero__token--ball"><Icon name="ball" size={22} /></div><div className="dashboard-hero__token dashboard-hero__token--shield"><Icon name="shield" size={20} /></div><div className="dashboard-hero__token dashboard-hero__token--chart"><Icon name="chart" size={20} /></div></div></div></section>
}
