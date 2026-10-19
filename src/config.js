/**
 * CONFIGURATION À REMPLIR AVANT LE DÉPLOIEMENT (facultatif).
 *
 * Dictionnaire officiel coréen KRDict (한국어기초사전, 국립국어원) :
 * on réutilise la fonction Supabase « krdict-lookup » déjà déployée pour l'outil
 * de coréen. Elle traduit un mot COREEN vers le FRANÇAIS, en distinguant les
 * homonymes. Si ces deux champs restent vides, le dictionnaire fonctionne quand
 * même (fiches intégrées, IA facultative, MyMemory).
 *
 *  krdictUrl : Supabase › Edge Functions › krdict-lookup › URL
 *              (ex. https://abcdefgh.supabase.co/functions/v1/krdict-lookup)
 *  krdictKey : Supabase › Project Settings › API › clé « anon public »
 *              (clé publique, prévue pour être visible dans une page web)
 *
 * Ces valeurs peuvent aussi être saisies dans l'application (Profil › Dictionnaire).
 */
export const CONFIG = {
  krdictUrl: '',
  krdictKey: ''
}
