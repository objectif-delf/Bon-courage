/**
 * Cartes mémoire avec répétition espacée (boîtes de Leitner) :
 * « Je savais » → la carte monte d'une boîte et revient plus tard ;
 * « À revoir » → retour en boîte 1, elle revient vite.
 * Intervalles (jours) par boîte : 0, 1, 3, 7, 14.
 */
import { useMemo, useState } from 'react'
import { useProgress } from '../store/progress'
import { shuffle } from '../lib/text'
import { SpeakButton, ProgressBar } from './ui'
import { useLang } from '../lib/i18n'

const INTERVALS = [0, 1, 3, 7, 14]
const dayMs = 864e5

export function Flashcards({ cards, deckName = 'cartes', onExit }) {
  const { state, update, bumpStat, addXP } = useProgress()
  const { tr } = useLang()
  const [mode, setMode] = useState('fr') // fr→ko ou ko→fr
  const [flipped, setFlipped] = useState(false)
  const [i, setI] = useState(0)
  const [knew, setKnew] = useState(0)

  const deck = useMemo(() => {
    const now = Date.now()
    const due = cards.filter((c) => (state.flash[c.key]?.due || 0) <= now)
    const rest = cards.filter((c) => !due.includes(c))
    return [...shuffle(due), ...shuffle(rest)].slice(0, 20)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards])

  if (!deck.length) return <p className="text-muted">{tr('Aucune carte pour l\'instant.', '아직 카드가 없습니다.')}</p>
  if (i >= deck.length) {
    return (
      <div className="card text-center py-8 anim-pop">
        <div className="text-5xl">🃏</div>
        <p className="h-display text-2xl font-bold mt-2">{tr(`Série terminée : ${knew}/${deck.length} sues`, `완료: ${deck.length}장 중 ${knew}장 알았어요`)}</p>
        <div className="flex gap-2 justify-center mt-4">
          <button className="btn btn-primary" onClick={() => { setI(0); setKnew(0); setFlipped(false) }}>{tr('Encore', '한 번 더')}</button>
          {onExit && <button className="btn" onClick={onExit}>{tr('Terminer', '끝내기')}</button>}
        </div>
      </div>
    )
  }

  const c = deck[i]
  const front = mode === 'fr' ? c.front : c.back
  const back = mode === 'fr' ? c.back : c.front
  const box = state.flash[c.key]?.box || 0

  const rate = (ok) => {
    const nb = ok ? Math.min(box + 1, INTERVALS.length - 1) : 0
    update((s) => ({ ...s, flash: { ...s.flash, [c.key]: { box: nb, due: Date.now() + INTERVALS[nb] * dayMs } } }))
    bumpStat('flashReviewed')
    if (ok) { setKnew((k) => k + 1); if (box >= 2) addXP(2) }
    setFlipped(false)
    setI(i + 1)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm text-muted tabular-nums">{i + 1}/{deck.length}</span>
        <ProgressBar value={i} max={deck.length} label={`Progression ${deckName}`} />
        <button className="btn !min-h-0 !py-1 text-sm whitespace-nowrap" onClick={() => { setMode(mode === 'fr' ? 'ko' : 'fr'); setFlipped(false) }}>
          {mode === 'fr' ? 'FR → KO' : 'KO → FR'} ⇄
        </button>
      </div>
      <div className="flip" onClick={() => setFlipped(!flipped)} role="button" tabIndex={0} onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && setFlipped(!flipped)} aria-label="Retourner la carte">
        <div className={`flip-inner ${flipped ? 'flipped' : ''}`} style={{ minHeight: 220 }}>
          <div className="flip-face card h-full flex flex-col items-center justify-center text-center" style={{ minHeight: 220 }}>
            <span className="text-xs text-muted">{tr(`Boîte ${box + 1}/5 · touchez pour retourner`, `${box + 1}/5 단계 · 눌러서 뒤집기`)}</span>
            <p lang={mode === 'fr' ? 'fr' : 'ko'} className="ko h-display text-3xl font-bold mt-2">{front}</p>
            {mode === 'fr' && <SpeakButton text={front} small />}
          </div>
          <div className="flip-face flip-back card flex flex-col items-center justify-center text-center" style={{ background: 'var(--surface-2)' }}>
            <p lang={mode === 'fr' ? 'ko' : 'fr'} className="ko h-display text-3xl font-bold">{back}</p>
            {mode === 'ko' && <SpeakButton text={back} small />}
            {c.example && <p className="text-sm text-muted mt-2">« {c.example} »</p>}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button className="btn" disabled={!flipped} onClick={() => rate(false)} style={{ color: 'var(--bad)' }}>{tr('✘ À revoir', '✘ 다시 보기')}</button>
        <button className="btn btn-primary" disabled={!flipped} onClick={() => rate(true)}>{tr('✔ Je savais', '✔ 알았어요')}</button>
      </div>
    </div>
  )
}
