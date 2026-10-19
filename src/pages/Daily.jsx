// DÉFI DU JOUR : 5 questions du niveau choisi, les mêmes pour toute la journée,
// différentes chaque jour. Bonus de points la première fois qu'on le réussit.
import { useMemo } from 'react'
import { useProgress } from '../store/progress'
import { LESSONS } from '../data/lessons'
import { QUESTION_BANK } from '../data/questions'
import { useLang } from '../lib/i18n'
import { PageHeader } from '../components/ui'
import { QuizRunner } from '../components/Question'

// Tirage pseudo-aléatoire « stable » pour une date donnée.
function seeded(seed) {
  let x = seed % 2147483647 || 1
  return () => (x = (x * 16807) % 2147483647) / 2147483647
}

export default function Daily() {
  const { state, set, addXP } = useProgress()
  const { tr } = useLang()
  const level = state.targetLevel || 'A2'
  const today = new Date().toISOString().slice(0, 10)
  const questions = useMemo(() => {
    const pool = [
      ...LESSONS.filter((l) => l.level === level).flatMap((l) => [...l.practice.facile, ...l.practice.moyen, ...l.practice.difficile]),
      ...QUESTION_BANK.filter((q) => q.level === level)
    ]
    const rnd = seeded(Number(today.replace(/-/g, '')) + level.charCodeAt(0) * 7 + level.charCodeAt(1))
    const copy = [...pool]
    for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]] }
    return copy.slice(0, 5)
  }, [level, today])

  const done = state.daily === today
  return (
    <div>
      <PageHeader title="Défi du jour" ko="오늘의 도전"
        subtitle={`5 questions de niveau ${level}, nouvelles chaque jour. Réussissez-en au moins 4 pour valider le défi (+20 points).`}
        subtitleKo={`${level} 단계 5문제, 매일 바뀝니다. 4문제 이상 맞히면 도전 성공 (+20점).`} />
      {done && <p className="card mb-3" style={{ borderColor: 'var(--good)' }}>✅ {tr('Défi déjà réussi aujourd\'hui ! Vous pouvez le refaire pour vous entraîner.', '오늘의 도전을 이미 완료했어요! 연습으로 다시 풀 수 있어요.')}</p>}
      <QuizRunner questions={questions} source="Défi du jour" xpPerGood={4} title="défi du jour"
        onFinish={(s) => { if (s >= 4 && !done) { set('daily', today); addXP(20, 'défi du jour') } }} />
    </div>
  )
}
