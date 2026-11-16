import type { FormEvent } from 'react'
import { Icon } from '../../components/atoms/Icon/Icon'
import { HomeActionCard } from '../../components/molecules/HomeActionCard/HomeActionCard'
import { TournamentCard } from '../../components/molecules/TournamentCard/TournamentCard'
import { DashboardLayout } from '../../components/templates/DashboardLayout/DashboardLayout'
import { getTemporarySession } from '../../services/sessionService'
import type { TemporarySession } from '../../types/session'
import './DashboardPage.css'

const fallbackSession: TemporarySession = { firstName: 'Jugador', email: '', username: 'usuario' }

const publicTournaments = [
  { name: 'Copa Barrio 2026', city: 'Medellín', teams: 12, code: 'COPA-BARRIO-A12BC34D56' },
  { name: 'Liga Dominical Norte', city: 'Bogotá', teams: 16, code: 'LIGA-NORTE-B84FD21A09' },
  { name: 'Torneo Relámpago', city: 'Cali', teams: 8, code: 'RELAMPAGO-C71DE48F20' },
]

export function DashboardPage() {
  const session = getTemporarySession() ?? fallbackSession

  const handleCodeSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const code = String(new FormData(event.currentTarget).get('tournamentCode') ?? '').trim()
    if (code) console.info('[Win Amateur] Búsqueda temporal de torneo:', code)
  }

  return (
    <DashboardLayout session={session}>
      <div className="dashboard-page" id="inicio">
        <header className="home-welcome">
          <span>Tu comunidad deportiva</span>
          <h1>Bienvenido, {session.firstName}</h1>
          <p>Aún no sigues ningún torneo. Elige cómo quieres comenzar.</p>
        </header>

        <section className="home-paths" aria-label="Formas de comenzar">
          <HomeActionCard icon="users" title="Sigue torneos" description="Busca competencias públicas, guárdalas como favoritas y recibe avisos sobre fechas, sedes y resultados." action="Explorar torneos" href="#torneos-publicos" />
          <HomeActionCard icon="trophy" title="Crea tu torneo" description="Serás el administrador: define reglas, equipos y calendario de tu competencia, de principio a fin." action="Crear mi torneo" href="#crear-torneo" featured />
        </section>

        <section className="tournament-lookup" aria-labelledby="tournament-code-title">
          <div className="tournament-lookup__title"><span><Icon name="search" size={21} /></span><div><h2 id="tournament-code-title">¿Tienes un código de torneo?</h2><p>Encuentra una competencia pública o privada mediante su código oficial.</p></div></div>
          <form onSubmit={handleCodeSearch}><label className="sr-only" htmlFor="tournament-code">Código del torneo</label><input id="tournament-code" name="tournamentCode" placeholder="Ej. COPA-BARRIO-A12BC34D56" autoComplete="off" /><button type="submit">Buscar<Icon name="arrow-right" size={16} /></button></form>
        </section>

        <section className="public-tournaments" id="torneos-publicos" aria-labelledby="public-tournaments-title">
          <header><div><span>Descubre y participa</span><h2 id="public-tournaments-title">Torneos públicos para explorar</h2></div><a href="#explorar">Ver todos<Icon name="arrow-right" size={16} /></a></header>
          <div className="public-tournaments__grid">{publicTournaments.map((tournament) => <TournamentCard {...tournament} key={tournament.code} />)}</div>
        </section>
      </div>
    </DashboardLayout>
  )
}
