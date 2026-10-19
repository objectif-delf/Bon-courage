import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProgress } from '../store/progress'
import { lessonById } from '../data/lessons'
import { LESSONS_KO } from '../data/lessonsKo'
import { useLang } from '../lib/i18n'
import { KoNote, RichText, SpeakButton } from '../components/ui'
import { ClickableText } from '../components/WordLookup'
import { QuizRunner } from '../components/Question'

const STEPS = [
  { id: 'cours', label: 'Cours', ko: '강의' },
  { id: 'erreurs', label: 'Erreurs fréquentes', ko: '자주 하는 실수' },
  { id: 'glossaire', label: 'Glossaire', ko: '용어집' },
  { id: 'verif', label: 'Vérification', ko: '이해 확인' },
  { id: 'exos', label: 'Exercices', ko: '연습 문제' }
]
const DIFF = [
  { id: 'facile', label: 'Facile', ko: '쉬움' },
  { id: 'moyen', label: 'Moyen', ko: '보통' },
  { id: 'difficile', label: 'Difficile', ko: '어려움' }
]

/** Explication complète en coréen : ouverte en A1-A2 ou interface coréenne, repliable sinon. */
function KoExplanation({ text, open }) {
  const body = text.split('\n').map((l, i) => <p key={i} className="mb-1.5 last:mb-0">{l}</p>)
  const style = { background: 'color-mix(in srgb, var(--accent) 9%, transparent)', borderLeft: '3px solid var(--accent)' }
  if (open) {
    return (
      <div lang="ko" className="ko mt-3 px-3 py-2 rounded-card text-[15.5px] leading-relaxed" style={style}>
        <p className="text-xs font-bold mb-1" style={{ color: 'var(--accent)' }}>🇰🇷 한국어 설명</p>
        {body}
      </div>
    )
  }
  return (
    <details lang="ko" className="ko mt-3 px-3 py-2 rounded-card text-[15.5px] leading-relaxed" style={style}>
      <summary className="cursor-pointer text-sm font-bold" style={{ color: 'var(--accent)' }}>🇰🇷 한국어 설명 보기</summary>
      <div className="mt-2">{body}</div>
    </details>
  )
}

