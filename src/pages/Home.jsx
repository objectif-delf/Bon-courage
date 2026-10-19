import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../store/progress'
import { LESSONS, LEVELS } from '../data/lessons'
import { BADGES } from '../data/badges'
import { useLang } from '../lib/i18n'
import { ProgressBar } from '../components/ui'

export default function Home() {
  const { state, set } = useProgress()
  const { tr, lang, setLang } = useLang()
  const [name, setName] = useState('')
  const done = (id) => state.lessons[id]?.checkPassed
  const next = LESSONS.find((l) => !done(l.id))
  const b2 = LESSONS.filter((l) => l.level === 'B2')
  const b2Done = b2.filter((l) => done(l.id)).length
  const lastExam = state.exams.find((e) => e.full)
  const accuracy = state.stats.answered ? Math.round((state.stats.correct / state.stats.answered) * 100) : null

  return (
    <div className="space-y-5">
      <section className="card relative overflow-hidden">
        <p lang="ko" className="ko text-muted text-sm">{tr('프랑스어 공부, 시작해 볼까요?', 'On commence le français ?')}</p>
        <h1 className={`${lang === 'ko' ? 'ko ' : ''}h-display text-3xl md:text-5xl font-extrabold leading-tight mt-1`}>
          {state.name ? tr(`Bonjour, ${state.name} !`, `${state.name}님, 안녕하세요!`) : tr('Bienvenue !', '환영합니다!')}
        </h1>
        {!state.name ? (
          <>
            <div className="flex gap-2 mt-3" role="group" aria-label="Langue · 언어">
              <button className="btn" onClick={() => setLang('ko')} style={lang === 'ko' ? { background: 'var(--primary)', color: 'var(--primary-ink)', borderColor: 'var(--primary)' } : undefined}>🇰🇷 한국어로 보기</button>
              <button className="btn" onClick={() => setLang('fr')} style={lang === 'fr' ? { background: 'var(--primary)', color: 'var(--primary-ink)', borderColor: 'var(--primary)' } : undefined}>🇫🇷 En français</button>
            </div>
            <form className="mt-3 flex gap-2 max-w-md" onSubmit={(e) => { e.preventDefault(); if (name.trim()) set('name', name.trim()) }}>
              <input className="input" placeholder={tr('Votre prénom · 이름', '이름 · Prénom')} value={name} onChange={(e) => setName(e.target.value)} aria-label={tr('Votre prénom', '이름')} />
              <button className="btn btn-primary">OK</button>
            </form>
          </>
        ) : (
          <p className="text-muted mt-2">{lang === 'ko'
            ? <>목표: <strong className="text-ink">DELF B2</strong>. 모든 수업은 강의 → 이해 확인 → 연습 문제 순서로 진행됩니다.</>
            : <>Objectif : <strong className="text-ink">DELF B2</strong>. Chaque leçon commence par le cours, puis une vérification, puis des exercices.</>}</p>
        )}
        <div aria-hidden className="absolute -right-6 -top-6 text-[120px] opacity-10 select-none">🇫🇷</div>
      </section>

      {next && (
        <Link to={`/lecons/${next.id}`} className="card flex items-center gap-4 hover:opacity-95" style={{ background: 'var(--primary)', color: 'var(--primary-ink)', borderColor: 'var(--primary)' }}>
          <span className="text-4xl" aria-hidden>▶️</span>
          <span className="flex-1">
            <span className="text-sm opacity-80">{tr('Continuer', '이어서 하기')} — {next.level}</span>
            <span lang={lang} className={`${lang === 'ko' ? 'ko ' : ''}block h-display text-xl font-bold`}>{tr(next.title, next.titleKo)}</span>
          </span>
          <span className="text-2xl" aria-hidden>→</span>
        </Link>
      )}

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="font-bold flex items-center gap-2">🎯 {tr('Objectif DELF B2', 'DELF B2 목표')}</h2>
          <p className="text-sm text-muted mt-1">{tr('Leçons B2 validées', '완료한 B2 수업')}</p>
          <div className="flex items-center gap-3 mt-1">
            <ProgressBar value={b2Done} max={b2.length} label={tr('Leçons B2 validées', '완료한 B2 수업')} />
            <span className="font-bold tabular-nums">{b2Done}/{b2.length}</span>
          </div>
          <p className="text-sm text-muted mt-3">{tr('Dernier examen blanc', '최근 모의고사')}</p>
          {lastExam ? (
            <p className="font-bold text-2xl">{lastExam.total}/100 <span className="text-base" style={{ color: lastExam.passed ? 'var(--good)' : 'var(--bad)' }}>{lastExam.passed ? tr('réussi', '합격선 통과') : tr('pas encore', '아직')}</span></p>
          ) : (
            <Link to="/examen" className="underline" style={{ color: 'var(--primary)' }}>{tr('Passer un premier examen blanc →', '첫 모의고사 보기 →')}</Link>
          )}
        </div>
        <div className="card">
          <h2 className="font-bold">📈 {tr('Mes statistiques', '나의 통계')}</h2>
          <dl className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div><dt className="text-xs text-muted">{tr('Réponses', '푼 문제')}</dt><dd className="h-display text-2xl font-bold">{state.stats.answered}</dd></div>
            <div><dt className="text-xs text-muted">{tr('Réussite', '정답률')}</dt><dd className="h-display text-2xl font-bold">{accuracy === null ? '—' : accuracy + '%'}</dd></div>
            <div><dt className="text-xs text-muted">{tr('À revoir', '복습할 문제')}</dt><dd className="h-display text-2xl font-bold">{state.mistakes.length}</dd></div>
          </dl>
          {state.mistakes.length > 0 && <Link to="/erreurs" className="btn w-full mt-3">🩹 {tr('Revoir mes erreurs', '오답 노트')}</Link>}
        </div>
      </section>

      <section>
        <h2 className="font-bold mb-2">{tr('Progression par niveau', '단계별 진도')}</h2>
        <div className="grid grid-cols-5 gap-2">
          {LEVELS.map((lv) => {
            const ls = LESSONS.filter((l) => l.level === lv.id)
            const d = ls.filter((l) => done(l.id)).length
            return (
              <Link key={lv.id} to={`/lecons#${lv.id}`} className="card !p-3 text-center" style={lv.id === 'B2' ? { outline: '3px solid var(--accent)', outlineOffset: '-3px' } : undefined}>
                <span className="h-display text-xl font-extrabold">{lv.label}</span>
                <span className="block text-xs text-muted">{d}/{ls.length}</span>
                <ProgressBar value={d} max={ls.length || 1} height={6} label={`${lv.label}`} />
              </Link>
            )
          })}
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          ['/mon-espace', '🧑‍🏫', 'Mon Espace Cours', '내 수업 공간', 'Importer les cours du prof', '선생님 수업 가져오기'],
          ['/examen', '📝', 'Examen blanc B2', 'B2 모의고사', 'Les 4 épreuves, notées', '4개 영역, 채점'],
          ['/jeux', '🃏', 'Mini-jeux', '미니 게임', 'Réviser en s\'amusant', '게임으로 복습'],
          ['/dictionnaire', '🔎', 'Dictionnaire', '사전', 'Français ↔ coréen', '불한 · 한불']
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
