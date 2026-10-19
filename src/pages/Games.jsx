// MINI-JEUX : cartes mémoire, textes à trous, quiz de rapidité.
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useProgress } from '../store/progress'
import { DICTIONARY } from '../data/dictionary'
import { LESSONS } from '../data/lessons'
import { pick, shuffle, norm } from '../lib/text'
import { useLang } from '../lib/i18n'
import { upTo } from '../lib/levels'
import { PageHeader, TimerPill, useCountdown } from '../components/ui'
import { Flashcards } from '../components/Flashcards'
import { QuizRunner } from '../components/Question'

const GAMES = [
  { id: 'cartes', icon: '🃏', label: 'Cartes mémoire', ko: '단어 카드', desc: 'Répétition espacée : les cartes difficiles reviennent plus souvent.', descKo: '간격 반복: 어려운 카드가 더 자주 나옵니다.' },
  { id: 'trous', icon: '🕳️', label: 'Textes à trous', ko: '빈칸 채우기', desc: 'Complétez des phrases authentiques avec le bon mot.', descKo: '실제 문장의 빈칸에 알맞은 단어를 넣으세요.' },
  { id: 'rapide', icon: '⚡', label: 'Quiz de rapidité', ko: '스피드 퀴즈', desc: '60 secondes pour trouver un maximum de traductions.', descKo: '60초 동안 최대한 많은 번역을 맞히세요.' }
]

