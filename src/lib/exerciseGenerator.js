/**
 * GÉNÉRATEUR D'EXERCICES À PARTIR D'UN COURS DU PROFESSEUR — sans IA, 100 % gratuit,
 * fonctionne hors ligne. Tout est tiré exclusivement du texte importé :
 *
 *  1. Paires de vocabulaire : lignes « mot : traduction », « mot = traduction »,
 *     « mot - traduction », tabulations, ou mélange français/coréen sur une même
 *     ligne (ex. « la grève 파업 ») → cartes mémoire + QCM de sens + saisie.
 *  2. Textes à trous : un mot-clé du cours est retiré d'une phrase du cours ;
 *     les leurres sont d'autres mots-clés du même cours.
 *  3. Phrases à remettre dans l'ordre : phrases courtes du cours mélangées.
 *
 * Pour des exercices plus fins (règles, compréhension), l'IA optionnelle prend le relais.
 */
import { isHangul, sentences, shuffle, STOPWORDS, pick } from './text'

const SEPS = [/\s*\t+\s*/, /\s+[:=→]\s+|\s*[:=→]\s+/, /\s+[–—-]\s+/]
const ARTICLE = /^(?:(?:le|la|les|un|une|des)\s+|l['’])/i

export function extractPairs(text) {
  const pairs = []
  const seen = new Set()
  for (let line of text.split(/\n/)) {
    line = line.replace(/^\s*([-•*·]|\d+[.)])\s*/, '').trim()
    if (!line || line.length > 140) continue
    let a, b
    for (const [n, sep] of SEPS.entries()) {
      const parts = line.split(sep)
      if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) continue
      const [x, y] = parts.map((p) => p.trim())
      // Paire français/français (définition) : seulement avec « : », « = » ou tabulation,
      // et pas pour un titre (« Leçon du 14 octobre — … ») ni une phrase.
      if (!isHangul(x) && !isHangul(y)) {
        if (n === 2 || /\d/.test(x) || x.split(/\s+/).length > 4 || /[.!?]$/.test(y)) continue
      }
      ;[a, b] = [x, y]
      break
    }
    if (!a && isHangul(line) && /[A-Za-zÀ-ÿ]/.test(line)) {
      // « la grève 파업 » ou « 파업 la grève » : coupure à la frontière des alphabets
      const m = line.match(/^([^가-힣]+?)\s*([가-힣][가-힣\s~·.,()]*)$/) ||
        line.match(/^([가-힣][가-힣\s~·.,()]*?)\s+([^가-힣]+)$/)
      if (m) [a, b] = [m[1].trim(), m[2].trim()]
    }
    if (!a || !b) continue
    if (a.split(/\s+/).length > 6 || b.split(/\s+/).length > 10) continue
    // Le côté français en premier
    let fr = a, other = b
    if (isHangul(a) && !isHangul(b)) { fr = b; other = a }
    if (isHangul(fr)) continue
    const k = fr.toLowerCase()
    if (seen.has(k)) continue
    seen.add(k)
    pairs.push({ fr, ko: other, isKo: isHangul(other) })
  }
  return pairs
}

function keywords(text) {
  const freq = new Map()
  for (const s of sentences(text)) {
    const words = s.match(/[A-Za-zÀ-ÖØ-öø-ÿœŒ]+(?:-[A-Za-zÀ-ÿ]+)*/g) || []
    words.forEach((w, i) => {
      const lw = w.toLowerCase()
      if (lw.length < 4 || STOPWORDS.has(lw)) return
      if (i > 0 && /^[A-ZÀ-Ý]/.test(w)) return // nom propre probable
      freq.set(lw, (freq.get(lw) || 0) + 1)
    })
  }
  return [...freq.entries()].sort((x, y) => y[1] - x[1]).map(([w]) => w)
}

const ending = (w) => w.slice(-3)

/** Phrases « propres » du cours : sans étiquette (« Grammaire : … ») et terminées par un point. */
function courseSentences(text) {
  return sentences(text)
    .map((s) => s.replace(/^[^:«»]{1,30}:\s+/, (m) => (m.split(/\s+/).length <= 4 ? '' : m)))
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .filter((s) => !isHangul(s) && /[.!?…]$/.test(s))
}

