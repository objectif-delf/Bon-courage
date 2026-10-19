// Structure générale : barre du haut (niveau, points, série), navigation
// en bas sur téléphone et sur le côté sur tablette/ordinateur.
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { levelFromXp, useProgress } from '../store/progress'
import { ProgressBar } from './ui'
import { useLang } from '../lib/i18n'

export const NAV = [
  { to: '/', label: 'Accueil', ko: '홈', icon: '🏠', mobile: true },
  { to: '/lecons', label: 'Leçons', ko: '수업', icon: '📚', mobile: true },
  { to: '/mon-espace', label: 'Mon Espace Cours', short: 'Mes cours', ko: '내 수업 공간', koShort: '내 수업', icon: '🧑‍🏫', mobile: true },
  { to: '/dictionnaire', label: 'Dictionnaire', short: 'Dico', ko: '사전', icon: '🔎', mobile: true },
  { to: '/entrainement', label: 'S\'entraîner', ko: '연습', icon: '🎯', mobile: true },
  { to: '/tests', label: 'Tests de compétences', ko: '실력 테스트', icon: '🧪' },
  { to: '/examen', label: 'Examens blancs', ko: '모의고사', icon: '📝' },
  { to: '/jeux', label: 'Mini-jeux', ko: '미니 게임', icon: '🃏' },
  { to: '/erreurs', label: 'Revoir mes erreurs', ko: '오답 노트', icon: '🩹' },
  { to: '/profil', label: 'Profil', ko: '프로필', icon: '⚙️' }
]

function Toasts() {
  const { toasts } = useProgress()
  const { tr } = useLang()
  return (
    <div className="fixed top-3 inset-x-0 z-[60] flex flex-col items-center gap-2 pointer-events-none" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="card !py-2 !px-4 anim-pop font-bold shadow-card" style={t.kind === 'badge' ? { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' } : undefined}>
          {t.kind === 'xp' && <>✨ +{t.n} {tr('pts', '점')}{t.reason ? tr(' · ' + t.reason, '') : ''}</>}
          {t.kind === 'badge' && <>{tr('Badge débloqué', '배지 획득')} : {t.badge.icon} {tr(t.badge.label, t.badge.ko)}</>}
          {t.text}
        </div>
      ))}
    </div>
  )
}

export default function Layout() {
  const { state } = useProgress()
  const { tr, lang, setLang } = useLang()
  const lv = levelFromXp(state.xp)
  // Clé = navigation : toucher l'onglet courant ramène à son écran d'accueil.
  const location = useLocation()
  return (
    <div className="min-h-screen md:flex">
      <Toasts />
      {/* Barre latérale (tablette / ordinateur) */}
      <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-screen sticky top-0 p-4 gap-1 overflow-y-auto" style={{ borderRight: 'var(--border-w) solid var(--line)', background: 'var(--surface)' }}>
        <Link to="/" className="flex items-center gap-2 mb-4">
          <img src="./icon.svg" alt="" className="w-10 h-10" />
          <span className="flex flex-col leading-tight"><span className="h-display text-2xl font-extrabold">Bon courage !</span><span lang="ko" className="ko text-sm font-bold" style={{ color: 'var(--accent)' }}>화이팅</span></span>
        </Link>
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-card font-bold ${isActive ? '' : 'opacity-80 hover:opacity-100'}`}
            style={({ isActive }) => (isActive ? { background: 'var(--primary)', color: 'var(--primary-ink)' } : undefined)}>
            <span aria-hidden>{n.icon}</span>
            <span className="flex flex-col leading-tight">{tr(n.label, n.ko)}<span lang={lang === 'ko' ? 'fr' : 'ko'} className="ko text-xs font-normal opacity-70">{lang === 'ko' ? n.label : n.ko}</span></span>
          </NavLink>
        ))}
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3 backdrop-blur" style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)', borderBottom: 'var(--border-w) solid var(--line)' }}>
          <Link to="/" className="md:hidden flex items-center gap-2">
            <img src="./icon.svg" alt="" className="w-8 h-8" />
            <span className="h-display text-xl font-extrabold whitespace-nowrap hidden min-[440px]:inline">Bon courage !</span>
          </Link>
          <button type="button" onClick={() => setLang(lang === 'ko' ? 'fr' : 'ko')} className="ml-auto chip !py-1 !px-2.5 font-bold" style={{ border: 'var(--border-w) solid var(--line)' }}
            aria-label={lang === 'ko' ? 'Afficher l\'interface en français' : '한국어로 보기'} title={lang === 'ko' ? 'Français' : '한국어'}>
            <span style={{ opacity: lang === 'fr' ? 1 : 0.45 }}>FR</span><span className="opacity-40">/</span><span lang="ko" className="ko" style={{ opacity: lang === 'ko' ? 1 : 0.45 }}>한</span>
          </button>
          <Link to="/profil" className="flex items-center gap-3" aria-label={`Niveau ${lv.level}, ${state.xp} points`}>
            <span className="chip" title={tr('Jours de travail consécutifs', '연속 학습일')}>🔥 {state.streak.count}</span>
            <span className="flex flex-col items-end w-24">
              <span className="text-xs font-bold whitespace-nowrap">{tr(`Niv. ${lv.level} · ${state.xp} pts`, `Lv.${lv.level} · ${state.xp}점`)}</span>
              <ProgressBar value={lv.pct} height={6} label="Progression vers le niveau suivant" />
            </span>
            <span className="text-2xl md:hidden" aria-hidden>⚙️</span>
          </Link>
        </header>

        <main className="px-4 py-5 md:px-8 md:py-8 max-w-4xl mx-auto safe-bottom md:pb-10">
          <Outlet key={location.key} />
        </main>
      </div>

      {/* Navigation du bas (téléphone) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-5" style={{ background: 'var(--surface)', borderTop: 'var(--border-w) solid var(--line)', paddingBottom: 'env(safe-area-inset-bottom)' }} aria-label="Navigation principale">
        {NAV.filter((n) => n.mobile).map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'}
            className="flex flex-col items-center justify-center py-2 text-[11px] font-bold"
            style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--muted)' })}>
            <span className="text-xl" aria-hidden>{n.icon}</span>
            {tr(n.short || n.label, n.koShort || n.ko)}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
