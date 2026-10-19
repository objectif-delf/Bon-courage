// TESTS DE COMPÉTENCES : un niveau + une compétence → série de questions notée.
import { useMemo, useState } from 'react'
import { useProgress } from '../store/progress'
import { LESSONS, LEVELS } from '../data/lessons'
import { QUESTION_BANK, SKILLS } from '../data/questions'
import { pick } from '../lib/text'
import { useLang } from '../lib/i18n'
import { PageHeader } from '../components/ui'
import { QuizRunner } from '../components/Question'

function poolFor(level, skill) {
  const bank = QUESTION_BANK.filter((q) => q.level === level && q.skill === skill)
  if (skill !== 'grammaire') return bank
  // On ajoute les exercices des leçons du même niveau aux tests de grammaire.
  const fromLessons = LESSONS.filter((l) => l.level === level && l.id !== 'b2-essai').flatMap((l) => [...l.practice.moyen, ...l.practice.difficile])
  return [...bank, ...fromLessons]
}

export default function Tests() {
  const { state, update } = useProgress()
  const { tr, lang } = useLang()
  const [level, setLevel] = useState(state.targetLevel || 'A2')
  const [skill, setSkill] = useState(null)
  const [run, setRun] = useState(0)
  const questions = useMemo(() => (skill ? pick(poolFor(level, skill), 10) : []), [level, skill, run])

  const save = (score, total) => {
    update((s) => ({ ...s, tests: [{ level, skill, score, total, date: new Date().toLocaleDateString('fr-FR') }, ...s.tests].slice(0, 100) }))
  }
  const best = (lv, sk) => {
    const t = state.tests.filter((x) => x.level === lv && x.skill === sk)
    return t.length ? Math.max(...t.map((x) => Math.round((x.score / x.total) * 100))) : null
  }

  if (skill) {
    return (
      <div>
        <button className="text-sm underline text-muted" onClick={() => setSkill(null)}>← {tr('Choisir un autre test', '다른 테스트 고르기')}</button>
        <h1 className="h-display text-2xl font-extrabold mt-2 mb-3">{tr('Test', '테스트')} {level} · {tr(SKILLS.find((s) => s.id === skill).label, SKILLS.find((s) => s.id === skill).ko)}</h1>
        <QuizRunner key={run} questions={questions} source={`Test ${level} ${skill}`} xpPerGood={6} title={`test ${level}`} onFinish={save} onExit={() => setSkill(null)} />
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Tests de compétences" ko="실력 테스트" subtitle="10 questions tirées au hasard. Refaites un test pour obtenir de nouvelles questions." subtitleKo="무작위로 10문제가 나옵니다. 다시 하면 새로운 문제가 나옵니다." />
      <div className="flex gap-2 flex-wrap mb-4" role="tablist" aria-label={tr('Niveau', '단계')}>
        {LEVELS.map((l) => (
          <button key={l.id} role="tab" aria-selected={level === l.id} onClick={() => setLevel(l.id)} className="btn"
            style={level === l.id ? { background: 'var(--primary)', color: 'var(--primary-ink)', borderColor: 'var(--primary)' } : undefined}>{l.label}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {SKILLS.map((s) => {
          const n = poolFor(level, s.id).length
          const b = best(level, s.id)
          return (
            <button key={s.id} className="card text-left hover:opacity-90" disabled={!n} onClick={() => { setSkill(s.id); setRun((r) => r + 1) }}>
              <span className="text-3xl" aria-hidden>{s.icon}</span>
              <span className="block font-bold text-lg">{tr(s.label, s.ko)}</span>
              <span className="block text-sm text-muted">{lang === 'ko' ? s.label : s.ko}</span>
              <span className="block text-sm mt-1">{tr(`${n} questions disponibles`, `문제 ${n}개`)}{b !== null ? ` · ${tr('meilleur', '최고')} ${b} %` : ''}</span>
            </button>
          )
        })}
      </div>
      {state.tests.length > 0 && (
        <section className="card mt-6">
          <h2 className="font-bold mb-2">{tr('Historique', '기록')}</h2>
          <ul className="text-sm divide-y" style={{ borderColor: 'var(--line)' }}>
            {state.tests.slice(0, 8).map((t, i) => (
              <li key={i} className="py-1.5 flex justify-between"><span>{t.date} · {t.level} · {t.skill}</span><strong>{t.score}/{t.total}</strong></li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
