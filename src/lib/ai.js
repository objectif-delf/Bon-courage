/**
 * IA OPTIONNELLE (Google Gemini, palier gratuit de Google AI Studio).
 *
 * L'application fonctionne entièrement SANS IA. Si l'étudiant colle sa propre
 * clé gratuite dans « Profil › IA », on l'utilise pour :
 *   - des fiches de dictionnaire complètes pour les mots absents du dictionnaire intégré ;
 *   - des exercices plus variés à partir des cours du professeur ;
 *   - un commentaire sur la production écrite de l'examen blanc.
 * La clé reste dans le navigateur de l'étudiant (jamais dans le code GitHub).
 */

const ENDPOINT = (model, key) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`

export async function askGeminiJSON({ key, model = 'gemini-2.5-flash', prompt, temperature = 0.3 }) {
  if (!key) throw new Error('Aucune clé IA configurée (Profil › IA).')
  const res = await fetch(ENDPOINT(model, key), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature, responseMimeType: 'application/json' }
    })
  })
  if (!res.ok) {
    let msg = `Erreur ${res.status}`
    try { msg += ' : ' + (await res.json()).error.message } catch { /* */ }
    if (res.status === 429) msg = 'Limite gratuite atteinte pour le moment — réessayez plus tard.'
    throw new Error(msg)
  }
  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || ''
  try {
    return JSON.parse(text.replace(/^```json\s*|```$/g, ''))
  } catch {
    throw new Error("Réponse de l'IA illisible — réessayez.")
  }
}

/** Fiche de dictionnaire FR↔KO complète. */
export function aiDictionaryEntry(settings, query) {
  return askGeminiJSON({
    key: settings.aiKey,
    model: settings.aiModel,
    prompt: `Tu es un lexicographe bilingue français-coréen très rigoureux.
Mot ou expression recherché : « ${query} » (il peut être en français ou en coréen).
Réponds UNIQUEMENT avec un objet JSON :
{"fr": "forme française de base (infinitif / masculin singulier, avec article pour un nom: le/la/l')",
 "ko": "traduction coréenne la plus courante (forme du dictionnaire)",
 "autresSens": ["autres traductions coréennes utiles, max 3"],
 "ipa": "prononciation API du mot français entre / /",
 "rom": "romanisation révisée du coréen",
 "pos": "nature grammaticale en français (nom masculin, verbe, adjectif...)",
 "exFr": "phrase d'exemple naturelle en français (niveau B1-B2)",
 "exKo": "traduction coréenne exacte de l'exemple",
 "note": "remarque utile pour un coréanophone (faux ami, registre, construction), en français, une phrase"}
Si le mot n'existe pas, renvoie {"erreur": "explication"}.`
  })
}

/** Exercices générés à partir d'un cours du professeur, strictement fondés sur ce texte. */
export function aiCourseExercises(settings, courseText, n = 10) {
  return askGeminiJSON({
    key: settings.aiKey,
    model: settings.aiModel,
    temperature: 0.5,
    prompt: `Tu es professeur de FLE et prépares des étudiants coréanophones au DELF.
Voici le cours de leur professeur, entre <cours> et </cours>. Crée ${n} exercices interactifs
fondés EXCLUSIVEMENT sur ce cours (vocabulaire, règles, exemples du cours — rien d'extérieur).
Varie : QCM de grammaire, sens d'un mot, phrase à compléter, compréhension.
Format : tableau JSON, chaque élément :
{"type":"qcm","prompt":"question en français","options":["4 propositions"],"answer":index_bonne_reponse,"explanation":"explication courte en français qui cite la règle du cours","explanationKo":"même explication en coréen"}
<cours>
${courseText.slice(0, 12000)}
</cours>`
  })
}

/** Commentaire sur une production écrite (DELF B2). */
export function aiWritingFeedback(settings, subject, text) {
  return askGeminiJSON({
    key: settings.aiKey,
    model: settings.aiModel,
    prompt: `Tu es correcteur du DELF B2. Sujet : « ${subject} »
Texte du candidat :
"""${text.slice(0, 6000)}"""
Évalue avec bienveillance et précision. Réponds en JSON :
{"note": nombre sur 25,
 "pointsForts": ["2 à 3 points"],
 "aAmeliorer": ["3 à 5 points concrets"],
 "erreurs": [{"extrait":"citation courte du texte","correction":"forme correcte","regle":"règle en une phrase"}],
 "conseilKo": "conseil principal en coréen"}`
  })
}
