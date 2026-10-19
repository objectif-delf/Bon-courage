// REVOIR MES ERREURS : chaque question ratée est gardée ici jusqu'à ce qu'elle soit réussie.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../store/progress'
import { useLang } from '../lib/i18n'
import { Empty, PageHeader } from '../components/ui'
import { QuizRunner } from '../components/Question'

export default function Mistakes() {
  const { state, update } = useProgress()
  const { tr } = useLang()
  const [running, setRunning] = useState(null)
  const list = state.mistakes

  if (running) {
    return (
      <div>
        <button className="text-sm underline text-muted" onClick={() => setRunning(null)}>← {tr('Retour', '돌아가기')}</button>
        <h1 className="h-display text-2xl font-extrabold mt-2 mb-3">{tr('Je corrige mes erreurs', '틀린 문제 다시 풀기')}</h1>
        <QuizRunner questions={running} source="Revoir mes erreurs" xpPerGood={8} title="erreurs corrigées" onExit={() => setRunning(null)} />
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Revoir mes erreurs" ko="오답 노트" subtitle="Une question réussie ici disparaît de la liste." subtitleKo="여기서 맞힌 문제는 목록에서 사라집니다." />
      {list.length === 0 ? (
        <Empty icon="🌟">{tr('Aucune erreur à revoir. Continuez avec les', '복습할 문제가 없습니다. 계속해서')} <Link className="underline" to="/lecons">{tr('leçons', '수업')}</Link>{tr(' !', '을 진행하세요!')}</Empty>
      ) : (
        <>
          <div className="flex gap-2 flex-wrap">
            <button className="btn btn-primary" onClick={() => setRunning(list.slice(0, 10).map((m) => m.q))}>▶ {tr(`Revoir ${Math.min(10, list.length)} erreurs`, `틀린 문제 ${Math.min(10, list.length)}개 다시 풀기`)}</button>
            <button className="btn" onClick={() => confirm(tr('Vider toute la liste ?', '목록을 모두 지울까요?')) && update((s) => ({ ...s, mistakes: [] }))}>{tr('Vider la liste', '목록 비우기')}</button>
          </div>
          <ul className="mt-4 space-y-2">
            {list.map((m) => (
              <li key={m.key} className="card !py-3">
                <p className="text-xs text-muted">{m.date} · {m.source}</p>
                <p className="font-bold">{m.q.prompt} {m.q.sentence && <span className="font-normal">— {m.q.sentence}</span>}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