function clozeQuestions(text, kw, max) {
  const out = []
  const kwSet = new Set(kw.slice(0, 80))
  const sents = shuffle(courseSentences(text))
  for (const s of sents) {
    if (out.length >= max) break
    const words = s.split(/\s+/)
    if (words.length < 5 || words.length > 28) continue
    const candidates = (s.match(/[A-Za-zÀ-ÖØ-öø-ÿœŒ]+/g) || []).filter((w) => kwSet.has(w.toLowerCase()))
    if (!candidates.length) continue
    const target = candidates.sort((x, y) => y.length - x.length)[0]
    const inSentence = new Set(s.toLowerCase().split(/[^a-zà-ÿœ]+/))
    const pool = kw.filter((w) => w !== target.toLowerCase() && !inSentence.has(w) && Math.abs(w.length - target.length) <= 4)
    const similar = pool.filter((w) => ending(w) === ending(target.toLowerCase()))
    const distract = [...pick(similar, 2), ...pick(pool.filter((w) => !similar.includes(w)), 3)].slice(0, 3)
    if (distract.length < 3) continue
    const keepCase = (w) => (/^[A-ZÀ-Ý]/.test(target) ? w[0].toUpperCase() + w.slice(1) : w)
    const options = shuffle([target, ...distract.map(keepCase)])
    out.push({
      type: 'qcm',
      kind: 'Texte à trous',
      prompt: 'Complétez la phrase du cours :',
      promptKo: '수업에 나온 문장을 완성하세요',
      sentence: s.replace(new RegExp(`(^|[^A-Za-zÀ-ÿ])${target}(?=[^A-Za-zÀ-ÿ]|$)`), '$1_____'),
      options,
      answer: options.indexOf(target),
      explanation: `Phrase du cours : « ${s} »`
    })
  }
  return out
}

function orderQuestions(text, max) {
  return shuffle(courseSentences(text).filter((s) => {
    const n = s.split(/\s+/).length
    return n >= 4 && n <= 11 && !/[«»:;()"\[\]]/.test(s)
  }))
    .slice(0, max)
    .map((s) => {
      const clean = s.replace(/\s+([.!?])$/, '$1')
      const words = clean.replace(/[.!?]$/, '').split(/\s+/)
      return {
        type: 'order',
        kind: 'Remettre dans l\'ordre',
        prompt: 'Remettez les mots dans l\'ordre pour retrouver la phrase du cours :',
        promptKo: '단어를 배열해서 수업에 나온 문장을 만드세요',
        words: shuffle(words),
        answer: words.join(' '),
        explanation: `Phrase du cours : « ${clean} »`
      }
    })
}

function pairQuestions(pairs, max) {
  if (pairs.length < 2) return []
  const out = []
  for (const p of shuffle(pairs)) {
    if (out.length >= max) break
    const others = pairs.filter((x) => x !== p)
    if (others.length >= 3) {
      const options = shuffle([p.ko, ...pick(others, 3).map((x) => x.ko)])
      out.push({
        type: 'qcm', kind: 'Vocabulaire', prompt: `Que signifie « ${p.fr} » ?`,
        options, answer: options.indexOf(p.ko), explanation: `${p.fr} = ${p.ko}`
      })
    }
    if (out.length < max) {
      out.push({
        type: 'input', kind: 'Vocabulaire', prompt: p.isKo ? `Comment dit-on « ${p.ko} » en français ?` : `Quel mot du cours correspond à : « ${p.ko} » ?`,
        answer: [p.fr, p.fr.replace(ARTICLE, '')], explanation: `${p.ko} → ${p.fr}`
      })
    }
  }
  return out
}

/** Point d'entrée : renvoie { questions, cards, info } */
export function generateFromCourse(text, { max = 15 } = {}) {
  const pairs = extractPairs(text)
  const kw = keywords(text)
  const fromPairs = pairQuestions(pairs, Math.ceil(max * 0.45))
  const cloze = clozeQuestions(text, kw, Math.ceil(max * 0.4))
  const order = orderQuestions(text, Math.ceil(max * 0.25))
  const questions = shuffle([...fromPairs, ...cloze, ...order]).slice(0, max)
    .map((q, i) => ({ ...q, id: undefined, uid: i }))
  return {
    questions,
    cards: pairs.map((p) => ({ front: p.fr, back: p.ko })),
    info: { pairs: pairs.length, sentences: sentences(text).length, keywords: kw.length }
  }
}
