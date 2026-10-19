/**
 * MON ESPACE COURS — l'étudiant importe les cours de son professeur
 * (copier-coller, fichier PDF/TXT, notes) et l'application en tire des exercices
 * fondés exclusivement sur ce contenu.
 */
import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../store/progress'
import { readCourseFile } from '../lib/fileImport'
import { extractPairs, generateFromCourse } from '../lib/exerciseGenerator'
import { aiCourseExercises } from '../lib/ai'
import { useLang } from '../lib/i18n'
import { Empty, PageHeader } from '../components/ui'
import { ClickableText } from '../components/WordLookup'
import { QuizRunner } from '../components/Question'
import { Flashcards } from '../components/Flashcards'

const EXAMPLE = `Leçon du 14 octobre — Exprimer son opinion

Vocabulaire :
un avis : 의견
convaincre : 설득하다
un inconvénient : 단점
favoriser : 촉진하다
en revanche : 반면에

Grammaire : après « je pense que », on utilise l'indicatif. Après « je ne pense pas que », on utilise le subjonctif.
Je pense que le télétravail est une bonne solution. Je ne pense pas que ce soit possible pour tous les métiers.
Les connecteurs permettent d'organiser les arguments. En revanche, il ne faut pas les répéter à chaque phrase.`

export default function MyCourses() {
  const { state, update, addXP } = useProgress()
  const { tr } = useLang()
  const [adding, setAdding] = useState(state.courses.length === 0)
  const [openId, setOpenId] = useState(null)
  const course = state.courses.find((c) => c.id === openId)

  const save = (c) => {
    update((s) => ({ ...s, courses: [c, ...s.courses.filter((x) => x.id !== c.id)] }))
    if (!state.courses.some((x) => x.id === c.id)) addXP(15, 'cours importé')
    setAdding(false)
    setOpenId(c.id)
  }
  const remove = (id) => {
    if (!confirm(tr('Supprimer ce cours ? Cette action est définitive.', '이 수업을 삭제할까요? 되돌릴 수 없습니다.'))) return
    update((s) => ({ ...s, courses: s.courses.filter((x) => x.id !== id) }))
    setOpenId(null)
  }

  if (course) return <CourseView course={course} onBack={() => setOpenId(null)} onDelete={() => remove(course.id)} onSave={save} />

  return (
    <div>
      <PageHeader title="Mon Espace Cours" ko="내 수업 공간"
        subtitle="Ajoutez les cours de votre professeur : l'application crée des exercices à partir de ce contenu uniquement."
        subtitleKo="선생님의 수업 자료를 추가하세요. 앱이 그 내용만으로 연습 문제를 만듭니다." />
      {adding ? (
        <CourseForm onSave={save} onCancel={state.courses.length ? () => setAdding(false) : null} />
      ) : (
        <button className="btn btn-primary mb-4" onClick={() => setAdding(true)}>＋ {tr('Ajouter un cours', '수업 추가')}</button>
      )}
      <div className="grid gap-3 mt-4">
        {state.courses.map((c) => (
          <button key={c.id} className="card text-left flex items-center gap-3 hover:opacity-95" onClick={() => setOpenId(c.id)}>
            <span className="text-3xl" aria-hidden>📄</span>
            <span className="flex-1">
              <span className="block font-bold">{c.title}</span>
              <span className="block text-sm text-muted">{c.date} · {tr(`${extractPairs(c.text).length} mots de vocabulaire repérés`, `단어 ${extractPairs(c.text).length}개 발견`)}{c.best != null ? ` · ${tr('meilleur score', '최고 점수')} ${c.best} %` : ''}</span>
            </span>
            <span aria-hidden>→</span>
          </button>
        ))}
        {!adding && state.courses.length === 0 && <Empty icon="🧑‍🏫">{tr('Aucun cours pour l\'instant.', '아직 수업이 없습니다.')}</Empty>}
      </div>
    </div>
  )
}

