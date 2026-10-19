// Petits composants d'interface réutilisés partout.
import { useEffect, useRef, useState } from 'react'
import { speak, canSpeak } from '../lib/speech'
import { useLang } from '../lib/i18n'

export function ProgressBar({ value, max = 100, label, color = 'var(--primary)', height = 10 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="w-full" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="w-full rounded-full overflow-hidden" style={{ background: 'var(--surface-2)', height }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

export function SpeakButton({ text, lang = 'fr-FR', label, small }) {
  if (!canSpeak() || !text) return null
  return (
    <button
      type="button"
      className={`btn btn-ghost ${small ? '!min-h-0 !px-1.5 !py-0.5 text-base' : ''}`}
      onClick={(e) => { e.stopPropagation(); speak(text, lang) }}
      aria-label={label || `Écouter : ${text}`}
      title="Écouter"
    >
      🔊
    </button>
  )
}

/** Rend **gras** et les retours à la ligne d'un texte de leçon. */
export function RichText({ text, className = '' }) {
  return (
    <div className={className}>
      {text.split('\n').map((line, i) => (
        <p key={i} className="mb-2 last:mb-0">
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith('**') ? <strong key={j} style={{ color: 'var(--primary)' }}>{part.slice(2, -2)}</strong> : part
          )}
        </p>
      ))}
    </div>
  )
}

export function KoNote({ children, show = true }) {
  if (!show || !children) return null
  return (
    <p lang="ko" className="ko text-[15px] mt-2 px-3 py-2 rounded-card" style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', borderLeft: '3px solid var(--accent)' }}>
      🇰🇷 {children}
    </p>
  )
}

export function PageHeader({ title, ko, subtitle, subtitleKo, children }) {
  const { lang } = useLang()
  const k = lang === 'ko' && ko
  return (
    <header className="mb-5">
      <h1 lang={k ? 'ko' : 'fr'} className={`${k ? 'ko ' : ''}h-display text-3xl md:text-4xl font-extrabold leading-tight`}>{k ? ko : title}</h1>
      {ko && <p lang={k ? 'fr' : 'ko'} className={`${k ? '' : 'ko '}text-muted text-sm mt-0.5`}>{k ? title : ko}</p>}
      {subtitle && <p lang={lang === 'ko' && subtitleKo ? 'ko' : 'fr'} className="text-muted mt-2 max-w-2xl">{lang === 'ko' && subtitleKo ? subtitleKo : subtitle}</p>}
      {children}
    </header>
  )
}

/** Compte à rebours. onEnd appelé une seule fois à zéro. */
export function useCountdown(seconds, running, onEnd) {
  const [left, setLeft] = useState(seconds)
  const ended = useRef(false)
  useEffect(() => { setLeft(seconds); ended.current = false }, [seconds])
  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setLeft((x) => Math.max(0, x - 1)), 1000)
    return () => clearInterval(t)
  }, [running])
  useEffect(() => {
    if (left === 0 && running && !ended.current) { ended.current = true; onEnd?.() }
  }, [left, running, onEnd])
  return [left, setLeft]
}

export const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export function TimerPill({ left, total }) {
  const low = left <= Math.max(60, total * 0.1)
  return (
    <span className="chip text-base tabular-nums" style={low ? { background: 'var(--bad)', color: '#fff' } : undefined} aria-live="polite">
      ⏱ {fmtTime(left)}
    </span>
  )
}

export function Empty({ icon = '🌱', children }) {
  return (
    <div className="card text-center py-10 text-muted">
      <div className="text-4xl mb-2">{icon}</div>
      {children}
    </div>
  )
}
