import { Link } from 'react-router-dom'
import { useProgress } from '../store/progress'
import { LESSONS, LEVELS } from '../data/lessons'
import { useLang } from '../lib/i18n'
import { PageHeader } from '../components/ui'

export default function Lessons() {
  const { state } = useProgress()
  const { tr, lang } = useLang()
  return (
    <div>
      <PageHeader title="Leçons" ko="단계별 수업"
        subtitle="Du niveau A1 au C1. Chaque leçon : cours → erreurs fréquentes → glossaire → vérification → exercices."
        subtitleKo="A1부터 C1까지. 각 수업: 강의 → 자주 하는 실수 → 용어집 → 이해 확인 → 연습 문제." />
      <div className="space-y-6">
        {LEVELS.map((lv) => {
          const ls = LESSONS.filter((l) => l.level === lv.id)
          return (
            <section key={lv.id} id={lv.id}>
              <h2 className="flex items-baseline gap-2 mb-2 flex-wrap">
                <span className="h-display text-2xl font-extrabold">{lv.label}</span>
                <span lang={lang} className="font-bold">{tr(lv.name, lv.ko)}</span>
                <span lang={lang === 'ko' ? 'fr' : 'ko'} className={`${lang === 'ko' ? '' : 'ko '}text-sm text-muted`}>{lang === 'ko' ? lv.name : lv.ko}</span>
                {lv.id === state.targetLevel && <span className="chip text-xs" style={{ background: 'var(--accent)', color: '#fff' }}>{tr('Mon niveau', '내 단계')}</span>}
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {ls.map((l) => {
                  const p = state.lessons[l.id]
                  return (
                    <Link key={l.id} to={`/lecons/${l.id}`} className="card flex gap-3 items-start hover:opacity-95">
                      <span className="text-3xl" aria-hidden>{p?.checkPassed ? '✅' : l.id === 'a1-prononciation' ? '👄' : '📘'}</span>
                      <span className="flex-1">
                        <span lang={lang} className={`${lang === 'ko' ? 'ko ' : ''}block font-bold leading-snug`}>{tr(l.title, l.titleKo)}</span>
                        <span lang={lang === 'ko' ? 'fr' : 'ko'} className={`${lang === 'ko' ? '' : 'ko '}block text-sm text-muted`}>{lang === 'ko' ? l.title : l.titleKo}</span>
                        <span className="block text-xs text-muted mt-1">≈ {l.minutes} min · {p?.checkPassed ? tr(`validée (${p.bestCheck} %)`, `완료 (${p.bestCheck}%)`) : tr('à faire', '진행 전')}</span>
                      </span>
                    </Link>
                  )
                })}
                {ls.length === 0 && <p className="text-muted">{tr('Bientôt.', '곧 추가됩니다.')}</p>}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