function CourseForm({ onSave, onCancel, initial }) {
  const { tr } = useLang()
  const [title, setTitle] = useState(initial?.title || '')
  const [text, setText] = useState(initial?.text || '')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const fileRef = useRef()

  const onFile = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setBusy(true); setErr('')
    try {
      const t = await readCourseFile(f)
      setText((x) => (x ? x + '\n\n' : '') + t)
      if (!title) setTitle(f.name.replace(/\.[^.]+$/, ''))
    } catch (er) { setErr(er.message) }
    setBusy(false)
    e.target.value = ''
  }

  return (
    <form className="card space-y-3" onSubmit={(e) => { e.preventDefault(); if (text.trim().length < 20) return setErr(tr('Le cours est trop court.', '내용이 너무 짧습니다.')); onSave({ id: initial?.id || Date.now().toString(36), title: title.trim() || tr('Cours sans titre', '제목 없는 수업'), text: text.trim(), date: initial?.date || new Date().toLocaleDateString('fr-FR') }) }}>
      <label className="block">
        <span className="font-bold text-sm">{tr('Titre du cours', '수업 제목')}</span>
        <input className="input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={tr('Ex. : Cours du 14 octobre — le subjonctif', '예: 10월 14일 수업 — 접속법')} />
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn" onClick={() => fileRef.current.click()} disabled={busy}>📎 {tr('Importer un PDF ou un .txt', 'PDF 또는 .txt 가져오기')}</button>
        <input ref={fileRef} type="file" accept=".pdf,.txt,.md,text/plain,application/pdf" className="hidden" onChange={onFile} />
        <button type="button" className="btn btn-ghost text-sm" onClick={() => { setTitle('Exemple — Exprimer son opinion'); setText(EXAMPLE) }}>{tr('Essayer avec un exemple', '예시로 해 보기')}</button>
        {busy && <span className="text-muted self-center">{tr('Lecture du fichier…', '파일 읽는 중…')}</span>}
      </div>
      <label className="block">
        <span className="font-bold text-sm">{tr('Texte du cours, notes, vocabulaire', '수업 내용, 메모, 단어')}</span>
        <textarea className="input mt-1 min-h-[220px] font-body" value={text} onChange={(e) => setText(e.target.value)}
          placeholder={tr('Collez ici le cours de votre professeur…\n\nAstuce vocabulaire : une paire par ligne\nla grève : 파업\nun enjeu = 쟁점', '선생님 수업 내용을 여기에 붙여 넣으세요…\n\n단어 팁: 한 줄에 한 쌍씩\nla grève : 파업\nun enjeu = 쟁점')} />
      </label>
      <p className="text-xs text-muted">{tr('Pour que le vocabulaire soit reconnu : un mot par ligne, suivi de « : », « = », « - » ou directement de la traduction en coréen.', '단어를 인식시키려면: 한 줄에 단어 하나, 그 뒤에 « : », « = », « - » 또는 바로 한국어 뜻을 쓰세요.')}</p>
      {err && <p style={{ color: 'var(--bad)' }}>{err}</p>}
      <div className="flex gap-2">
        <button className="btn btn-primary">{tr('Enregistrer le cours', '수업 저장')}</button>
        {onCancel && <button type="button" className="btn" onClick={onCancel}>{tr('Annuler', '취소')}</button>}
      </div>
    </form>
  )
}

