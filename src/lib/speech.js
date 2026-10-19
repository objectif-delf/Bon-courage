// Synthèse vocale du navigateur (gratuite, hors ligne sur la plupart des appareils).
// Sert à écouter les mots du dictionnaire et les documents audio de l'examen blanc.

let voicesCache = []
function loadVoices() {
  if (!('speechSynthesis' in window)) return []
  voicesCache = window.speechSynthesis.getVoices()
  return voicesCache
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window

export function hasVoice(lang) {
  const v = voicesCache.length ? voicesCache : loadVoices()
  return v.some((x) => x.lang?.toLowerCase().startsWith(lang.slice(0, 2)))
}

/** Lit un texte. lang : 'fr-FR' ou 'ko-KR'. Renvoie une promesse résolue à la fin. */
export function speak(text, lang = 'fr-FR', rate = 0.95) {
  return new Promise((resolve) => {
    if (!canSpeak()) return resolve(false)
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang
    u.rate = rate
    const voices = voicesCache.length ? voicesCache : loadVoices()
    const voice = voices.find((v) => v.lang === lang) || voices.find((v) => v.lang?.startsWith(lang.slice(0, 2)))
    if (voice) u.voice = voice
    u.onend = () => resolve(true)
    u.onerror = () => resolve(false)
    window.speechSynthesis.speak(u)
  })
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel()
}
