/**
 * Langue de l'interface : français ou coréen (bouton « FR / 한 » en haut de l'écran).
 * Utilisation dans un composant :
 *   const { tr, lang } = useLang()
 *   tr('Leçons', '수업')   → renvoie le texte dans la langue choisie
 * Le contenu à apprendre (exemples, textes d'examen) reste en français.
 */
import { useEffect } from 'react'
import { useProgress } from '../store/progress'

export function useLang() {
  const { state, set } = useProgress()
  const lang = state.uiLang === 'ko' ? 'ko' : 'fr'
  const tr = (fr, ko) => (lang === 'ko' && ko ? ko : fr)
  return { lang, tr, setLang: (l) => set('uiLang', l) }
}

export function LangSync() {
  const { lang } = useLang()
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  return null
}
