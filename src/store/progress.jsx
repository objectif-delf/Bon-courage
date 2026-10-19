/**
 * Progression de l'étudiant — tout est enregistré dans le navigateur
 * (localStorage), sans compte ni serveur : l'application reste 100 % gratuite.
 * Une sauvegarde (export/import JSON) est proposée dans « Profil » pour passer
 * d'un appareil à l'autre.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { BADGES } from '../data/badges'

const KEY = 'bon-courage:progress:v1'

export const DEFAULT_STATE = {
  name: '',
  theme: 'clair',
  uiLang: 'fr', // langue de l'interface : 'fr' ou 'ko'
  targetLevel: 'A2', // niveau visé, choisi par l'étudiant (A1, A2, B1, B2, C1)
  daily: null, // date du dernier défi du jour réussi
  adminMode: false, // réglages techniques visibles (activé par le lien ?reglages=1)
  showKo: true, // afficher les aides en coréen
  xp: 0,
  streak: { count: 0, last: null },
  badges: [],
  lessons: {}, // { [lessonId]: { checkPassed, bestCheck, practice: { facile, moyen, difficile } } }
  tests: [], // { level, skill, score, total, date }
  exams: [], // { date, scores: {co,ce,pe,po}, total, passed, mode }
  courses: [], // cours importés du professeur
  mistakes: [], // { key, q, source, date }
  flash: {}, // { [cardKey]: { box, due } } — répétition espacée (boîtes de Leitner)
  stats: { answered: 0, correct: 0, lookups: 0, flashReviewed: 0, bestSpeed: 0, mistakesFixed: 0 },
  settings: { aiKey: '', aiModel: 'gemini-2.5-flash', mmEmail: '', krdictUrl: '', krdictKey: '' }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT_STATE
    const s = JSON.parse(raw)
    return { ...DEFAULT_STATE, ...s, stats: { ...DEFAULT_STATE.stats, ...s.stats }, settings: { ...DEFAULT_STATE.settings, ...s.settings } }
  } catch {
    return DEFAULT_STATE
  }
}

function save(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* stockage plein ou bloqué */ }
}

const today = () => new Date().toISOString().slice(0, 10)

function touchStreak(streak) {
  const t = today()
  if (streak.last === t) return streak
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10)
  return { count: streak.last === y ? streak.count + 1 : 1, last: t }
}

/** Niveau d'étudiant à partir des points : seuils de plus en plus espacés. */
export function levelFromXp(xp) {
  const level = Math.floor(Math.sqrt(xp / 60)) + 1
  const start = 60 * (level - 1) ** 2
  const next = 60 * level ** 2
  return { level, pct: Math.round(((xp - start) / (next - start)) * 100), toNext: next - xp }
}

/** Clé stable d'une question (pour la liste d'erreurs). */
export const qKey = (q) => q.id || (q.prompt + '|' + JSON.stringify(q.answer)).slice(0, 160)

const Ctx = createContext(null)

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load)
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  useEffect(() => save(state), [state])

  const pushToast = useCallback((t) => {
    const id = ++toastId.current
    setToasts((x) => [...x.slice(-2), { id, ...t }])
    setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), 2600)
  }, [])

  /** Mise à jour + vérification automatique des badges. */
  const update = useCallback((fn) => {
    setState((prev) => {
      let next = fn(prev)
      next = { ...next, streak: touchStreak(next.streak) }
      const newly = BADGES.filter((b) => !next.badges.includes(b.id) && b.test(next))
      if (newly.length) {
        next = { ...next, badges: [...next.badges, ...newly.map((b) => b.id)] }
        setTimeout(() => newly.forEach((b) => pushToast({ kind: 'badge', badge: b })), 0)
      }
      return next
    })
  }, [pushToast])

  const api = useMemo(() => ({
    state,
    toasts,
    update,
    pushToast,
    addXP(n, reason) {
      if (!n) return
      update((s) => ({ ...s, xp: s.xp + n }))
      pushToast({ kind: 'xp', n, reason })
    },
    /** À appeler pour chaque réponse : statistiques + liste « Revoir mes erreurs ». */
    recordAnswer(q, correct, source = 'exercice') {
      update((s) => {
        const key = qKey(q)
        const had = s.mistakes.some((m) => m.key === key)
        let mistakes = s.mistakes
        let fixed = s.stats.mistakesFixed
        if (!correct && !had) mistakes = [{ key, q, source, date: today() }, ...mistakes].slice(0, 300)
        if (correct && had) { mistakes = mistakes.filter((m) => m.key !== key); fixed += 1 }
        return {
          ...s,
          mistakes,
          stats: { ...s.stats, answered: s.stats.answered + 1, correct: s.stats.correct + (correct ? 1 : 0), mistakesFixed: fixed }
        }
      })
    },
    bumpStat(name, by = 1) {
      update((s) => ({ ...s, stats: { ...s.stats, [name]: (s.stats[name] || 0) + by } }))
    },
    setLesson(id, patch) {
      update((s) => {
        const cur = s.lessons[id] || { checkPassed: false, bestCheck: 0, practice: {} }
        const next = typeof patch === 'function' ? patch(cur) : { ...cur, ...patch }
        return { ...s, lessons: { ...s.lessons, [id]: next } }
      })
    },
    setSetting(name, value) {
      update((s) => ({ ...s, settings: { ...s.settings, [name]: value } }))
    },
    set(name, value) {
      update((s) => ({ ...s, [name]: value }))
    },
    exportData() {
      return JSON.stringify({ app: 'bon-courage', version: 1, exported: new Date().toISOString(), state: { ...state, adminMode: false, settings: { ...state.settings, aiKey: '' } } }, null, 2)
    },
    importData(text) {
      const data = JSON.parse(text)
      if (data.app !== 'bon-courage' || !data.state) throw new Error('Fichier non reconnu')
      setState({ ...DEFAULT_STATE, ...data.state, adminMode: state.adminMode, settings: { ...DEFAULT_STATE.settings, ...data.state.settings, aiKey: state.settings.aiKey } })
    },
    reset() {
      setState({ ...DEFAULT_STATE, theme: state.theme, uiLang: state.uiLang, adminMode: state.adminMode, settings: state.settings })
    }
  }), [state, toasts, update, pushToast])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export const useProgress = () => useContext(Ctx)
