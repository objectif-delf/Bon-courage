/**
 * Recherche dans le dictionnaire, par ordre de fiabilité :
 *   1. Dictionnaire intégré (src/data/dictionary.js) — fiches relues : ✅ « Vérifié ».
 *   2. IA Gemini (si l'étudiant a ajouté sa clé gratuite) — fiche complète : « IA — à vérifier ».
 *   3. MyMemory (gratuit, sans inscription) — traduction automatique seule : « Automatique — à vérifier ».
 * Un lien vers le dictionnaire français-coréen de Naver permet toujours de vérifier.
 *
 * Aucune traduction automatique n'est « d'une précision absolue » : c'est pour cela
 * que la source de chaque fiche est toujours affichée.
 */
import { DICTIONARY } from '../data/dictionary'
import { isHangul, norm } from './text'
import { aiDictionaryEntry } from './ai'
import { CONFIG } from '../config'

const cache = new Map()

// Index : formes françaises (sans article) et coréennes.
const stripArticle = (s) => norm(s).replace(/^(le |la |les |l'|l |un |une |se |s')/, '')
const index = DICTIONARY.map((e) => ({
  e,
  fr: [stripArticle(e.fr), ...(e.forms || []).map(norm)],
  ko: [...e.ko.split(/[,;]/), ...(e.koAlt || [])]
    .map((k) => k.replace(/\(.*?\)/g, '').replace(/[~\s]/g, ''))
    .filter(Boolean)
}))

/** Renvoie { entries, exact } — exact = au moins une fiche correspond exactement. */
export function searchLocalFull(query, limit = 8) {
  const q = query.trim()
  if (!q) return { entries: [], exact: false }
  if (isHangul(q)) {
    const k = q.replace(/\s/g, '')
    const exact = index.filter((x) => x.ko.some((v) => v === k))
    const partial = index.filter((x) => !exact.includes(x) && x.ko.some((v) => v.includes(k) || (v.length > 1 && k.includes(v))))
    return { entries: [...exact, ...partial].slice(0, limit).map((x) => x.e), exact: exact.length > 0 }
  }
  const n = stripArticle(q)
  const exact = index.filter((x) => x.fr.includes(n))
  const starts = index.filter((x) => !exact.includes(x) && x.fr.some((f) => f.startsWith(n)))
  const contains = n.length > 2 ? index.filter((x) => !exact.includes(x) && !starts.includes(x) && x.fr.some((f) => f.includes(n))) : []
  return { entries: [...exact, ...starts, ...contains].slice(0, limit).map((x) => x.e), exact: exact.length > 0 }
}

export const searchLocal = (query, limit) => searchLocalFull(query, limit).entries

/** Traduction automatique MyMemory (gratuite : environ 5 000 caractères/jour,
 *  50 000 avec une adresse e-mail dans Profil). Renvoie plusieurs propositions. */
export async function myMemory(query, email) {
  const ko = isHangul(query)
  const pair = ko ? 'ko|fr' : 'fr|ko'
  const params = new URLSearchParams({ q: query.slice(0, 450), langpair: pair })
  if (email) params.set('de', email)
  const res = await fetch(`https://api.mymemory.translated.net/get?${params}`)
  if (!res.ok) throw new Error('Service de traduction indisponible')
  const data = await res.json()
  if (data.responseStatus && Number(data.responseStatus) !== 200) throw new Error(data.responseDetails || 'Quota dépassé')
  const main = data.responseData?.translatedText
  const others = (data.matches || [])
    .map((m) => m.translation)
    .filter((t) => t && t !== main && !/MYMEMORY/i.test(t))
  const uniq = [...new Set([main, ...others].filter(Boolean).map((t) => t.trim()))].slice(0, 4)
  return { query, direction: ko ? 'ko→fr' : 'fr→ko', proposals: uniq }
}

/** KRDict (dictionnaire officiel coréen → français) via la fonction Supabase « krdict-lookup ».
 *  Renvoie null si non configuré, sinon la liste des sens [{ word, grade, pos, definition, translation }]. */
export const krdictConfigured = (settings) => Boolean(settings?.krdictUrl || CONFIG.krdictUrl)

export async function krdict(word, settings) {
  const url = settings?.krdictUrl || CONFIG.krdictUrl
  const key = settings?.krdictKey || CONFIG.krdictKey
  if (!url) return null
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(key ? { Authorization: `Bearer ${key}`, apikey: key } : {}) },
    body: JSON.stringify({ word })
  })
  if (!res.ok) throw new Error(`KRDict : erreur ${res.status}`)
  const data = await res.json()
  if (!data.configured) return null
  if (data.error) throw new Error('KRDict : ' + data.error)
  const clean = word.replace(/\s/g, '')
  return (data.senses || []).filter((s) => !s.word || s.word.replace(/[\d\s^-]/g, '') === clean)
}

export const naverLink = (q) => `https://dict.naver.com/frkodict/#/search?query=${encodeURIComponent(q)}`

/** Recherche complète. Renvoie { source, entries?, ai?, machine?, error? } */
export async function lookup(query, settings) {
  const q = query.trim()
  if (!q) return { source: 'vide' }
  const { entries: local, exact } = searchLocalFull(q)
  if (exact) return { source: 'local', entries: local }

  const ck = q.toLowerCase()
  if (cache.has(ck)) return cache.get(ck)

  let result
  // Mot coréen : d'abord le dictionnaire officiel KRDict (si configuré)
  if (isHangul(q) && krdictConfigured(settings)) {
    try {
      const senses = await krdict(q, settings)
      if (senses?.length) {
        // Fiches intégrées correspondant aux traductions françaises trouvées
        const linked = senses.flatMap((s) => searchLocalFull(s.translation, 2).exact ? searchLocal(s.translation, 1) : [])
        const entries = [...local, ...linked.filter((e) => !local.includes(e))]
        result = { source: 'krdict', senses, entries }
        cache.set(ck, result)
        return result
      }
    } catch (err) {
      result = { krdictError: err.message }
    }
  }
  if (settings?.aiKey) {
    try {
      const ai = await aiDictionaryEntry(settings, q)
      if (!ai.erreur) result = { source: 'ia', ai, entries: local }
    } catch (err) {
      result = { source: 'erreur-ia', error: err.message, krdictError: result?.krdictError }
    }
  }
  if (!result?.source || result.source === 'erreur-ia') {
    const prev = result || {}
    try {
      const machine = await myMemory(q, settings?.mmEmail)
      result = { source: 'auto', machine, entries: local, aiError: prev.error, krdictError: prev.krdictError }
    } catch (err) {
      result = { source: local.length ? 'local' : 'erreur', entries: local, error: err.message }
    }
  }
  cache.set(ck, result)
  return result
}
