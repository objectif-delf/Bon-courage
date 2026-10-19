// Badges à débloquer. `test(state)` reçoit toute la progression et renvoie true
// quand le badge est gagné. Pour en ajouter un : copier une ligne.
export const BADGES = [
  { id: 'premier-pas', icon: '👣', label: 'Premier pas', ko: '첫걸음', desc: 'Terminer une première leçon (cours + vérification).', descKo: '첫 번째 수업(강의 + 이해 확인)을 마치세요.', test: (s) => doneLessons(s) >= 1 },
  { id: 'assidu', icon: '📚', label: 'Étudiant assidu', ko: '성실한 학생', desc: 'Terminer 5 leçons.', descKo: '수업 5개를 마치세요.', test: (s) => doneLessons(s) >= 5 },
  { id: 'sans-faute', icon: '🎯', label: 'Sans faute', ko: '만점', desc: 'Réussir une vérification de leçon à 100 %.', descKo: '수업 이해 확인에서 100%를 받으세요.', test: (s) => Object.values(s.lessons).some((l) => l.bestCheck === 100) },
  { id: 'cent-reponses', icon: '💯', label: '100 réponses', ko: '100문제', desc: 'Répondre à 100 questions.', descKo: '문제 100개에 답하세요.', test: (s) => s.stats.answered >= 100 },
  { id: 'regulier-3', icon: '🔥', label: '3 jours de suite', ko: '3일 연속', desc: 'Travailler 3 jours d\'affilée.', descKo: '3일 연속 공부하세요.', test: (s) => s.streak.count >= 3 },
  { id: 'regulier-7', icon: '🗓️', label: 'Une semaine entière', ko: '일주일 연속', desc: 'Travailler 7 jours d\'affilée.', descKo: '7일 연속 공부하세요.', test: (s) => s.streak.count >= 7 },
  { id: 'mon-prof', icon: '🧑‍🏫', label: 'Cours importé', ko: '수업 가져오기', desc: 'Importer un premier cours de votre professeur.', descKo: '선생님 수업을 처음으로 가져오세요.', test: (s) => s.courses.length >= 1 },
  { id: 'dico', icon: '🔎', label: 'Curieux', ko: '호기심', desc: 'Chercher 20 mots dans le dictionnaire.', descKo: '사전에서 단어 20개를 찾아보세요.', test: (s) => s.stats.lookups >= 20 },
  { id: 'memoire', icon: '🃏', label: 'Mémoire d\'éléphant', ko: '기억력', desc: 'Réviser 50 cartes mémoire.', descKo: '단어 카드 50장을 복습하세요.', test: (s) => s.stats.flashReviewed >= 50 },
  { id: 'eclair', icon: '⚡', label: 'Éclair', ko: '번개', desc: 'Obtenir 12 bonnes réponses au quiz de rapidité.', descKo: '스피드 퀴즈에서 12개를 맞히세요.', test: (s) => s.stats.bestSpeed >= 12 },
  { id: 'examen', icon: '📝', label: 'Premier examen blanc', ko: '첫 모의고사', desc: 'Terminer un examen blanc.', descKo: '모의고사를 하나 끝내세요.', test: (s) => s.exams.length >= 1 },
  { id: 'reussite-b2', icon: '🏆', label: 'Examen réussi', ko: '모의고사 합격', desc: 'Obtenir au moins 50/100 à un examen blanc, sans note éliminatoire.', descKo: '모의고사에서 과락 없이 50/100 이상을 받으세요.', test: (s) => s.exams.some((e) => e.passed) },
  { id: 'erreurs', icon: '🩹', label: 'Je corrige mes erreurs', ko: '오답 극복', desc: 'Corriger 10 erreurs dans « Revoir mes erreurs ».', descKo: '« 오답 노트 »에서 틀린 문제 10개를 고치세요.', test: (s) => s.stats.mistakesFixed >= 10 }
]

function doneLessons(s) {
  return Object.values(s.lessons).filter((l) => l.checkPassed).length
}