export default function Games() {
  const [game, setGame] = useState(null)
  const { tr, lang } = useLang()
  const back = () => setGame(null)
  if (game === 'cartes') return <DeckPicker onBack={back} />
  if (game === 'trous') return <Cloze onBack={back} />
  if (game === 'rapide') return <Speed onBack={back} />
  return (
    <div>
      <PageHeader title="Mini-jeux" ko="미니 게임" subtitle="Pour réviser en s'amusant — chaque bonne réponse rapporte des points." subtitleKo="재미있게 복습하세요. 정답마다 점수를 받습니다." />
      <div className="grid gap-3 md:grid-cols-3">
        {GAMES.map((g) => (
          <button key={g.id} className="card text-left hover:opacity-90" onClick={() => setGame(g.id)}>
            <span className="text-4xl" aria-hidden>{g.icon}</span>
            <span className="block font-bold text-lg mt-1">{tr(g.label, g.ko)}</span>
            <span className="block text-sm text-muted">{lang === 'ko' ? g.label : g.ko}</span>
            <span className="block text-sm mt-1">{tr(g.desc, g.descKo)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function DeckPicker({ onBack }) {
  const { state } = useProgress()
  const { tr } = useLang()
  const [deck, setDeck] = useState(null)
  const level = state.targetLevel || 'A2'
  const decks = useMemo(() => {
    const glossary = LESSONS.filter((l) => upTo(l.level, level)).flatMap((l) => l.glossary.map((g) => ({ front: g.fr, back: g.ko, key: `glo:${g.fr}` })))
    const byLevel = (lv) => DICTIONARY.filter((e) => e.level === lv).map((e) => ({ front: e.fr, back: e.ko, example: e.ex.fr, key: `dic:${e.fr}` }))
    return [
      { id: 'glo', label: tr(`Glossaires des leçons (jusqu'au ${level})`, `수업 용어집 (${level}까지)`), cards: glossary },
      ...['A1', 'A2', 'B1', 'B2'].map((lv) => ({ id: lv, label: tr(`Vocabulaire ${lv}`, `${lv} 어휘`) + (lv === level ? ' ★' : ''), cards: byLevel(lv) }))
        .sort((a, b) => (b.id === level) - (a.id === level))
    ]
  }, [tr, level])
  if (deck) return <div><button className="text-sm underline text-muted mb-3" onClick={() => setDeck(null)}>← {tr('Paquets', '카드 묶음')}</button><Flashcards cards={deck.cards} deckName={deck.label} onExit={() => setDeck(null)} /></div>
  return (
    <div>
      <button className="text-sm underline text-muted" onClick={onBack}>← {tr('Mini-jeux', '미니 게임')}</button>
      <h1 className="h-display text-2xl font-extrabold mt-2 mb-3">{tr('Cartes mémoire', '단어 카드')}</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {decks.map((d) => {
          const due = d.cards.filter((c) => (state.flash[c.key]?.due || 0) <= Date.now()).length
          return (
            <button key={d.id} className="card text-left hover:opacity-90" onClick={() => setDeck(d)}>
              <span className="font-bold">{d.label}</span>
              <span className="block text-sm text-muted">{tr(`${d.cards.length} cartes · ${due} à revoir aujourd'hui`, `카드 ${d.cards.length}장 · 오늘 복습 ${due}장`)}</span>
            </button>
          )
        })}
      </div>
      <p className="text-sm text-muted mt-3">{tr('Les cartes des cours de votre professeur sont dans « Mon Espace Cours ».', '선생님 수업 카드는 « 내 수업 공간 »에 있습니다.')}</p>
    </div>
  )
}

/** Textes à trous construits à partir des exemples du dictionnaire. */
function buildCloze(level) {
  const out = []
  for (const e of DICTIONARY.filter((x) => upTo(x.level, level))) {
    const base = norm(e.fr).replace(/^(le |la |les |l'|l |un |une |se |s')/, '')
    const candidates = [base, ...(e.forms || []).map(norm)].filter((x) => x && x.length > 1)
    const words = e.ex.fr.split(/(\s+|[.,;:!?«»]|['’])/)
    const idx = words.findIndex((w) => candidates.includes(norm(w)))
    if (idx < 0 || base.includes(' ')) continue
    const answer = words[idx]
    const sentence = words.map((w, i) => (i === idx ? '_____' : w)).join('')
    out.push({ id: `trou:${e.fr}`, type: 'input', kind: e.level, prompt: `Complétez (indice : ${e.ko})`, promptKo: `빈칸을 채우세요 (힌트: ${e.ko})`, sentence, answer: [answer], explanation: `« ${e.ex.fr} » — ${e.ex.ko}` })
  }
  return out
}

function Cloze({ onBack }) {
  const [run, setRun] = useState(0)
  const { tr } = useLang()
  const { state } = useProgress()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const qs = useMemo(() => pick(buildCloze(state.targetLevel), 10), [run])
  return (
    <div>
      <button className="text-sm underline text-muted" onClick={onBack}>← {tr('Mini-jeux', '미니 게임')}</button>
      <h1 className="h-display text-2xl font-extrabold mt-2 mb-3">{tr('Textes à trous', '빈칸 채우기')}</h1>
      <QuizRunner key={run} questions={qs} source="Textes à trous" xpPerGood={5} title="textes à trous" onExit={onBack} onFinish={() => {}} />
      <button className="btn btn-ghost text-sm mt-2" onClick={() => setRun((r) => r + 1)}>↻ {tr('Nouvelle série', '새 문제')}</button>
    </div>
  )
}

const short = (ko) => ko.split(/[,;]/)[0].trim()

function Speed({ onBack }) {
  const { state, addXP, update } = useProgress()
  const { tr } = useLang()
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [q, setQ] = useState(null)
  const [flash, setFlash] = useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextQ = useCallback(() => {
    const [target, ...others] = pick(DICTIONARY.filter((x) => upTo(x.level, state.targetLevel)), 4)
    const toKo = Math.random() < 0.6
    const options = shuffle([target, ...others])
    setQ({ target, options, toKo })
  }, [])

  const end = useCallback(() => {
    setRunning(false)
    setFinished(true)
  }, [])
  const [left, setLeft] = useCountdown(60, running, end)

  const start = () => { setScore(0); setCombo(0); setFinished(false); setLeft(60); nextQ(); setRunning(true) }

  const answer = (opt) => {
    if (!running) return
    const ok = opt === q.target
    setFlash(ok ? 'good' : 'bad')
    setTimeout(() => setFlash(null), 250)
    if (ok) { setScore((s) => s + 1); setCombo((c) => c + 1) } else setCombo(0)
    nextQ()
  }

  // Enregistrement du résultat à la fin du chrono
  useEffect(() => {
    if (!finished) return
    if (score) addXP(score * 3, 'quiz de rapidité')
    update((s) => ({ ...s, stats: { ...s.stats, bestSpeed: Math.max(s.stats.bestSpeed || 0, score) } }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  return (
    <div>
      <button className="text-sm underline text-muted" onClick={onBack}>← {tr('Mini-jeux', '미니 게임')}</button>
      <h1 className="h-display text-2xl font-extrabold mt-2 mb-3">{tr('Quiz de rapidité', '스피드 퀴즈')} ⚡</h1>
      {!running ? (
        <div className="card text-center py-8">
          {finished ? (
            <>
              <p className="h-display text-4xl font-extrabold">{tr(`${score} bonnes réponses`, `${score}개 정답`)}</p>
              <p className="text-muted">{tr('Record', '최고 기록')} : {Math.max(state.stats.bestSpeed || 0, score)}</p>
            </>
          ) : (
            <p className="mb-2">{tr('60 secondes. Touchez la bonne traduction le plus vite possible.', '60초 동안 알맞은 번역을 최대한 빨리 누르세요!')}</p>
          )}
          <button className="btn btn-primary mt-4 text-lg" onClick={start}>{finished ? tr('Rejouer', '다시 하기') : tr('Commencer', '시작')}</button>
        </div>
      ) : q && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <TimerPill left={left} total={60} />
            <span className="chip">✔ {score}</span>
            {combo >= 3 && <span className="chip anim-pop" style={{ background: 'var(--accent)', color: '#fff' }}>{tr('Série', '연속')} ×{combo}</span>}
          </div>
          <div className={`card text-center py-8 ${flash === 'bad' ? 'anim-shake' : ''}`} style={flash ? { borderColor: flash === 'good' ? 'var(--good)' : 'var(--bad)' } : undefined}>
            <p className="text-sm text-muted">{q.toKo ? tr('Traduisez en coréen', '한국어로 번역하세요') : tr('Traduisez en français', '프랑스어로 번역하세요')}</p>
            <p lang={q.toKo ? 'fr' : 'ko'} className="ko h-display text-3xl font-bold mt-1">{q.toKo ? q.target.fr : short(q.target.ko)}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {q.options.map((o) => (
              <button key={o.fr} className="btn !min-h-[64px]" onClick={() => answer(o)} lang={q.toKo ? 'ko' : 'fr'}>{q.toKo ? short(o.ko) : o.fr}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