export default function Lesson() {
  const { id } = useParams()
  const lesson = lessonById(id)
  const ko = LESSONS_KO[id]
  const { state, setLesson, addXP } = useProgress()
  const { tr, lang } = useLang()
  const [step, setStep] = useState('cours')
  const [lvl, setLvl] = useState(null)
  const [checkRun, setCheckRun] = useState(0)
  if (!lesson) return <p>{tr('Leçon introuvable.', '수업을 찾을 수 없습니다.')} <Link to="/lecons" className="underline">{tr('Retour', '돌아가기')}</Link></p>
  const prog = state.lessons[lesson.id] || {}
  const idx = STEPS.findIndex((s) => s.id === step)
  const go = (s) => { setStep(s); setLvl(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const koOpen = lang === 'ko' || ['A1', 'A2'].includes(lesson.level)
  const showKo = state.showKo || lang === 'ko'
  const objectives = lang === 'ko' && ko?.objectives ? ko.objectives : lesson.objectives

  const onCheckDone = (score, total) => {
    const pct = Math.round((score / total) * 100)
    const passed = pct >= 75
    if (passed && !prog.checkPassed) addXP(30, 'leçon validée')
    setLesson(lesson.id, (cur) => ({ ...cur, checkPassed: cur.checkPassed || passed, bestCheck: Math.max(cur.bestCheck || 0, pct) }))
  }

  return (
    <div>
      <Link to="/lecons" className="text-sm underline text-muted">← {tr('Toutes les leçons', '전체 수업')}</Link>
      <header className="mt-2 mb-4">
        <span className="chip">{lesson.level}</span>
        {lang === 'ko' ? (
          <>
            <h1 lang="ko" className="ko h-display text-3xl md:text-4xl font-extrabold mt-2 leading-tight">{lesson.titleKo}</h1>
            <p className="text-muted">{lesson.title}</p>
          </>
        ) : (
          <>
            <h1 className="h-display text-3xl md:text-4xl font-extrabold mt-2 leading-tight">{lesson.title}</h1>
            <p lang="ko" className="ko text-muted">{lesson.titleKo}</p>
          </>
        )}
      </header>

      {/* Étapes */}
      <nav className="flex gap-1 overflow-x-auto pb-2 -mx-1 px-1" aria-label={tr('Étapes de la leçon', '수업 단계')}>
        {STEPS.map((s, i) => (
          <button key={s.id} onClick={() => go(s.id)} className="btn !min-h-0 !py-1.5 whitespace-nowrap text-sm"
            style={step === s.id ? { background: 'var(--primary)', color: 'var(--primary-ink)', borderColor: 'var(--primary)' } : undefined}>
            {i + 1}. {tr(s.label, s.ko)}{s.id === 'verif' && prog.checkPassed ? ' ✅' : ''}
          </button>
        ))}
      </nav>

      <div className="mt-4">
        {step === 'cours' && (
          <div className="space-y-4">
            <div className="card">
              <h2 className="font-bold">🎯 {tr('Objectifs', '학습 목표')}</h2>
              <ul className="list-disc pl-5 mt-1" lang={lang}>{objectives.map((o) => <li key={o}>{o}</li>)}</ul>
              <p className="text-sm text-muted mt-2">{tr('Astuce : touchez n\'importe quel mot d\'un exemple pour ouvrir le dictionnaire.', '팁: 예문의 단어를 누르면 사전이 열립니다.')}</p>
            </div>

            {ko?.contrast && (
              <div className="card" style={{ borderColor: 'var(--accent)', borderWidth: 'max(2px, var(--border-w))' }}>
                <h2 className="font-bold">🇰🇷↔🇫🇷 {tr('Différence avec le coréen', '한국어와 다른 점')}</h2>
                {lang === 'ko' ? (
                  <>
                    <p lang="ko" className="ko mt-1">{ko.contrast.ko}</p>
                    <p className="text-sm text-muted mt-2">{ko.contrast.fr}</p>
                  </>
                ) : (
                  <>
                    <p className="mt-1">{ko.contrast.fr}</p>
                    {showKo && <p lang="ko" className="ko text-sm text-muted mt-2">{ko.contrast.ko}</p>}
                  </>
                )}
              </div>
            )}

            {lesson.sections.map((s, i) => (
              <section key={i} className="card">
                <h2 className="h-display text-2xl font-bold mb-2">{i + 1}. {s.title}</h2>
                <RichText text={s.body} />
                {ko?.sections?.[i] ? <KoExplanation text={ko.sections[i]} open={koOpen} /> : <KoNote show={showKo}>{s.ko}</KoNote>}
                {s.examples?.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <h3 className="text-sm font-bold text-muted">{tr('Exemples · 예문', '예문 · Exemples')}</h3>
                    {s.examples.map((ex, j) => (
                      <div key={j} className="p-3 rounded-card" style={{ background: 'var(--surface-2)' }}>
                        <div className="flex items-start gap-1"><ClickableText text={ex.fr} className="font-bold flex-1" /><SpeakButton text={ex.fr} small /></div>
                        {showKo && <p lang="ko" className="ko text-muted text-[15px]">{ex.ko}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        {step === 'erreurs' && (
          <div className="space-y-3">
            <p className="text-muted">{tr('Les erreurs les plus courantes chez les apprenants — et comment les éviter.', '학습자가 가장 자주 하는 실수와 피하는 방법입니다.')}</p>
            {lesson.mistakes.map((m, i) => (
              <div key={i} className="card">
                <p><span className="font-bold" style={{ color: 'var(--bad)' }}>✘ </span><s className="opacity-70">{m.wrong}</s></p>
                <p className="mt-1"><span className="font-bold" style={{ color: 'var(--good)' }}>✔ </span><strong>{m.right}</strong></p>
                {lang === 'ko' ? (
                  <>
                    <p lang="ko" className="ko mt-2">{m.whyKo}</p>
                    <p className="text-sm text-muted">{m.why}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm mt-2">{m.why}</p>
                    {showKo && <p lang="ko" className="ko text-sm text-muted">{m.whyKo}</p>}
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {step === 'glossaire' && (
          <div className="card">
            <p className="text-muted text-sm mb-2">{tr('Ces mots sont aussi ajoutés aux cartes mémoire (Mini-jeux).', '이 단어들은 단어 카드(미니 게임)에도 들어 있습니다.')}</p>
            <dl className="divide-y" style={{ borderColor: 'var(--line)' }}>
              {lesson.glossary.map((g) => (
                <div key={g.fr} className="py-2 grid grid-cols-[1fr_auto] gap-x-3">
                  <dt className="font-bold flex items-center gap-1">{g.fr} <SpeakButton text={g.fr} small /></dt>
                  <dd lang="ko" className="ko text-right">{g.ko}</dd>
                  {g.note && <dd className="text-sm text-muted col-span-2">{g.note}</dd>}
                </div>
              ))}
            </dl>
          </div>
        )}

        {step === 'verif' && (
          <div>
            <div className="card mb-3">
              <p>{lang === 'ko'
                ? <>강의를 <strong>보지 말고</strong> 답하세요. 수업을 완료하려면 <strong>75%</strong> 이상 맞혀야 합니다.</>
                : <>Répondez à ces questions <strong>sans regarder le cours</strong>. Il faut <strong>75 %</strong> pour valider la leçon.</>}</p>
              {prog.bestCheck > 0 && <p className="text-sm text-muted mt-1">{tr('Meilleur résultat', '최고 점수')} : {prog.bestCheck} %</p>}
            </div>
            <QuizRunner key={checkRun} questions={lesson.check} source={`Vérification — ${lesson.title}`} xpPerGood={5} title="vérification"
              onFinish={onCheckDone} onExit={() => (state.lessons[lesson.id]?.checkPassed ? go('exos') : go('cours'))} />
            <button className="btn btn-ghost text-sm mt-2" onClick={() => setCheckRun((x) => x + 1)}>↻ {tr('Recommencer la vérification', '이해 확인 다시 하기')}</button>
          </div>
        )}

        {step === 'exos' && (
          <div>
            {!prog.checkPassed && (
              <p className="card mb-3 text-sm" style={{ borderColor: 'var(--accent)' }}>
                💡 {tr('Conseil : faites d\'abord le cours et la vérification. Les exercices restent accessibles à tout moment.', '먼저 강의와 이해 확인을 하는 것을 권합니다. 연습 문제는 언제든지 풀 수 있습니다.')}
              </p>
            )}
            {!lvl ? (
              <div className="grid gap-3 sm:grid-cols-3">
                {DIFF.map((l) => (
                  <button key={l.id} className="card text-left hover:opacity-90" onClick={() => setLvl(l.id)}>
                    <span className="h-display text-xl font-bold">{tr(l.label, l.ko)}</span>
                    <span lang={lang === 'ko' ? 'fr' : 'ko'} className="ko block text-sm text-muted">{lang === 'ko' ? l.label : l.ko}</span>
                    <span className="block text-sm mt-1">{prog.practice?.[l.id] != null ? `${tr('Meilleur', '최고')} : ${prog.practice[l.id]} %` : tr('Pas encore fait', '아직 안 함')}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <button className="btn btn-ghost text-sm mb-2" onClick={() => setLvl(null)}>← {tr('Choisir un autre niveau', '다른 난이도 고르기')}</button>
                <QuizRunner questions={lesson.practice[lvl]} source={`Exercices ${lvl} — ${lesson.title}`} xpPerGood={lvl === 'difficile' ? 10 : lvl === 'moyen' ? 7 : 5}
                  title={`exercices ${lvl}`} shuffleQuestions onExit={() => setLvl(null)}
                  onFinish={(s, t) => setLesson(lesson.id, (cur) => ({ ...cur, practice: { ...cur.practice, [lvl]: Math.max(cur.practice?.[lvl] || 0, Math.round((s / t) * 100)) } }))} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation entre étapes */}
      {!(step === 'exos' && lvl) && step !== 'verif' && (
        <div className="flex justify-between mt-6 gap-2">
          <button className="btn" disabled={idx === 0} onClick={() => go(STEPS[idx - 1].id)}>← {STEPS[idx - 1] ? tr(STEPS[idx - 1].label, STEPS[idx - 1].ko) : ''}</button>
          {idx < STEPS.length - 1 && <button className="btn btn-primary" onClick={() => go(STEPS[idx + 1].id)}>{tr(STEPS[idx + 1].label, STEPS[idx + 1].ko)} →</button>}
        </div>
      )}
    </div>
  )
}
