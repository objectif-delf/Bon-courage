/**
 * Affichage d'une question (QCM, réponse tapée, phrase à remettre dans l'ordre)
 * et enchaînement d'une série de questions (QuizRunner).
 */
import { useEffect, useMemo, useState } from 'react'
import { useProgress } from '../store/progress'
import { checkTyped, norm, shuffle } from '../lib/text'
import { ClickableText } from './WordLookup'
import { ProgressBar } from './ui'
import { useLang } from '../lib/i18n'
import { speak } from '../lib/speech'

// Consignes fréquentes traduites (affichées sous la consigne française en mode coréen).
const PROMPT_KO = [
  [/^Complétez/, '빈칸을 채우세요'],
  [/^Écoutez/, '듣고, 들은 단어를 고르세요'],
  [/^Quelle phrase est correcte/, '올바른 문장을 고르세요'],
  [/^Remettez/, '단어를 올바른 순서로 배열하세요'],
  [/^Quel article/, '알맞은 관사를 고르세요'],
  [/^Que signifie/, '이 단어의 뜻은?'],
  [/^Comment dit-on/, '프랑스어로 무엇이라고 할까요?'],
  [/^Quel mot du cours/, '수업에 나온 어떤 단어일까요?'],
  [/^Conjuguez/, '동사를 활용하세요'],
  [/^Subjonctif de/, '접속법 형태를 쓰세요'],
  [/^Imparfait/, '반과거 형태를 쓰세요'],
  [/^Participe passé/, '과거분사를 쓰세요'],
  [/^Mettez au passé composé|^Passé composé/, '복합과거로 쓰세요'],
  [/^Nom correspondant/, '알맞은 명사를 고르세요'],
  [/^Nominalisez/, '명사화하세요'],
  [/^Traduisez/, '번역하세요'],
  [/→/, '간접화법으로 바꾸세요'],
  [/^Selon|^Que|^Quel|^Pourquoi|^Qui|^Comment|^Où|^Dans/, '알맞은 답을 고르세요']
]
const promptKo = (q) => q.promptKo || PROMPT_KO.find(([re]) => re.test(q.prompt))?.[1]