function CourseView({ course, onBack, onDelete, onSave }) {
  const { state, update } = useProgress()
  const { tr } = useLang()
  const [mode, setMode] = useState(null) // null | 'exos' | 'cartes' | 'ia' | 'edit'
  const [run, setRun] = useState(0)
  const [ai, setAi] = useState({ busy: false, err: '', questions: null })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const gen = useMemo(() => generateFromCourse(course.text, { max: 15 }), [course.text, run])
  const cards = gen.cards.map((c) => ({ ...c, key: `cours:${course.id}:${c.front}` }))

  const saveBest = (s, t) => {
    const pct = Math.round((s / t) * 100)
    update((st) => ({ ...st, courses: st.courses.map((c) => (c.id === course.id ? { ...c, best: Math.max(c.best || 0, pct) } : c)) }))
  }

  const runAI = async () => {
    setMode('ia'); setAi({ busy: true, err: '', questions: null })
    try {
      const res = await aiCourseExercises(state.settings, course.text, 10)
      const list = (Array.isArray(res) ? res : res.exercices || res.questions || [])
        .filter((q) => Array.isArray(q.options) && q.options.length >= 2 && Number.isInteger(q.answer) && q.answer < q.options.length)
        .map((q, i) => ({ ...q, type: 'qcm', kind: 'IA · cours', id: `ia:${course.id}:${i}:${q.prompt.slice(0, 40)}` }))
      if (!list.length) throw new Error(tr('Aucun exercice valide reçu — réessayez.', '올바른 문제를 받지 못했습니다. 다시 시도하세요.'))
      setAi({ busy: false, err: '', questions: list })
    } catch (e) { setAi({ busy: false, err: e.message, questions: null }) }
  }

  if (mode === 'edit') return <CourseForm initial={course} onSave={(c) => { onSave(c); setMode(null) }} onCancel={() => setMode(null)} />

  return (
    <div>
      <button className="text-sm underline text-muted" onClick={mode ? () => setMode(null) : onBack}>← {mode ? tr('Retour au cours', '수업으로 돌아가기') : tr('Tous mes cours', '내 수업 전체')}</button>
      <h1 className="h-display text-3xl font-extrabold mt-2">{course.title}</h1>
      <p className="text-sm text-muted">{course.date} · {tr(`${gen.info.pairs} mots de vocabulaire · ${gen.info.sentences} phrases`, `단어 ${gen.info.pairs}개 · 문장 ${gen.info.sentences}개`)}</p>

      {!mode && (
        <>
          <div className="grid gap-3 sm:grid-cols-3 mt-4">
            <button className="card text-left hover:opacity-90" onClick={() => { setRun((r) => r + 1); setMode('exos') }} disabled={!gen.questions.length}>
              <span className="text-2xl">✏️</span><span className="block font-bold">{tr('Exercices du cours', '수업 연습 문제')}</span>
              <span className="block text-sm text-muted">{gen.questions.length ? tr(`${gen.questions.length} exercices (hors ligne, sans IA)`, `문제 ${gen.questions.length}개 (오프라인, AI 없이)`) : tr('Cours trop court pour générer des exercices', '내용이 짧아 문제를 만들 수 없습니다')}</span>
            </button>
            <button className="card text-left hover:opacity-90" onClick={() => setMode('cartes')} disabled={!cards.length}>
              <span className="text-2xl">🃏</span><span className="block font-bold">{tr('Cartes mémoire', '단어 카드')}</span>
              <span className="block text-sm text-muted">{cards.length ? tr(`${cards.length} cartes de vocabulaire`, `단어 카드 ${cards.length}장`) : tr('Aucune paire de vocabulaire repérée', '단어 쌍을 찾지 못했습니다')}</span>
            </button>
            {state.settings.aiKey ? (
              <button className="card text-left hover:opacity-90" onClick={runAI}>
                <span className="text-2xl">🤖</span><span className="block font-bold">{tr('Exercices avancés (IA)', '심화 문제 (AI)')}</span>
                <span className="block text-sm text-muted">{tr('Grammaire et compréhension tirées du cours', '수업에서 뽑은 문법·독해 문제')}</span>
              </button>
            ) : state.adminMode && (
              <Link to="/profil" className="card text-left hover:opacity-90">
                <span className="text-2xl">🤖</span><span className="block font-bold">{tr('Exercices avancés (IA)', '심화 문제 (AI)')}</span>
                <span className="block text-sm text-muted">{tr('Facultatif : ajoutez une clé gratuite dans Profil', '선택 사항: 프로필에서 무료 키를 추가하세요')}</span>
              </Link>
            )}
          </div>
          <section className="card mt-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold">{tr('Le cours', '수업 내용')}</h2>
              <span className="text-xs text-muted">{tr('Touchez un mot pour le traduire', '단어를 누르면 번역됩니다')}</span>
            </div>
            <div className="max-h-[60vh] overflow-y-auto leading-relaxed">
              {course.text.split('\n').map((line, i) => line.trim() ? <ClickableText key={i} text={line} className="mb-1" /> : <div key={i} className="h-2" />)}
            </div>
          </section>
          <div className="flex gap-2 mt-4">
            <button className="btn" onClick={() => setMode('edit')}>✎ {tr('Modifier / compléter', '수정 / 보완')}</button>
            <button className="btn" style={{ color: 'var(--bad)' }} onClick={onDelete}>🗑 {tr('Supprimer', '삭제')}</button>
          </div>
        </>
      )}

      {mode === 'exos' && (
        <div className="mt-4">
          <QuizRunner key={run} questions={gen.questions} source={`Cours : ${course.title}`} xpPerGood={6} title="cours du prof" onFinish={saveBest} onExit={() => setMode(null)} />
        </div>
      )}
      {mode === 'cartes' && <div className="mt-4"><Flashcards cards={cards} deckName={course.title} onExit={() => setMode(null)} /></div>}
      {mode === 'ia' && (
        <div className="mt-4">
          {ai.busy && <p className="card text-center py-8">🤖 {tr('Création des exercices à partir de votre cours…', '수업 내용으로 문제를 만드는 중…')}</p>}
          {ai.err && <p className="card" style={{ color: 'var(--bad)' }}>{ai.err}</p>}
          {ai.questions && <QuizRunner questions={ai.questions} source={`Cours (IA) : ${course.title}`} xpPerGood={8} title="cours du prof" onFinish={saveBest} onExit={() => setMode(null)} />}
        </div>
      )}
    </div>
  )
}
