import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../store/progress'
import { LESSONS, LEVELS } from '../data/lessons'
import { BADGES } from '../data/badges'
import { useLang } from '../lib/i18n'
import { ProgressBar } from '../components/ui'

const selected = { background: 'var(--primary)', color: 'var(--primary-ink)', borderColor: 'var(--primary)' }

export function LevelPicker() {
  const { state, set } = useProgress()
  const { tr } = useLang()
  return (
    <div className="flex gap-2 flex-wrap" role="group" aria-label={tr('Mon niveau', '내 단계')}>
      {LEVELS.map((l) => (
        <button key={l.id} className="btn !min-h-0 !py-1.5" onClick={() => set('targetLevel', l.id)} style={state.targetLevel === l.id ? selected : undefined}>
          {l.label} <span className="text-xs opacity-75">{tr(l.name, l.ko)}</span>
        </button>
      ))}
    </div>
  )
}

export default function Home() {
  const { state, set } = useProgress()
  const { tr, lang, setLang } = useLang()
  const [name, setName] = useState('')
  const level = state.targetLevel || 'A2'
  const done = (id) => state.lessons[id]?.checkPassed
  const mine = LESSONS.filter((l) => l.level === level)
  const mineDone = mine.filter((l) => done(l.id)).length
  const next = mine.find((l) => !done(l.id)) || LESSONS.find((l) => !done(l.id))
  const today = new Date().toISOString().slice(0, 10)
  const dailyDone = state.daily === today
  const lastExam = state.exams.find((e) => e.full && (e.level || 'B2') === level)
  const levelInfo = LEVELS.find((l) => l.id === level)

  return (
    <div className="space-y-5">
      <section className="card relative overflow-hidden">
        <p lang="ko" className="ko text-muted text-sm">{tr('프랑스어 공부, 시작해 볼까요?', 'On commence le français ?')}</p>
        <h1 className={`${lang === 'ko' ? 'ko ' : ''}h-display text-3xl md:text-5xl font-extrabold leading-tight mt-1`}>
          {state.name ? tr(`Bonjour, ${state.name} !`, `${state.name}님, 안녕하세요!`) : tr('Bienvenue !', '환영합니다!')}
        </h1>
        {!state.name ? (
          <div className="space-y-3 mt-3">
            <div className="flex gap-2" role="group" aria-label="Langue · 언어">
              <button className="btn" onClick={() => setLang('ko')} style={lang === 'ko' ? selected : undefined}>🇰🇷 한국어로 보기</button>
              <button className="btn" onClick={() => setLang('fr')} style={lang === 'fr' ? selected : undefined}>🇫🇷 En français</button>
            </div>
            <div>
              <p className="text-sm font-bold mb-1">{tr('Mon niveau de français :', '내 프랑스어 단계:')}</p>
              <LevelPicker />
            </div>
            <form className="flex gap-2 max-w-md" onSubmit={(e) => { e.preventDefault(); if (name.trim()) set('name', name.trim()) }}>
              <input className="input" placeholder={tr('Votre prénom', '이름')} value={name} onChange={(e) => setName(e.target.value)} aria-label={tr('Votre prénom', '이름')} />
              <button className="btn btn-primary">OK</button>
            </form>
          </div>
        ) : (
          <p className="text-muted mt-2">{lang === 'ko'
            ? <>내 단계: <strong className="text-ink">{level}</strong> ({levelInfo?.ko}). 강의로 배우고, 연습하고, 게임으로 복습해요!</>
            : <>Mon niveau : <strong className="text-ink">{level}</strong> ({levelInfo?.name}). On apprend avec le cours, on s'entraîne, on révise en jouant !</>}</p>
        )}
        <div aria-hidden className="absolute -right-6 -top-6 text-[120px] opacity-10 select-none">🇫🇷</div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {next && (
          <Link to={`/lecons/${next.id}`} className="card flex items-center gap-4 hover:opacity-95" style={selected}>
            <span className="text-4xl" aria-hidden>▶️</span>
            <span className="flex-1">
              <span className="text-sm opacity-80">{tr('Prochaine leçon', '다음 수업')} — {next.level}</span>
              <span lang={lang} className={`${lang === 'ko' ? 'ko ' : ''}block h-display text-xl font-bold`}>{tr(next.title, next.titleKo)}</span>
            </span>
          </Link>
        )}
        <Link to="/defi" className="card flex items-center gap-4 hover:opacity-95" style={dailyDone ? undefined : { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }}>
          <span className="text-4xl" aria-hidden>{dailyDone ? '✅' : '☀️'}</span>
          <span className="flex-1">
            <span className="text-sm opacity-80">{tr('5 questions · niveau', '5문제 · 단계')} {level}</span>
            <span className="block h-display text-xl font-bold">{dailyDone ? tr('Défi du jour réussi !', '오늘의 도전 완료!') : tr('Défi du jour', '오늘의 도전')}</span>
          </span>
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">🎯 {tr(`Mon niveau : ${level}`, `내 단계: ${level}`)}</h2>
            <Link to="/profil" className="text-sm underline" style={{ color: 'var(--primary)' }}>{tr('Changer', '변경')}</Link>
          </div>
          <p className="text-sm text-muted mt-1">{tr(`Leçons ${level} validées`, `완료한 ${level} 수업`)}</p>
          <div className="flex items-center gap-3 mt-1">
            <ProgressBar value={mineDone} max={mine.length || 1} label={tr('Leçons validées', '완료한 수업')} />
            <span className="font-bold tabular-nums">{mineDone}/{mine.length}</span>
          </div>
          <p className="text-sm text-muted mt-3">{tr(`Dernier examen blanc ${level}`, `최근 ${level} 모의고사`)}</p>
          {lastExam ? (
            <p className="font-bold text-2xl">{lastExam.total}/100 <span className="text-base" style={{ color: lastExam.passed ? 'var(--good)' : 'var(--bad)' }}>{lastExam.passed ? tr('réussi', '합격선 통과') : tr('pas encore', '아직')}</span></p>
          ) : (
            <Link to="/examen" className="underline" style={{ color: 'var(--primary)' }}>{tr('Essayer un examen blanc →', '모의고사 풀어 보기 →')}</Link>
          )}
        </div>
        <div className="card">
          <h2 className="font-bold">📈 {tr('Mes statistiques', '나의 통계')}</h2>
          <dl className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div><dt className="text-xs text-muted">{tr('Réponses', '푼 문제')}</dt><dd className="h-display text-2xl font-bold">{state.stats.answered}</dd></div>
            <div><dt className="text-xs text-muted">{tr('Réussite', '정답률')}</dt><dd className="h-display text-2xl font-bold">{state.stats.answered ? Math.round((state.stats.correct / state.stats.answered) * 100) + '%' : '—'}</dd></div>
            <div><dt className="text-xs text-muted">{tr('À revoir', '복습할 문제')}</dt><dd className="h-display text-2xl font-bold">{state.mistakes.length}</dd></div>
          </dl>
          {state.mistakes.length > 0 && <Link to="/erreurs" className="btn w-full mt-3">🩹 {tr('Revoir mes erreurs', '오답 노트')}</Link>}
        </div>
      </section>

      <section>
        <h2 className="font-bold mb-2">{tr('Mon parcours', '나의 진도')}</h2>
        <div className="grid grid-cols-5 gap-2">
          {LEVELS.map((lv) => {
            const ls = LESSONS.filter((l) => l.level === lv.id)
            const d = ls.filter((l) => done(l.id)).length
            return (
              <Link key={lv.id} to={`/lecons#${lv.id}`} className="card !p-3 text-center" style={lv.id === level ? { outline: '3px solid var(--accent)', outlineOffset: '-3px' } : undefined}>
                <span className="h-display text-xl font-extrabold">{lv.label}</span>
                <span className="block text-xs text-muted">{d}/{ls.length}</span>
                <ProgressBar value={d} max={ls.length || 1} height={6} label={lv.label} />
              </Link>
            )
          })}
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          ['/jeux', '🃏', 'Mini-jeux', '미니 게임', 'Réviser en s\'amusant', '게임으로 복습'],
          ['/mon-espace', '🧑‍🏫', 'Mon Espace Cours', '내 수업 공간', 'Les cours du prof', '선생님 수업'],
          ['/dictionnaire', '🔎', 'Dictionnaire', '사전', 'Français ↔ coréen', '불한 · 한불'],
          ['/examen', '📝', 'Examens blancs', '모의고사', 'Tous niveaux', '모든 단계']
        ].map(([to, icon, label, ko, sub, subKo]) => (
          <Link key={to} to={to} className="card text-center hover:opacity-90">
            <span className="text-3xl" aria-hidden>{icon}</span>
            <span lang={lang} className="block font-bold mt-1">{tr(label, ko)}</span>
            <span lang={lang} className="block text-xs text-muted">{tr(sub, subKo)}</span>
          </Link>
        ))}
      </section>

      <section className="card">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">🏅 {tr('Badges', '배지')} ({state.badges.length}/{BADGES.length})</h2>
          <Link to="/profil" className="text-sm underline" style={{ color: 'var(--primary)' }}>{tr('Tout voir', '모두 보기')}</Link>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {BADGES.map((b) => (
            <span key={b.id} title={`${tr(b.label, b.ko)} — ${tr(b.desc, b.descKo)}`} className="text-3xl" style={{ filter: state.badges.includes(b.id) ? 'none' : 'grayscale(1) opacity(.3)' }}>{b.icon}</span>
          ))}
        </div>
      </section>
    </div>
  )
}