export function QuestionCard({ q, onAnswered, instant = false, showKo = true }) {
  const { tr } = useLang()
  const [picked, setPicked] = useState(null)
  const [typed, setTyped] = useState('')
  const [built, setBuilt] = useState([])
  const [result, setResult] = useState(null) // { ok, accentWarning }
  const pool = useMemo(() => (q.type === 'order' ? (q.words || []).map((w, i) => ({ w, i })) : []), [q])

  useEffect(() => { setPicked(null); setTyped(''); setBuilt([]); setResult(null) }, [q])
  // Question d'écoute : lecture automatique (et bouton pour réécouter)
  useEffect(() => { if (q.audio) { const t = setTimeout(() => speak(q.audio, 'fr-FR', 0.85), 300); return () => clearTimeout(t) } }, [q])

  const finish = (ok, extra = {}) => {
    const r = { ok, ...extra }
    setResult(r)
    onAnswered?.(ok, r)
  }

  const answerQcm = (i) => {
    if (result) return
    setPicked(i)
    finish(i === q.answer)
  }
  const answerTyped = (e) => {
    e?.preventDefault()
    if (result || !typed.trim()) return
    const r = checkTyped(typed, q.answer)
    finish(r.ok, { accentWarning: r.accentWarning })
  }
  const answerOrder = () => {
    if (result) return
    const sentence = built.map((b) => b.w).join(' ')
    finish(norm(sentence) === norm(q.answer))
  }

  const correctText = q.type === 'qcm' ? q.options[q.answer] : Array.isArray(q.answer) ? q.answer[0] : q.answer

  return (
    <div className={`card ${result && !result.ok ? 'anim-shake' : ''}`}>
      {q.kind && <span className="chip text-xs mb-2">{q.kind}</span>}
      {q.text && (
        <div className="mb-3 p-3 rounded-card max-h-72 overflow-y-auto text-[15px] leading-relaxed" style={{ background: 'var(--surface-2)' }}>
          {q.text.split('\n').map((p, i) => <ClickableText key={i} text={p} className="mb-2" />)}
        </div>
      )}
      <p className="font-bold text-lg">{q.prompt}</p>
      {tr('', 'ko') === 'ko' && promptKo(q) && <p lang="ko" className="ko text-sm text-muted">{promptKo(q)}</p>}
      {q.audio && (
        <button type="button" className="btn btn-primary mt-3 text-lg" onClick={() => speak(q.audio, 'fr-FR', 0.85)}>
          🔊 {tr('Écouter', '듣기')}
        </button>
      )}
      {q.sentence && <ClickableText text={q.sentence} className="text-xl mt-2 h-display" />}

      {q.type === 'qcm' && (
        <div className="grid gap-2 mt-4 sm:grid-cols-2">
          {q.options.map((opt, i) => {
            const isRight = result && i === q.answer
            const isWrong = result && i === picked && !result.ok
            return (
              <button key={i} type="button" onClick={() => answerQcm(i)} disabled={!!result && !isRight && !isWrong}
                className="btn justify-start text-left !font-normal"
                style={isRight ? { background: 'var(--good)', color: '#fff', borderColor: 'var(--good)' } : isWrong ? { background: 'var(--bad)', color: '#fff', borderColor: 'var(--bad)' } : undefined}>
                <span className="opacity-60 font-bold">{String.fromCharCode(65 + i)}</span> <span lang={/[가-힣]/.test(opt) ? 'ko' : 'fr'}>{opt}</span>
              </button>
            )
          })}
        </div>
      )}

      {q.type === 'input' && (
        <form onSubmit={answerTyped} className="flex gap-2 mt-4">
          <input className="input" value={typed} onChange={(e) => setTyped(e.target.value)} disabled={!!result}
            placeholder={tr('Votre réponse…', '답을 입력하세요…')} autoCapitalize="off" autoCorrect="off" spellCheck={false} aria-label="Votre réponse" />
          <button className="btn btn-primary" disabled={!!result || !typed.trim()}>{tr('Valider', '확인')}</button>
        </form>
      )}

      {q.type === 'order' && (
        <div className="mt-4">
          <div className="min-h-[52px] p-2 rounded-card flex flex-wrap gap-2" style={{ border: 'var(--border-w) dashed var(--line)' }}>
            {built.length === 0 && <span className="text-muted text-sm self-center">{tr('Touchez les mots dans l\'ordre…', '단어를 순서대로 누르세요…')}</span>}
            {built.map((b) => (
              <button key={b.i} type="button" className="btn !min-h-0 !py-1" disabled={!!result}
                onClick={() => setBuilt((x) => x.filter((y) => y.i !== b.i))}>{b.w}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {pool.filter((p) => !built.some((b) => b.i === p.i)).map((p) => (
              <button key={p.i} type="button" className="btn !min-h-0 !py-1" style={{ background: 'var(--surface-2)' }} disabled={!!result}
                onClick={() => setBuilt((x) => [...x, p])}>{p.w}</button>
            ))}
          </div>
          <button type="button" className="btn btn-primary mt-3" onClick={answerOrder} disabled={!!result || built.length !== pool.length}>{tr('Valider', '확인')}</button>
        </div>
      )}

      {result && !instant && (
        <div className="mt-4 p-3 rounded-card anim-pop" style={{ background: `color-mix(in srgb, ${result.ok ? 'var(--good)' : 'var(--bad)'} 12%, transparent)` }} aria-live="polite">
          <p className="font-bold" style={{ color: result.ok ? 'var(--good)' : 'var(--bad)' }}>
            {result.ok ? tr('✔ Bonne réponse !', '✔ 정답입니다!') : tr('✘ Pas tout à fait.', '✘ 아쉬워요.')}
            {!result.ok && <span className="text-ink font-normal"> {tr('Réponse', '정답')} : <strong>{correctText}</strong></span>}
          </p>
          {result.accentWarning && <p className="text-sm">{tr('Attention aux accents', '악상(accent) 기호에 주의하세요')} : <strong>{correctText}</strong></p>}
          {q.explanation && <p className="mt-1">{q.explanation}</p>}
          {(showKo || tr('fr', 'ko') === 'ko') && q.explanationKo && <p lang="ko" className="ko text-muted text-sm mt-1">🇰🇷 {q.explanationKo}</p>}
        </div>
      )}
    </div>
  )
}

/**
 * Série de questions. Props :
 *  questions, source (texte pour la liste d'erreurs), xpPerGood, onFinish(score, total),
 *  shuffleQuestions, title
 */
export function QuizRunner({ questions, source = 'exercice', xpPerGood = 5, onFinish, shuffleQuestions = false, title, onExit }) {
  const { recordAnswer, addXP, state } = useProgress()
  const { tr } = useLang()
  const list = useMemo(() => (shuffleQuestions ? shuffle(questions) : questions), [questions, shuffleQuestions])
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [done, setDone] = useState(false)

  if (!list.length) return <p className="text-muted">{tr('Aucune question disponible.', '문제가 없습니다.')}</p>

  const q = list[i]
  const onAnswered = (ok) => {
    setAnswered(true)
    if (ok) setScore((s) => s + 1)
    recordAnswer(q, ok, source)
  }
  const next = () => {
    if (i + 1 >= list.length) {
      setDone(true)
      const finalScore = score
      if (finalScore) addXP(finalScore * xpPerGood, title || 'exercices')
      onFinish?.(finalScore, list.length)
    } else {
      setI(i + 1)
      setAnswered(false)
    }
  }

  if (done) {
    const pct = Math.round((score / list.length) * 100)
    return (
      <div className="card text-center py-8 anim-pop">
        <div className="text-5xl mb-2">{pct >= 80 ? '🏅' : pct >= 50 ? '👍' : '💪'}</div>
        <p className="h-display text-3xl font-extrabold">{score} / {list.length}</p>
        <p className="text-muted mt-1">{pct >= 80 ? tr('Excellent travail !', '아주 잘했어요!') : pct >= 50 ? tr('Bien — revoyez les erreurs pour progresser.', '좋아요 — 틀린 문제를 복습하면 더 늘어요.') : tr('Relisez le cours, puis réessayez : vos erreurs sont dans « Revoir mes erreurs ».', '강의를 다시 읽고 도전해 보세요. 틀린 문제는 « 오답 노트 »에 있습니다.')}</p>
        <div className="flex gap-2 justify-center mt-4 flex-wrap">
          <button className="btn btn-primary" onClick={() => { setI(0); setScore(0); setAnswered(false); setDone(false) }}>{tr('Recommencer', '다시 하기')}</button>
          {onExit && <button className="btn" onClick={onExit}>{tr('Terminer', '끝내기')}</button>}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm text-muted tabular-nums whitespace-nowrap">{i + 1} / {list.length}</span>
        <ProgressBar value={i + (answered ? 1 : 0)} max={list.length} label="Progression de la série" />
        <span className="chip text-sm">✔ {score}</span>
      </div>
      <QuestionCard key={i + (q.id || q.prompt)} q={q} onAnswered={onAnswered} showKo={state.showKo} />
      <div className="flex justify-end mt-3">
        <button className="btn btn-primary" onClick={next} disabled={!answered}>{i + 1 >= list.length ? tr('Voir le résultat', '결과 보기') : tr('Question suivante →', '다음 문제 →')}</button>
      </div>
    </div>
  )
}
