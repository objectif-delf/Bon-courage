/**
 * EXAMENS BLANCS DELF B2 — 4 épreuves chronométrées, notation sur 100.
 * CO et CE : correction automatique. PE et PO : auto-évaluation guidée par la grille
 * (et, pour la PE, commentaire IA facultatif). Le dictionnaire est désactivé pendant
 * l'examen, comme le jour J.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useProgress } from '../store/progress'
import { EXAMS, PE_GRID, PO_GRID, SECTIONS } from '../data/delfB2'
import { PageHeader, TimerPill, useCountdown, fmtTime } from '../components/ui'
import { speak, stopSpeaking, canSpeak, hasVoice } from '../lib/speech'
import { wordCount } from '../lib/text'
import { aiWritingFeedback } from '../lib/ai'
import { useLang } from '../lib/i18n'

const to25 = (good, total) => Math.round((good / total) * 25 * 2) / 2

export default function Exam() {
  const { tr, lang } = useLang()
  const { state, update, addXP } = useProgress()
  const [exam, setExam] = useState(null)
  const [plan, setPlan] = useState([]) // sections à passer
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState({})
  const [practice, setPractice] = useState(false) // temps doublé pour s'entraîner

  // Avertir avant de quitter la page pendant un examen
  useEffect(() => {
    if (!exam || step >= plan.length) return
    const h = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [exam, step, plan.length])

  const begin = (ex, sections) => { setExam(ex); setPlan(sections); setStep(0); setScores({}); window.scrollTo(0, 0) }
  const sectionDone = useCallback((id, score) => {
    setScores((s) => ({ ...s, [id]: score }))
    setStep((x) => x + 1)
    window.scrollTo(0, 0)
  }, [])

  // Fin de l'examen : enregistrement
  const finished = exam && step >= plan.length
  useEffect(() => {
    if (!finished) return
    stopSpeaking()
    const full = plan.length === 4
    const total = Object.values(scores).reduce((a, b) => a + b, 0)
    const passed = full && total >= 50 && Object.values(scores).every((v) => v >= 5)
    update((s) => ({ ...s, exams: [{ date: new Date().toLocaleDateString('fr-FR'), exam: exam.title, scores, total, passed, full }, ...s.exams].slice(0, 50) }))
    addXP(full ? 60 : 20, 'examen blanc')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  if (!exam) return <ExamHome onStart={begin} history={state.exams} practice={practice} setPractice={setPractice} />

  if (finished) {
    const total = Object.values(scores).reduce((a, b) => a + b, 0)
    const full = plan.length === 4
    const passed = full && total >= 50 && Object.values(scores).every((v) => v >= 5)
    return (
      <div className="space-y-4">
        <div className="card text-center py-8 anim-pop">
          <div className="text-5xl">{full ? (passed ? '🏆' : '📈') : '✅'}</div>
          <p className="h-display text-4xl font-extrabold mt-2">{total} / {plan.length * 25}</p>
          {full && <p className="text-lg font-bold mt-1" style={{ color: passed ? 'var(--good)' : 'var(--bad)' }}>{passed ? tr('Seuil de réussite atteint !', '합격선을 넘었습니다!') : tr('Pas encore le seuil : 50/100 et au moins 5/25 par épreuve.', '아직 합격선에 못 미칩니다: 총 50/100 이상, 각 영역 5/25 이상이 필요합니다.')}</p>}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {plan.map((id) => {
            const sec = SECTIONS.find((s) => s.id === id)
            return (
              <div key={id} className="card flex items-center justify-between">
                <span>{sec.icon} {tr(sec.label, sec.ko)}</span>
                <strong style={{ color: scores[id] < 5 ? 'var(--bad)' : undefined }}>{scores[id]} / 25</strong>
              </div>
            )
          })}
        </div>
        <button className="btn btn-primary" onClick={() => setExam(null)}>{tr('Retour aux examens blancs', '모의고사 목록으로')}</button>
      </div>
    )
  }

  const current = plan[step]
  const factor = practice ? 2 : 1
  return (
    <div>
      <p className="text-sm text-muted">{exam.title} · {tr('épreuve', '영역')} {step + 1}/{plan.length}{practice ? tr(' · mode entraînement (temps ×2)', ' · 연습 모드 (시간 2배)') : ''}</p>
      {current === 'co' && <SectionQcm key="co" kind="co" data={exam.co} minutes={30 * factor} onDone={(s) => sectionDone('co', s)} />}
      {current === 'ce' && <SectionQcm key="ce" kind="ce" data={exam.ce} minutes={60 * factor} onDone={(s) => sectionDone('ce', s)} />}
      {current === 'pe' && <SectionPE key="pe" data={exam.pe} minutes={60 * factor} onDone={(s) => sectionDone('pe', s)} />}
      {current === 'po' && <SectionPO key="po" data={exam.po} prep={30 * factor} talk={20} onDone={(s) => sectionDone('po', s)} />}
      <button className="btn btn-ghost text-sm mt-6" onClick={() => { if (confirm(tr('Abandonner cet examen ? Les réponses seront perdues.', '시험을 포기할까요? 답안이 사라집니다.'))) { stopSpeaking(); setExam(null) } }}>{tr('Abandonner l\'examen', '시험 포기')}</button>
    </div>
  )
}

function ExamHome({ onStart, history, practice, setPractice }) {
  const { tr, lang } = useLang()
  return (
    <div>
      <PageHeader title="Examens blancs DELF B2" ko="DELF B2 모의고사" subtitle="Sujets originaux au format de l'examen. Notation sur 100 : il faut 50 points et au moins 5/25 dans chaque épreuve." subtitleKo="실제 시험 형식의 자체 제작 문제입니다. 100점 만점에 50점 이상, 각 영역 5/25 이상이면 합격입니다." />
      <div className="card mb-4">
        <h2 className="font-bold mb-2">{tr('Les 4 épreuves', '4개 영역')}</h2>
        <ul className="grid gap-1 sm:grid-cols-2 text-sm">
          {SECTIONS.map((s) => <li key={s.id}>{s.icon} <strong>{tr(s.label, s.ko)}</strong> <span className="text-muted">— {s.id === 'po' ? tr('30 min de préparation + 20 min', '준비 30분 + 20분') : `${s.minutes} min`} · /25</span></li>)}
        </ul>
        <label className="flex items-center gap-2 mt-3 text-sm">
          <input type="checkbox" checked={practice} onChange={(e) => setPractice(e.target.checked)} className="w-5 h-5" />
          {tr('Mode entraînement : temps doublé (pour s\'habituer au format)', '연습 모드: 시간 2배 (형식에 익숙해지기)')}
        </label>
        <p className="text-xs text-muted mt-2">{tr('Les durées officielles peuvent varier selon les sessions : vérifiez votre convocation.', '실제 시험 시간은 회차마다 다를 수 있습니다. 수험표를 확인하세요.')}</p>
      </div>
      <div className="grid gap-4">
        {EXAMS.map((ex) => (
          <div key={ex.id} className="card">
            <h3 className="h-display text-xl font-bold">{ex.title}</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              <button className="btn btn-primary" onClick={() => onStart(ex, ['co', 'ce', 'pe', 'po'])}>▶ {tr('Examen complet', '전체 시험')}</button>
              {SECTIONS.map((s) => <button key={s.id} className="btn text-sm" onClick={() => onStart(ex, [s.id])}>{s.icon} {tr(s.label, s.ko)}</button>)}
            </div>
          </div>
        ))}
      </div>
      {history.length > 0 && (
        <section className="card mt-6">
          <h2 className="font-bold mb-2">{tr('Mes résultats', '나의 결과')}</h2>
          <ul className="text-sm divide-y" style={{ borderColor: 'var(--line)' }}>
            {history.slice(0, 10).map((h, i) => (
              <li key={i} className="py-2 flex justify-between gap-2">
                <span>{h.date} · {h.exam}<br /><span className="text-muted">{Object.entries(h.scores).map(([k, v]) => `${k.toUpperCase()} ${v}`).join(' · ')}</span></span>
                <strong style={{ color: h.full ? (h.passed ? 'var(--good)' : 'var(--bad)') : undefined }}>{h.total}{h.full ? '/100' : ''}</strong>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

/** Compréhension de l'oral / des écrits : QCM corrigés automatiquement. */
function SectionQcm({ kind, data, minutes, onDone }) {
  const { tr, lang } = useLang()
  const [answers, setAnswers] = useState({})
  const [plays, setPlays] = useState({})
  const [playing, setPlaying] = useState(null)
  const [corrected, setCorrected] = useState(false)
  const all = data.flatMap((d) => d.questions)
  const good = all.filter((q) => answers[q.id] === q.answer).length
  const score = to25(good, all.length)
  const { recordAnswer } = useProgress()

  const correct = useCallback(() => {
    stopSpeaking()
    setCorrected(true)
    window.scrollTo(0, 0)
  }, [])
  const [left] = useCountdown(minutes * 60, !corrected, correct)

  useEffect(() => {
    if (!corrected) return
    all.forEach((q) => recordAnswer(q, answers[q.id] === q.answer, kind === 'co' ? 'Examen blanc — oral' : 'Examen blanc — écrit'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corrected])

  const play = async (i, d) => {
    if ((plays[i] || 0) >= d.maxPlays || playing !== null) return
    setPlays((p) => ({ ...p, [i]: (p[i] || 0) + 1 }))
    setPlaying(i)
    await speak(d.script.replace(/^— /gm, ''), 'fr-FR', 0.95)
    setPlaying(null)
  }

  const sec = SECTIONS.find((s) => s.id === kind)
  return (
    <div>
      <div className="sticky top-[60px] z-30 py-2 flex items-center justify-between" style={{ background: 'var(--bg)' }}>
        <h1 className="h-display text-2xl font-extrabold">{sec.icon} {tr(sec.label, sec.ko)}</h1>
        {!corrected ? <TimerPill left={left} total={minutes * 60} /> : <span className="chip text-base">{score} / 25</span>}
      </div>
      {kind === 'co' && !corrected && (!canSpeak() || !hasVoice('fr')) && (
        <p className="card text-sm mb-3" style={{ borderColor: 'var(--bad)' }}>⚠️ {tr('Aucune voix française détectée sur cet appareil : les documents sonores risquent de ne pas être lus. Essayez Chrome, Safari ou Edge, ou installez une voix française dans les réglages du téléphone. Le texte sera affiché à la correction.', '이 기기에서 프랑스어 음성을 찾지 못했습니다. 듣기 자료가 재생되지 않을 수 있습니다. Chrome, Safari, Edge를 사용하거나 휴대폰 설정에서 프랑스어 음성을 설치하세요. 채점 후에는 원문이 표시됩니다.')}</p>
      )}
      {corrected && <p className="card mb-4"><strong>{tr(`Bonnes réponses : ${good} sur ${all.length}`, `정답: ${all.length}개 중 ${good}개`)}</strong> → {score}/25. {tr('Les bonnes réponses sont en vert ci-dessous.', '정답은 아래에 초록색으로 표시됩니다.')}</p>}
      <div className="space-y-6">
        {data.map((d, i) => (
          <section key={i} className="card">
            <h2 className="font-bold text-lg">{d.title}</h2>
            {kind === 'co' && !corrected && (
              <div className="flex items-center gap-3 my-3">
                <button className="btn btn-primary" onClick={() => play(i, d)} disabled={(plays[i] || 0) >= d.maxPlays || playing !== null}>
                  {playing === i ? tr('🔊 Lecture en cours…', '🔊 재생 중…') : tr('▶ Écouter le document', '▶ 듣기 자료 재생')}
                </button>
                <span className="text-sm text-muted">{tr('Écoutes', '재생 횟수')} : {plays[i] || 0}/{d.maxPlays}</span>
              </div>
            )}
            {(kind === 'ce' || corrected) && (
              <div className="my-3 p-3 rounded-card text-[15px] leading-relaxed max-h-[55vh] overflow-y-auto" style={{ background: 'var(--surface-2)' }}>
                {(d.text || d.script).split('\n').map((p, j) => <p key={j} className="mb-2">{p}</p>)}
              </div>
            )}
            <ol className="space-y-4 mt-3">
              {d.questions.map((q, qi) => (
                <li key={q.id}>
                  <p className="font-bold">{qi + 1}. {q.prompt}</p>
                  <div className="grid gap-1.5 mt-2">
                    {q.options.map((o, oi) => {
                      const sel = answers[q.id] === oi
                      const right = corrected && oi === q.answer
                      const wrong = corrected && sel && oi !== q.answer
                      return (
                        <label key={oi} className="btn justify-start !font-normal text-left cursor-pointer"
                          style={right ? { background: 'var(--good)', color: '#fff', borderColor: 'var(--good)' } : wrong ? { background: 'var(--bad)', color: '#fff', borderColor: 'var(--bad)' } : sel ? { borderColor: 'var(--primary)', boxShadow: '0 0 0 2px var(--primary) inset' } : undefined}>
                          <input type="radio" name={q.id} className="sr-only" checked={sel} disabled={corrected} onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))} />
                          <span className="font-bold opacity-60">{String.fromCharCode(65 + oi)}</span> {o}
                        </label>
                      )
                    })}
                  </div>
                  {corrected && <p className="text-sm text-muted mt-1">{q.explanation}</p>}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        {!corrected ? (
          <button className="btn btn-primary" onClick={() => confirm(tr(`Rendre la copie ? (${Object.keys(answers).length}/${all.length} réponses)`, `답안을 제출할까요? (${all.length}문제 중 ${Object.keys(answers).length}개 답함)`)) && correct()}>{tr('Rendre la copie', '답안 제출')}</button>
        ) : (
          <button className="btn btn-primary" onClick={() => onDone(score)}>{tr('Épreuve suivante →', '다음 영역 →')}</button>
        )}
      </div>
    </div>
  )
}

/** Grille d'auto-évaluation (curseurs par demi-point). */
function Grid({ grid, values, setValues }) {
  const { tr, lang } = useLang()
  return (
    <div className="space-y-3">
      {grid.map((c) => (
        <label key={c.id} className="block">
          <span className="flex justify-between gap-2 text-sm"><span>{tr(c.label, c.ko)}</span><strong className="tabular-nums whitespace-nowrap">{values[c.id] ?? 0} / {c.max}</strong></span>
          <input type="range" min={0} max={c.max} step={0.5} value={values[c.id] ?? 0} onChange={(e) => setValues((v) => ({ ...v, [c.id]: Number(e.target.value) }))} className="w-full" style={{ accentColor: 'var(--primary)' }} />
        </label>
      ))}
    </div>
  )
}

function SectionPE({ data, minutes, onDone }) {
  const { tr, lang } = useLang()
  const { state } = useProgress()
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [vals, setVals] = useState({})
  const [ai, setAi] = useState({ busy: false, res: null, err: '' })
  const submit = useCallback(() => { setSubmitted(true); window.scrollTo(0, 0) }, [])
  const [left] = useCountdown(minutes * 60, !submitted, submit)
  const words = wordCount(text)
  const total = PE_GRID.reduce((a, c) => a + (vals[c.id] || 0), 0)

  const askAI = async () => {
    setAi({ busy: true, res: null, err: '' })
    try { setAi({ busy: false, res: await aiWritingFeedback(state.settings, data.subject, text), err: '' }) }
    catch (e) { setAi({ busy: false, res: null, err: e.message }) }
  }

  return (
    <div>
      <div className="sticky top-[60px] z-30 py-2 flex items-center justify-between" style={{ background: 'var(--bg)' }}>
        <h1 className="h-display text-2xl font-extrabold">✍️ {tr('Production écrite', '쓰기')}</h1>
        {!submitted ? <TimerPill left={left} total={minutes * 60} /> : <span className="chip text-base">{total} / 25</span>}
      </div>
      <div className="card">
        <p className="chip text-xs mb-2">{data.type} · {tr(`${data.minWords} mots minimum`, `최소 ${data.minWords}단어`)}</p>
        <p className="font-bold">{data.subject}</p>
      </div>
      <textarea className="input mt-3 min-h-[45vh] leading-relaxed" value={text} onChange={(e) => setText(e.target.value)} disabled={submitted}
        placeholder={tr('Rédigez votre texte ici…', '여기에 프랑스어로 글을 쓰세요…')} spellCheck={false} autoCorrect="off" aria-label="Votre texte" />
      <p className="text-sm mt-1 tabular-nums" style={{ color: words < data.minWords ? 'var(--bad)' : 'var(--good)' }}>{tr(`${words} mots`, `${words}단어`)} {words < data.minWords ? tr(`(encore ${data.minWords - words})`, `(${data.minWords - words}단어 더)`) : '✔'}</p>
      {!submitted ? (
        <div className="flex justify-end mt-3"><button className="btn btn-primary" onClick={() => confirm(tr('Rendre votre texte ?', '글을 제출할까요?')) && submit()}>{tr('Rendre la copie', '답안 제출')}</button></div>
      ) : (
        <div className="space-y-4 mt-4">
          <div className="card">
            <h2 className="font-bold mb-1">{tr('Auto-évaluation', '자기 평가')}</h2>
            <p className="text-sm text-muted mb-3">{tr('Relisez votre texte et notez-vous honnêtement avec la grille. Vérifiez : titre / formules, paragraphes, connecteurs variés, subjonctif, accords.', '글을 다시 읽고 평가표로 솔직하게 점수를 매기세요. 확인할 것: 제목/형식 표현, 문단, 다양한 연결어, 접속법, 성·수 일치.')}</p>
            <Grid grid={PE_GRID} values={vals} setValues={setVals} />
          </div>
          <div className="card">
            <h2 className="font-bold">🤖 {tr('Avis de l\'IA (facultatif)', 'AI 피드백 (선택)')}</h2>
            {!state.settings.aiKey ? <p className="text-sm text-muted">{tr('Ajoutez une clé gratuite dans Profil pour obtenir un commentaire détaillé.', '프로필에서 무료 키를 추가하면 자세한 피드백을 받을 수 있습니다.')}</p> : (
              <>
                {!ai.res && <button className="btn mt-2" onClick={askAI} disabled={ai.busy || words < 30}>{ai.busy ? tr('Analyse en cours…', '분석 중…') : tr('Demander un commentaire', '피드백 받기')}</button>}
                {ai.err && <p style={{ color: 'var(--bad)' }}>{ai.err}</p>}
                {ai.res && (
                  <div className="text-sm space-y-2 mt-2">
                    <p className="text-lg font-bold">{tr('Estimation', '예상 점수')} : {ai.res.note} / 25</p>
                    {ai.res.pointsForts?.length > 0 && <div><strong>{tr('Points forts', '잘한 점')}</strong><ul className="list-disc pl-5">{ai.res.pointsForts.map((x, i) => <li key={i}>{x}</li>)}</ul></div>}
                    {ai.res.aAmeliorer?.length > 0 && <div><strong>{tr('À améliorer', '개선할 점')}</strong><ul className="list-disc pl-5">{ai.res.aAmeliorer.map((x, i) => <li key={i}>{x}</li>)}</ul></div>}
                    {ai.res.erreurs?.length > 0 && <div><strong>{tr('Corrections', '수정')}</strong><ul className="pl-0 space-y-1">{ai.res.erreurs.map((e, i) => <li key={i}><s className="opacity-70">{e.extrait}</s> → <strong>{e.correction}</strong> <span className="text-muted">({e.regle})</span></li>)}</ul></div>}
                    {ai.res.conseilKo && <p lang="ko" className="ko">🇰🇷 {ai.res.conseilKo}</p>}
                    <p className="text-xs text-muted">{tr('L\'IA donne une estimation : seul un correcteur habilité délivre la note officielle.', 'AI 점수는 예상치입니다. 공식 점수는 자격을 갖춘 채점자만 줄 수 있습니다.')}</p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex justify-end"><button className="btn btn-primary" onClick={() => onDone(total)}>{tr(`Valider ${total}/25 et continuer →`, `${total}/25 확정하고 계속 →`)}</button></div>
        </div>
      )}
    </div>
  )
}

function SectionPO({ data, prep, talk, onDone }) {
  const { tr, lang } = useLang()
  const [phase, setPhase] = useState('prep') // prep | talk | eval
  const [notes, setNotes] = useState('')
  const [vals, setVals] = useState({})
  const [audioUrl, setAudioUrl] = useState(null)
  const [rec, setRec] = useState(null)
  const chunks = useRef([])
  const toTalk = useCallback(() => setPhase('talk'), [])
  const toEval = useCallback(() => setPhase('eval'), [])
  const [leftPrep] = useCountdown(prep * 60, phase === 'prep', toTalk)
  const [leftTalk] = useCountdown(talk * 60, phase === 'talk', toEval)
  const total = PO_GRID.reduce((a, c) => a + (vals[c.id] || 0), 0)
  const canRecord = typeof window !== 'undefined' && 'MediaRecorder' in window && navigator.mediaDevices?.getUserMedia

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const r = new MediaRecorder(stream)
      chunks.current = []
      r.ondataavailable = (e) => chunks.current.push(e.data)
      r.onstop = () => { setAudioUrl(URL.createObjectURL(new Blob(chunks.current, { type: r.mimeType }))); stream.getTracks().forEach((t) => t.stop()) }
      r.start()
      setRec(r)
    } catch { alert(tr('Micro inaccessible : autorisez l\'accès au micro dans le navigateur.', '마이크에 접근할 수 없습니다. 브라우저에서 마이크 권한을 허용하세요.')) }
  }
  const stopRec = () => { rec?.stop(); setRec(null) }
  useEffect(() => { if (phase === 'eval' && rec) stopRec() }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sticky top-[60px] z-30 py-2 flex items-center justify-between" style={{ background: 'var(--bg)' }}>
        <h1 className="h-display text-2xl font-extrabold">🎤 {tr('Production orale', '말하기')}</h1>
        {phase === 'prep' && <TimerPill left={leftPrep} total={prep * 60} />}
        {phase === 'talk' && <TimerPill left={leftTalk} total={talk * 60} />}
        {phase === 'eval' && <span className="chip text-base">{total} / 25</span>}
      </div>
      <div className="card">
        {data.document.split('\n').map((p, i) => <p key={i} className={i === 0 ? 'h-display text-xl font-bold mb-2' : ''}>{p}</p>)}
      </div>
      <p className="card mt-3 text-sm"><strong>{tr('Consigne', '지시문')} :</strong> {data.instructions}</p>

      {phase === 'prep' && (
        <div className="mt-3">
          <label className="font-bold text-sm">{tr('Brouillon (plan, idées, exemples)', '메모 (개요, 아이디어, 예시)')}</label>
          <textarea className="input mt-1 min-h-[30vh]" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={'Introduction : …\nI. …\nII. …\nConclusion : …'} />
          <div className="flex justify-end mt-3"><button className="btn btn-primary" onClick={toTalk}>{tr('J\'ai fini de préparer → Parler', '준비 끝 → 말하기')}</button></div>
        </div>
      )}

      {phase === 'talk' && (
        <div className="mt-3 space-y-3">
          <div className="card">
            <p className="font-bold">{tr('1. Présentez votre exposé à voix haute (5 à 7 minutes environ).', '1. 소리 내어 발표하세요 (약 5~7분).')}</p>
            {canRecord ? (
              <div className="flex gap-2 mt-2 items-center">
                {!rec ? <button className="btn btn-primary" onClick={startRec}>⏺ {tr('Enregistrer ma voix', '내 목소리 녹음')}</button> : <button className="btn" style={{ color: 'var(--bad)' }} onClick={stopRec}>⏹ {tr('Arrêter l\'enregistrement', '녹음 중지')}</button>}
                {rec && <span className="text-sm animate-pulse" style={{ color: 'var(--bad)' }}>● {tr('enregistrement…', '녹음 중…')}</span>}
              </div>
            ) : <p className="text-sm text-muted mt-1">{tr('Enregistrement non disponible sur ce navigateur : parlez à voix haute.', '이 브라우저에서는 녹음할 수 없습니다. 소리 내어 말해 보세요.')}</p>}
            {notes && <details className="mt-2"><summary className="text-sm cursor-pointer">{tr('Voir mon brouillon', '내 메모 보기')}</summary><pre className="whitespace-pre-wrap text-sm mt-1 font-body">{notes}</pre></details>}
          </div>
          <div className="card">
            <p className="font-bold">{tr('2. Questions de l\'examinateur — répondez à voix haute :', '2. 시험관 질문 — 소리 내어 대답하세요:')}</p>
            <ul className="mt-2 space-y-2">{data.followUps.map((f, i) => <li key={i} className="flex items-start gap-2"><span>💬</span><span>{f}</span></li>)}</ul>
          </div>
          <div className="flex justify-end"><button className="btn btn-primary" onClick={toEval}>{tr('Terminer et m\'évaluer →', '끝내고 자기 평가 →')}</button></div>
        </div>
      )}

      {phase === 'eval' && (
        <div className="mt-3 space-y-3">
          {audioUrl && <div className="card"><p className="font-bold mb-2">{tr('Réécoutez-vous avant de vous noter :', '점수를 매기기 전에 녹음을 다시 들어 보세요:')}</p><audio controls src={audioUrl} className="w-full" /></div>}
          <div className="card">
            <h2 className="font-bold mb-2">{tr('Auto-évaluation', '자기 평가')}</h2>
            <Grid grid={PO_GRID} values={vals} setValues={setVals} />
          </div>
          <div className="flex justify-end"><button className="btn btn-primary" onClick={() => onDone(total)}>{tr(`Valider ${total}/25 →`, `${total}/25 확정 →`)}</button></div>
        </div>
      )}
      {phase !== 'eval' && <p className="text-xs text-muted mt-3">{tr('Préparation', '준비')} : {fmtTime(prep * 60)} · {tr('Passage', '발표')} : {fmtTime(talk * 60)}</p>}
    </div>
  )
}
