// Petits outils de traitement de texte, partagés par le dictionnaire,
// la correction des réponses et le générateur d'exercices.

/** Minuscules, sans accents ni ponctuation superflue — pour comparer des réponses. */
export function norm(s = '') {
  return String(s)
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[’`]/g, "'")
    .replace(/[.,;:!?«»"()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Compare une réponse tapée à une ou plusieurs réponses acceptées.
 *  strictAccents=false : un accent oublié est accepté mais signalé. */
export function checkTyped(input, accepted) {
  const list = Array.isArray(accepted) ? accepted : [accepted]
  const raw = String(input).trim().toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, ' ').replace(/[.!?]$/, '')
  const exact = list.some((a) => String(a).toLowerCase().replace(/[’`]/g, "'").replace(/[.!?]$/, '') === raw)
  if (exact) return { ok: true, accentWarning: false }
  const loose = list.some((a) => norm(a) === norm(input))
  return { ok: loose, accentWarning: loose }
}

export const isHangul = (s) => /[가-힣ㄱ-ㆎ]/.test(s)

/** Découpe un texte en phrases. */
export function sentences(text) {
  return text
    .replace(/\r/g, '')
    .split(/(?<=[.!?…])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

/** Découpe en jetons (mots + ponctuation + espaces) pour rendre les mots cliquables. */
export function tokens(text) {
  return text.match(/[A-Za-zÀ-ÖØ-öø-ÿŒœÆæ]+(?:['’-][A-Za-zÀ-ÖØ-öø-ÿŒœÆæ]+)*|[가-힣]+|\s+|[^\sA-Za-zÀ-ÖØ-öø-ÿŒœÆæ가-힣]+/g) || []
}

export const isWord = (t) => /[A-Za-zÀ-ÿŒœ가-힣]/.test(t)

/** Mots grammaticaux français à ignorer quand on cherche des mots-clés. */
export const STOPWORDS = new Set(`le la les l un une des du de d au aux et ou mais donc or ni car que qu qui quoi dont où ce cet cette ces se s sa son ses leur leurs mon ma mes ton ta tes notre nos votre vos je j tu il elle on nous vous ils elles me m te t lui y en ne n pas plus moins très trop aussi bien tout tous toute toutes être est sont était été avoir a ont avait eu fait faire dans sur sous avec sans pour par entre vers chez comme si quand alors ainsi cela ça c ceci celui celle ceux celles même autre autres peu beaucoup encore déjà toujours jamais rien personne chaque quel quelle quels quelles lorsque puis après avant pendant depuis selon parce car été sera seront serait pourrait doit peut peuvent faut va vont`.split(/\s+/))

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const pick = (arr, n) => shuffle(arr).slice(0, n)

export const wordCount = (t) => (t.trim().match(/[^\s]+/g) || []).length
