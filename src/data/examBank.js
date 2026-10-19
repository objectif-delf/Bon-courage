/**
 * BANQUE D'EXAMENS BLANCS (DELF A1 → B2, DALF C1) — contenus ORIGINAUX
 * (ce ne sont pas des sujets officiels).
 *
 * Un examen n'est pas figé : generateExam(level) pioche au hasard des documents
 * dans la banque du niveau. Chaque examen généré est donc différent.
 * Pour enrichir un niveau, ajoutez simplement un document dans la liste
 * correspondante (co = oral, ce = écrit, pe = production écrite, po = production orale).
 *
 * Chaque épreuve est notée sur 25. Réussite : 50/100 et au moins 5/25 par épreuve.
 * Les durées sont indicatives : elles peuvent varier selon les sessions officielles.
 */
import { EXAMS as B2_EXAMS, PE_GRID as B2_PE_GRID, PO_GRID as B2_PO_GRID } from './delfB2'
import { shuffle } from '../lib/text'

export const SECTIONS = [
  { id: 'co', label: 'Compréhension de l\'oral', ko: '듣기', icon: '🎧' },
  { id: 'ce', label: 'Compréhension des écrits', ko: '읽기', icon: '📰' },
  { id: 'pe', label: 'Production écrite', ko: '쓰기', icon: '✍️' },
  { id: 'po', label: 'Production orale', ko: '말하기', icon: '🎤' }
]

/** Format de chaque niveau : durées (minutes) et nombre de documents tirés. */
export const FORMATS = {
  A1: { name: 'DELF A1', co: { minutes: 20, docs: 3 }, ce: { minutes: 30, docs: 3 }, pe: { minutes: 30 }, po: { prep: 10, talk: 7 } },
  A2: { name: 'DELF A2', co: { minutes: 25, docs: 3 }, ce: { minutes: 30, docs: 3 }, pe: { minutes: 45 }, po: { prep: 10, talk: 8 } },
  B1: { name: 'DELF B1', co: { minutes: 25, docs: 2 }, ce: { minutes: 35, docs: 2 }, pe: { minutes: 45 }, po: { prep: 10, talk: 15 } },
  B2: { name: 'DELF B2', co: { minutes: 30, docs: 2 }, ce: { minutes: 60, docs: 2 }, pe: { minutes: 60 }, po: { prep: 30, talk: 20 } },
  C1: { name: 'DALF C1', co: { minutes: 40, docs: 2 }, ce: { minutes: 50, docs: 2 }, pe: { minutes: 150 }, po: { prep: 60, talk: 30 } }
}

// ───────────────────────────── Grilles d'auto-évaluation (total 25)
const PE_BASIC = [
  { id: 'consigne', label: 'Respect de la consigne et du nombre de mots', ko: '지시문과 단어 수 준수', max: 3 },
  { id: 'informer', label: 'Capacité à informer, décrire, raconter', ko: '정보 전달, 묘사, 이야기하기', max: 5 },
  { id: 'interagir', label: 'Capacité à inviter, remercier, s\'excuser, demander', ko: '초대, 감사, 사과, 요청하기', max: 4 },
  { id: 'lexique', label: 'Vocabulaire adapté et orthographe des mots', ko: '알맞은 어휘와 철자', max: 5 },
  { id: 'grammaire', label: 'Grammaire : temps, accords, phrases simples correctes', ko: '문법: 시제, 일치, 올바른 단문', max: 5 },
  { id: 'coherence', label: 'Enchaînement des idées (et, mais, parce que, puis…)', ko: '생각의 연결 (et, mais, parce que, puis…)', max: 3 }
]
const PE_B1 = [
  { id: 'consigne', label: 'Respect de la consigne et du nombre de mots', ko: '지시문과 단어 수 준수', max: 2 },
  { id: 'faits', label: 'Présenter des faits, raconter des événements', ko: '사실을 제시하고 사건을 이야기하기', max: 4 },
  { id: 'opinion', label: 'Exprimer sa pensée et donner son avis', ko: '생각과 의견 표현하기', max: 4 },
  { id: 'coherence', label: 'Cohérence : paragraphes et connecteurs', ko: '일관성: 문단과 연결어', max: 3 },
  { id: 'lexique', label: 'Étendue et maîtrise du vocabulaire', ko: '어휘의 폭과 정확성', max: 5 },
  { id: 'grammaire', label: 'Grammaire : temps du passé, accords, subordonnées', ko: '문법: 과거 시제, 일치, 종속절', max: 5 },
  { id: 'orthographe', label: 'Orthographe et ponctuation', ko: '철자와 구두점', max: 2 }
]
const PE_C1 = [
  { id: 'synthese', label: 'Synthèse : idées essentielles, fidélité, reformulation', ko: '종합: 핵심 내용, 충실성, 바꿔 쓰기', max: 6 },
  { id: 'essai', label: 'Essai : argumentation développée et nuancée', ko: '논술: 전개되고 뉘앙스 있는 논증', max: 6 },
  { id: 'coherence', label: 'Organisation et articulation du discours', ko: '글의 구성과 연결', max: 4 },
  { id: 'lexique', label: 'Richesse et précision du lexique', ko: '어휘의 풍부함과 정확성', max: 4 },
  { id: 'grammaire', label: 'Maîtrise de la morphosyntaxe et de l\'orthographe', ko: '문법과 철자의 정확성', max: 5 }
]
export const PE_GRIDS = { A1: PE_BASIC, A2: PE_BASIC, B1: PE_B1, B2: B2_PE_GRID, C1: PE_C1 }

const PO_A1 = [
  { id: 'p1', label: 'Partie 1 : se présenter, répondre aux questions', ko: '1부: 자기소개, 질문에 답하기', max: 5 },
  { id: 'p2', label: 'Partie 2 : poser des questions', ko: '2부: 질문하기', max: 4 },
  { id: 'p3', label: 'Partie 3 : dialogue simulé (acheter, demander)', ko: '3부: 상황 대화 (구매, 문의)', max: 6 },
  { id: 'lexique', label: 'Vocabulaire', ko: '어휘', max: 4 },
  { id: 'grammaire', label: 'Grammaire', ko: '문법', max: 3 },
  { id: 'prononciation', label: 'Prononciation', ko: '발음', max: 3 }
]
const PO_A2 = [
  { id: 'p1', label: 'Partie 1 : entretien dirigé', ko: '1부: 면접식 대화', max: 4 },
  { id: 'p2', label: 'Partie 2 : monologue suivi (parler 2 minutes)', ko: '2부: 혼자 말하기 (2분)', max: 5 },
  { id: 'p3', label: 'Partie 3 : exercice en interaction', ko: '3부: 상황 대화', max: 6 },
  { id: 'lexique', label: 'Vocabulaire', ko: '어휘', max: 4 },
  { id: 'grammaire', label: 'Grammaire', ko: '문법', max: 3 },
  { id: 'prononciation', label: 'Prononciation et fluidité', ko: '발음과 유창성', max: 3 }
]
const PO_B1 = [
  { id: 'p1', label: 'Partie 1 : entretien dirigé', ko: '1부: 면접식 대화', max: 4 },
  { id: 'p2', label: 'Partie 2 : exercice en interaction (jeu de rôle)', ko: '2부: 역할극', max: 6 },
  { id: 'p3', label: 'Partie 3 : expression d\'un point de vue', ko: '3부: 관점 표현', max: 6 },
  { id: 'lexique', label: 'Vocabulaire', ko: '어휘', max: 3 },
  { id: 'grammaire', label: 'Grammaire', ko: '문법', max: 3 },
  { id: 'prononciation', label: 'Prononciation et fluidité', ko: '발음과 유창성', max: 3 }
]
const PO_C1 = [
  { id: 'expose', label: 'Exposé : structure, problématique, argumentation', ko: '발표: 구성, 문제 제기, 논증', max: 7 },
  { id: 'debat', label: 'Débat : défendre, nuancer, réfuter', ko: '토론: 옹호, 뉘앙스, 반박', max: 6 },
  { id: 'lexique', label: 'Richesse et précision du lexique', ko: '어휘의 풍부함과 정확성', max: 4 },
  { id: 'grammaire', label: 'Correction grammaticale', ko: '문법적 정확성', max: 5 },
  { id: 'prononciation', label: 'Prononciation et aisance', ko: '발음과 유창성', max: 3 }
]
export const PO_GRIDS = { A1: PO_A1, A2: PO_A2, B1: PO_B1, B2: B2_PO_GRID, C1: PO_C1 }

// petit utilitaire pour écrire les QCM plus vite : q('id', 'question', [options], index bonne réponse, 'explication')
const q = (id, prompt, options, answer, explanation) => ({ id, type: 'qcm', prompt, options, answer, explanation })

// ═════════════════════════════════════════════════════════════════════ A1
const A1 = {
  co: [
    {
      title: 'Message sur un répondeur', maxPlays: 2,
      script: `Bonjour, c'est Lucie. Je suis au café de la gare. Le train de Paris a vingt minutes de retard. Rendez-vous à quinze heures trente devant la librairie. À tout à l'heure !`,
      questions: [
        q('a1co1', 'Où est Lucie ?', ['À la librairie', 'Au café de la gare', 'Dans le train', 'À Paris'], 1, 'Elle est au café de la gare.'),
        q('a1co2', 'Quel est le problème ?', ['Le train est en retard', 'Le café est fermé', 'Lucie est malade', 'Il pleut'], 0, 'Le train a vingt minutes de retard.'),
        q('a1co3', 'À quelle heure est le rendez-vous ?', ['13 h 30', '15 h 30', '15 h 20', '16 h'], 1, 'Quinze heures trente.')
      ]
    },
    {
      title: 'Annonce dans un supermarché', maxPlays: 2,
      script: `Chers clients, aujourd'hui, les fraises sont à deux euros le kilo, au rayon fruits et légumes. Le magasin ferme à vingt heures. Merci et bonnes courses !`,
      questions: [
        q('a1co4', 'Quel produit est en promotion ?', ['Les pommes', 'Les fraises', 'Le pain', 'Le fromage'], 1, 'Les fraises.'),
        q('a1co5', 'Quel est le prix ?', ['Deux euros le kilo', 'Douze euros', 'Deux euros la boîte', 'Dix euros le kilo'], 0, 'Deux euros le kilo.'),
        q('a1co6', 'À quelle heure ferme le magasin ?', ['18 h', '19 h', '20 h', '22 h'], 2, 'Vingt heures.')
      ]
    },
    {
      title: 'Une rencontre', maxPlays: 2,
      script: `— Bonjour, je m'appelle Hugo. Et toi ?
— Moi, c'est Ji-woo. Je suis coréenne. J'habite à Lyon depuis un mois.
— Tu es étudiante ?
— Oui, j'étudie le design. Et le week-end, je travaille dans un restaurant.`,
      questions: [
        q('a1co7', 'Quelle est la nationalité de Ji-woo ?', ['Japonaise', 'Chinoise', 'Coréenne', 'Française'], 2, 'Elle est coréenne.'),
        q('a1co8', 'Où habite-t-elle ?', ['À Lyon', 'À Paris', 'À Séoul', 'À Lille'], 0, 'À Lyon, depuis un mois.'),
        q('a1co9', 'Que fait-elle le week-end ?', ['Elle étudie', 'Elle travaille dans un restaurant', 'Elle fait du sport', 'Elle voyage'], 1, 'Elle travaille dans un restaurant.')
      ]
    },
    {
      title: 'La météo', maxPlays: 2,
      script: `Demain, à Rouen, il va pleuvoir le matin. L'après-midi, il fera beau avec du soleil. Il fera quinze degrés.`,
      questions: [
        q('a1co10', 'Quel temps fera-t-il le matin ?', ['Du soleil', 'De la pluie', 'De la neige', 'Du vent'], 1, 'Il va pleuvoir le matin.'),
        q('a1co11', 'Et l\'après-midi ?', ['Il va pleuvoir', 'Il fera beau', 'Il neigera', 'Il fera froid'], 1, 'Il fera beau avec du soleil.'),
        q('a1co12', 'Quelle température ?', ['5 degrés', '15 degrés', '25 degrés', '50 degrés'], 1, 'Quinze degrés.')
      ]
    }
  ],
  ce: [
    {
      title: 'Une affiche',
      text: `COURS DE CUISINE CORÉENNE !
Tous les mercredis, de 18 h à 20 h, à la Maison des associations.
Prix : 10 euros par cours.
Inscription au 06 12 34 56 78.`,
      questions: [
        q('a1ce1', 'Quel jour a lieu le cours ?', ['Le lundi', 'Le mercredi', 'Le samedi', 'Tous les jours'], 1, 'Tous les mercredis.'),
        q('a1ce2', 'Combien de temps dure le cours ?', ['1 heure', '2 heures', '3 heures', '30 minutes'], 1, 'De 18 h à 20 h.'),
        q('a1ce3', 'Comment s\'inscrire ?', ['Par téléphone', 'Par courrier', 'Sur place uniquement', 'Ce n\'est pas nécessaire'], 0, 'Inscription au 06…')
      ]
    },
    {
      title: 'Un message',
      text: `Salut Emma,
Samedi, c'est mon anniversaire ! Je fais une fête chez moi à 19 h. Apporte une boisson si tu veux.
J'habite 12 rue Victor-Hugo, au troisième étage.
Bisous,
Nina`,
      questions: [
        q('a1ce4', 'Pourquoi Nina écrit-elle ?', ['Pour inviter Emma', 'Pour s\'excuser', 'Pour demander de l\'argent', 'Pour annuler'], 0, 'Elle invite Emma à son anniversaire.'),
        q('a1ce5', 'Qu\'est-ce qu\'Emma peut apporter ?', ['Un gâteau', 'Une boisson', 'Des fleurs', 'Rien'], 1, 'Une boisson.'),
        q('a1ce6', 'À quel étage habite Nina ?', ['Au premier', 'Au deuxième', 'Au troisième', 'Au douzième'], 2, 'Au troisième étage.')
      ]
    },
    {
      title: 'Horaires d\'un musée',
      text: `MUSÉE DES BEAUX-ARTS
Ouvert tous les jours sauf le mardi, de 10 h à 18 h.
Entrée gratuite pour les moins de 26 ans.
Visite guidée : le dimanche à 15 h.`,
      questions: [
        q('a1ce7', 'Quel jour le musée est-il fermé ?', ['Le lundi', 'Le mardi', 'Le dimanche', 'Jamais'], 1, 'Fermé le mardi.'),
        q('a1ce8', 'Qui ne paie pas ?', ['Les plus de 65 ans', 'Les moins de 26 ans', 'Tout le monde', 'Les étudiants étrangers'], 1, 'Gratuit pour les moins de 26 ans.'),
        q('a1ce9', 'Quand est la visite guidée ?', ['Le samedi à 10 h', 'Le dimanche à 15 h', 'Tous les jours', 'Le mardi'], 1, 'Le dimanche à 15 h.')
      ]
    },
    {
      title: 'Un SMS',
      text: `Maman, je rentre tard ce soir : je vais au cinéma avec Paul après les cours. Je mange chez lui. Bisous. Léo`,
      questions: [
        q('a1ce10', 'Que fait Léo ce soir ?', ['Il va au cinéma', 'Il travaille', 'Il va au restaurant', 'Il reste à la maison'], 0, 'Il va au cinéma avec Paul.'),
        q('a1ce11', 'Où mange-t-il ?', ['Chez lui', 'Chez Paul', 'Au restaurant', 'À l\'école'], 1, 'Il mange chez Paul.')
      ]
    }
  ],
  pe: [
    { tasks: [
      { type: 'Formulaire', subject: 'Vous vous inscrivez à un club de sport. Écrivez vos informations : nom, prénom, nationalité, âge, adresse, sport préféré et jours où vous êtes libre.', minWords: 15 },
      { type: 'Message', subject: 'Vous écrivez à un ami pour l\'inviter au cinéma samedi. Donnez l\'heure, le lieu et le nom du film. (40 à 50 mots)', minWords: 40 }
    ] },
    { tasks: [
      { type: 'Formulaire', subject: 'Vous réservez une chambre d\'hôtel. Indiquez : nom, prénom, nationalité, adresse électronique, dates d\'arrivée et de départ, nombre de personnes.', minWords: 15 },
      { type: 'Carte postale', subject: 'Vous êtes en vacances. Écrivez une carte postale à un ami : où vous êtes, le temps qu\'il fait, vos activités. (40 à 50 mots)', minWords: 40 }
    ] },
    { tasks: [
      { type: 'Formulaire', subject: 'Vous vous inscrivez à un cours de français. Indiquez : nom, prénom, âge, profession, langues parlées, pourquoi vous apprenez le français.', minWords: 15 },
      { type: 'Message', subject: 'Vous ne pouvez pas aller au rendez-vous avec votre collègue demain. Écrivez-lui pour vous excuser, dire pourquoi et proposer un autre jour. (40 à 50 mots)', minWords: 40 }
    ] }
  ],
  po: [
    { parts: [
      { title: 'Partie 1 — Entretien dirigé (1 min)', instructions: 'Répondez à voix haute aux questions de l\'examinateur.', prompts: ['Comment vous appelez-vous ?', 'Où habitez-vous ?', 'Qu\'est-ce que vous aimez faire le week-end ?', 'Parlez-moi de votre famille.'] },
      { title: 'Partie 2 — Échange d\'informations (2 min)', instructions: 'Posez une question à l\'examinateur avec chaque mot.', prompts: ['Travail ?', 'Week-end ?', 'Animal ?', 'Sport ?', 'Cuisine ?', 'Voyage ?'] },
      { title: 'Partie 3 — Dialogue simulé (2 min)', instructions: 'Vous êtes dans une boulangerie. Achetez du pain et des gâteaux pour quatre personnes. Demandez les prix et payez.', prompts: ['Saluez la vendeuse.', 'Demandez ce que vous voulez.', 'Demandez le prix total.', 'Payez et dites au revoir.'] }
    ] },
    { parts: [
      { title: 'Partie 1 — Entretien dirigé (1 min)', instructions: 'Répondez à voix haute aux questions de l\'examinateur.', prompts: ['Quel âge avez-vous ?', 'Quelle est votre profession ?', 'Quelles langues parlez-vous ?', 'Quel est votre plat préféré ?'] },
      { title: 'Partie 2 — Échange d\'informations (2 min)', instructions: 'Posez une question à l\'examinateur avec chaque mot.', prompts: ['Ville ?', 'Musique ?', 'Enfants ?', 'Transport ?', 'Vacances ?', 'Couleur ?'] },
      { title: 'Partie 3 — Dialogue simulé (2 min)', instructions: 'Vous êtes à l\'office de tourisme. Demandez un plan de la ville, les horaires du musée et le prix d\'entrée.', prompts: ['Saluez l\'employé.', 'Demandez un plan.', 'Demandez les horaires et le prix.', 'Remerciez.'] }
    ] },
    { parts: [
      { title: 'Partie 1 — Entretien dirigé (1 min)', instructions: 'Répondez à voix haute aux questions de l\'examinateur.', prompts: ['Où êtes-vous né(e) ?', 'Avec qui habitez-vous ?', 'Qu\'est-ce que vous faites le soir ?', 'Pourquoi apprenez-vous le français ?'] },
      { title: 'Partie 2 — Échange d\'informations (2 min)', instructions: 'Posez une question à l\'examinateur avec chaque mot.', prompts: ['Anniversaire ?', 'Film ?', 'Petit-déjeuner ?', 'Maison ?', 'Livre ?', 'Frère ou sœur ?'] },
      { title: 'Partie 3 — Dialogue simulé (2 min)', instructions: 'Vous êtes dans un magasin de vêtements. Vous cherchez un pull pour l\'hiver. Demandez la taille, la couleur et le prix.', prompts: ['Saluez le vendeur.', 'Dites ce que vous cherchez.', 'Demandez une autre couleur.', 'Demandez le prix et payez.'] }
    ] }
  ]
}

// ═════════════════════════════════════════════════════════════════════ A2
const A2 = {
  co: [
    {
      title: 'Annonce à la gare', maxPlays: 2,
      script: `Mesdames et messieurs, le train TER numéro 3105 à destination du Havre partira avec un retard de quinze minutes, voie 4. Nous vous prions de nous excuser pour la gêne occasionnée.`,
      questions: [
        q('a2co1', 'Où va le train ?', ['À Rouen', 'Au Havre', 'À Paris', 'À Caen'], 1, 'À destination du Havre.'),
        q('a2co2', 'Combien de minutes de retard ?', ['5', '15', '50', '30'], 1, 'Quinze minutes.'),
        q('a2co3', 'De quelle voie part le train ?', ['Voie 3', 'Voie 4', 'Voie 5', 'Voie 14'], 1, 'Voie 4.')
      ]
    },
    {
      title: 'Message d\'un cabinet médical', maxPlays: 2,
      script: `Bonjour, ici le cabinet du docteur Martin. Votre rendez-vous de jeudi à dix heures est annulé, car le docteur est malade. Nous vous proposons vendredi à quatorze heures. Merci de nous rappeler au 02 35 12 45 78 pour confirmer.`,
      questions: [
        q('a2co4', 'Pourquoi le rendez-vous est-il annulé ?', ['Le cabinet est fermé', 'Le docteur est malade', 'Il y a une grève', 'Le patient est en retard'], 1, 'Le docteur est malade.'),
        q('a2co5', 'Quel nouveau rendez-vous propose-t-on ?', ['Jeudi à 14 h', 'Vendredi à 10 h', 'Vendredi à 14 h', 'Lundi à 14 h'], 2, 'Vendredi à quatorze heures.'),
        q('a2co6', 'Que doit faire la personne ?', ['Rappeler pour confirmer', 'Envoyer un e-mail', 'Venir jeudi', 'Rien'], 0, 'Rappeler pour confirmer.')
      ]
    },
    {
      title: 'À la radio : la fête du livre', maxPlays: 2,
      script: `Ce week-end à Rouen, c'est la fête du livre ! Plus de cent auteurs seront présents sur la place du Vieux-Marché. Samedi, des ateliers de dessin pour les enfants. Dimanche, un concert gratuit à dix-sept heures. L'entrée est libre.`,
      questions: [
        q('a2co7', 'Combien d\'auteurs seront présents ?', ['Environ dix', 'Plus de cent', 'Mille', 'Cinquante'], 1, 'Plus de cent auteurs.'),
        q('a2co8', 'Que se passe-t-il samedi ?', ['Un concert', 'Des ateliers de dessin pour les enfants', 'Un marché', 'Une course'], 1, 'Ateliers de dessin pour les enfants.'),
        q('a2co9', 'Combien coûte l\'entrée ?', ['5 euros', '17 euros', 'Elle est gratuite', 'Le prix n\'est pas donné'], 2, 'L\'entrée est libre (gratuite).')
      ]
    },
    {
      title: 'Dans un magasin', maxPlays: 2,
      script: `— Bonjour, je cherche une veste pour l'hiver.
— Quelle taille faites-vous ?
— Du 38.
— Nous avons ce modèle en bleu et en noir, à soixante-dix-neuf euros.
— Je peux l'essayer ?
— Bien sûr, les cabines sont au fond, à droite.`,
      questions: [
        q('a2co10', 'Que cherche la cliente ?', ['Une robe', 'Une veste', 'Des chaussures', 'Un pantalon'], 1, 'Une veste pour l\'hiver.'),
        q('a2co11', 'Quelles couleurs sont disponibles ?', ['Rouge et noir', 'Bleu et noir', 'Bleu et blanc', 'Gris uniquement'], 1, 'En bleu et en noir.'),
        q('a2co12', 'Combien coûte la veste ?', ['69 €', '79 €', '89 €', '97 €'], 1, 'Soixante-dix-neuf euros.')
      ]
    },
    {
      title: 'Message d\'un ami', maxPlays: 2,
      script: `Salut Inès, c'est Karim. Pour samedi, on change de programme : il va pleuvoir, donc on ne fait pas de pique-nique. On va plutôt au musée, puis au restaurant japonais. On se retrouve à onze heures devant la cathédrale. Rappelle-moi !`,
      questions: [
        q('a2co13', 'Pourquoi le programme change-t-il ?', ['Karim est malade', 'Il va pleuvoir', 'Le musée est fermé', 'Inès travaille'], 1, 'Il va pleuvoir.'),
        q('a2co14', 'Quel est le nouveau programme ?', ['Pique-nique puis cinéma', 'Musée puis restaurant japonais', 'Restaurant puis concert', 'Piscine'], 1, 'Musée puis restaurant japonais.'),
        q('a2co15', 'Où est le rendez-vous ?', ['Devant le musée', 'Devant la cathédrale', 'Au restaurant', 'À la gare'], 1, 'Devant la cathédrale à 11 h.')
      ]
    }
  ],
  ce: [
    {
      title: 'Une invitation',
      text: `Bonjour à tous,
Après trois mois de travaux, notre nouvel appartement est enfin prêt ! Nous vous invitons à la pendaison de crémaillère samedi 14 juin, à partir de 19 h. Nous préparons un buffet ; vous pouvez apporter un dessert ou une boisson.
Attention : il n'y a pas d'ascenseur et nous sommes au 5e étage !
Merci de répondre avant mercredi.
Camille et Théo`,
      questions: [
        q('a2ce1', 'Pourquoi Camille et Théo font-ils une fête ?', ['Pour un anniversaire', 'Pour fêter leur nouvel appartement', 'Pour un mariage', 'Pour un départ'], 1, 'Une pendaison de crémaillère = fête pour un nouveau logement.'),
        q('a2ce2', 'Que peuvent apporter les invités ?', ['Un cadeau', 'Un dessert ou une boisson', 'Des chaises', 'Rien'], 1, 'Un dessert ou une boisson.'),
        q('a2ce3', 'Quelle difficulté est signalée ?', ['Pas de parking', 'Pas d\'ascenseur', 'Pas de chauffage', 'Pas de toilettes'], 1, 'Il n\'y a pas d\'ascenseur (5e étage).'),
        q('a2ce4', 'Avant quand faut-il répondre ?', ['Lundi', 'Mercredi', 'Samedi', 'Le 14 juin'], 1, 'Avant mercredi.')
      ]
    },
    {
      title: 'Une annonce de location',
      text: `À LOUER À ROUEN
Studio de 25 m², meublé, à 10 minutes à pied de l'université. Cuisine équipée, douche.
Loyer : 480 € par mois, charges comprises. Libre le 1er septembre.
Animaux non acceptés.
Contactez M. Lefèvre par téléphone après 18 h.`,
      questions: [
        q('a2ce5', 'Le studio est…', ['loin de l\'université', 'proche de l\'université', 'à la campagne', 'sans cuisine'], 1, 'À 10 minutes à pied de l\'université.'),
        q('a2ce6', 'Que comprend le loyer ?', ['Les charges', 'Internet uniquement', 'Rien', 'Les repas'], 0, 'Charges comprises.'),
        q('a2ce7', 'Qui ne peut pas louer ce studio ?', ['Un étudiant', 'Une personne avec un chat', 'Un couple', 'Un étranger'], 1, 'Animaux non acceptés.'),
        q('a2ce8', 'Quand peut-on appeler M. Lefèvre ?', ['Le matin', 'À midi', 'Après 18 h', 'Le dimanche'], 2, 'Après 18 h.')
      ]
    },
    {
      title: 'Le règlement de la piscine',
      text: `PISCINE MUNICIPALE — RÈGLEMENT
Le bonnet de bain est obligatoire.
Douche obligatoire avant d'entrer dans l'eau.
Il est interdit de manger au bord du bassin.
Les enfants de moins de 10 ans doivent être accompagnés d'un adulte.
Horaires : du lundi au vendredi, 12 h – 14 h et 17 h – 21 h ; samedi et dimanche, 9 h – 18 h.`,
      questions: [
        q('a2ce9', 'Qu\'est-ce qui est obligatoire ?', ['Les lunettes', 'Le bonnet de bain', 'Les sandales', 'Un maillot noir'], 1, 'Le bonnet de bain.'),
        q('a2ce10', 'Un enfant de 8 ans peut-il venir seul ?', ['Oui', 'Non, avec un adulte', 'Oui, le week-end', 'Oui, avant 14 h'], 1, 'Moins de 10 ans : accompagné.'),
        q('a2ce11', 'Peut-on nager le mardi à 15 h ?', ['Oui', 'Non', 'Seulement les enfants', 'Seulement avec un bonnet'], 1, 'En semaine : 12 h–14 h et 17 h–21 h.')
      ]
    },
    {
      title: 'Un article : une boulangerie coréenne à Caen',
      text: `Arrivée en France il y a cinq ans pour étudier la pâtisserie, Soo-ah Kim vient d'ouvrir sa propre boulangerie dans le centre de Caen. Elle propose des croissants et des baguettes, mais aussi des pains au sésame noir et des gâteaux au thé vert. « Les clients sont curieux et reviennent souvent », explique-t-elle. La boulangerie est ouverte du mardi au dimanche, de 7 h à 19 h.`,
      questions: [
        q('a2ce12', 'Pourquoi Soo-ah est-elle venue en France ?', ['Pour travailler dans une banque', 'Pour étudier la pâtisserie', 'Pour rejoindre sa famille', 'Pour faire du tourisme'], 1, 'Pour étudier la pâtisserie.'),
        q('a2ce13', 'Qu\'est-ce qui est original dans sa boulangerie ?', ['Les baguettes', 'Les pains au sésame noir et les gâteaux au thé vert', 'Les prix', 'Les horaires'], 1, 'Sésame noir et thé vert.'),
        q('a2ce14', 'Quel jour la boulangerie est-elle fermée ?', ['Le lundi', 'Le mardi', 'Le dimanche', 'Jamais'], 0, 'Ouverte du mardi au dimanche.')
      ]
    },
    {
      title: 'Le programme d\'un centre culturel',
      text: `CENTRE CULTUREL — ACTIVITÉS DE L'AUTOMNE
Lundi : yoga (18 h).
Mardi : atelier de conversation française, niveau débutant (19 h).
Jeudi : cuisine du monde (18 h 30, 8 € par séance).
Samedi : sortie nature en forêt (départ 9 h, prévoir des chaussures de marche).
Inscription obligatoire à l'accueil.`,
      questions: [
        q('a2ce15', 'Quel jour peut-on pratiquer le français ?', ['Lundi', 'Mardi', 'Jeudi', 'Samedi'], 1, 'Mardi : atelier de conversation.'),
        q('a2ce16', 'Quelle activité est payante (prix indiqué) ?', ['Le yoga', 'La conversation', 'La cuisine du monde', 'La sortie nature'], 2, '8 € par séance.'),
        q('a2ce17', 'Que faut-il prévoir le samedi ?', ['Un maillot de bain', 'Des chaussures de marche', 'Un repas', 'Un vélo'], 1, 'Des chaussures de marche.'),
        q('a2ce18', 'Comment s\'inscrire ?', ['Sur Internet', 'À l\'accueil', 'Par courrier', 'Pas besoin'], 1, 'Inscription obligatoire à l\'accueil.')
      ]
    }
  ],
  pe: [
    { tasks: [
      { type: 'Raconter (blog)', subject: 'Vous avez passé un week-end dans une ville française. Racontez sur votre blog : où vous êtes allé(e), ce que vous avez fait et ce que vous avez aimé. (60 à 80 mots)', minWords: 60 },
      { type: 'Message à un ami', subject: 'Votre ami français vous invite à son anniversaire, mais vous ne pouvez pas venir. Écrivez-lui pour le remercier, vous excuser, expliquer pourquoi et proposer une autre sortie. (60 à 80 mots)', minWords: 60 }
    ] },
    { tasks: [
      { type: 'Raconter', subject: 'Racontez votre meilleur souvenir de vacances : où, quand, avec qui et ce que vous avez fait. (60 à 80 mots)', minWords: 60 },
      { type: 'Invitation', subject: 'Vous organisez un repas coréen chez vous. Écrivez un message à vos amis pour les inviter : date, heure, adresse et ce qu\'ils peuvent apporter. (60 à 80 mots)', minWords: 60 }
    ] },
    { tasks: [
      { type: 'Décrire', subject: 'Décrivez une journée typique de votre semaine et dites ce que vous aimez ou n\'aimez pas. (60 à 80 mots)', minWords: 60 },
      { type: 'Conseiller', subject: 'Un ami français veut visiter la Corée. Écrivez-lui pour lui conseiller une ville et expliquer pourquoi. (60 à 80 mots)', minWords: 60 }
    ] },
    { tasks: [
      { type: 'Décrire', subject: 'Vous avez déménagé récemment. Décrivez votre nouveau logement et votre quartier à un ami. (60 à 80 mots)', minWords: 60 },
      { type: 'Demander', subject: 'Vous avez perdu votre sac dans le bus. Écrivez au service des objets trouvés pour décrire le sac, dire où et quand vous l\'avez perdu et donner vos coordonnées. (60 à 80 mots)', minWords: 60 }
    ] }
  ],
  po: [
    { parts: [
      { title: 'Partie 1 — Entretien dirigé (1 min 30, sans préparation)', instructions: 'Présentez-vous puis répondez aux questions de l\'examinateur.', prompts: ['Présentez-vous (nom, âge, ville, profession ou études).', 'Depuis quand apprenez-vous le français ?', 'Que faites-vous pendant votre temps libre ?'] },
      { title: 'Partie 2 — Monologue suivi (2 min)', instructions: 'Parlez pendant environ deux minutes du sujet suivant.', prompts: ['Parlez de votre ville natale : où est-elle, qu\'est-ce qu\'on peut y faire, l\'aimez-vous ?'] },
      { title: 'Partie 3 — Exercice en interaction (3 à 4 min)', instructions: 'Vous voulez vous inscrire dans un club de sport. Vous téléphonez au club pour demander les horaires, le prix et l\'équipement nécessaire. L\'examinateur joue le rôle de l\'employé.', prompts: ['Saluez et expliquez pourquoi vous appelez.', 'Demandez les horaires et le prix.', 'Demandez ce qu\'il faut apporter.', 'Remerciez et prenez congé.'] }
    ] },
    { parts: [
      { title: 'Partie 1 — Entretien dirigé (1 min 30, sans préparation)', instructions: 'Présentez-vous puis répondez aux questions de l\'examinateur.', prompts: ['Présentez votre famille.', 'Qu\'est-ce que vous avez fait le week-end dernier ?', 'Qu\'est-ce que vous allez faire l\'été prochain ?'] },
      { title: 'Partie 2 — Monologue suivi (2 min)', instructions: 'Parlez pendant environ deux minutes du sujet suivant.', prompts: ['Racontez un voyage que vous avez aimé : où, quand, avec qui, ce que vous avez fait.'] },
      { title: 'Partie 3 — Exercice en interaction (3 à 4 min)', instructions: 'Vous êtes à l\'office de tourisme d\'une ville française. Vous voulez visiter la ville pendant un week-end. Demandez des informations (visites, transports, restaurants).', prompts: ['Saluez et présentez votre demande.', 'Demandez ce qu\'il faut visiter.', 'Demandez comment se déplacer.', 'Demandez un bon restaurant et remerciez.'] }
    ] },
    { parts: [
      { title: 'Partie 1 — Entretien dirigé (1 min 30, sans préparation)', instructions: 'Présentez-vous puis répondez aux questions de l\'examinateur.', prompts: ['Décrivez votre logement.', 'Quel est votre métier ou votre projet professionnel ?', 'Pourquoi apprenez-vous le français ?'] },
      { title: 'Partie 2 — Monologue suivi (2 min)', instructions: 'Parlez pendant environ deux minutes du sujet suivant.', prompts: ['Quel est votre plat préféré ? Expliquez pourquoi et comment on le prépare.'] },
      { title: 'Partie 3 — Exercice en interaction (3 à 4 min)', instructions: 'Vous achetez un cadeau d\'anniversaire pour un ami français. Dans le magasin, demandez des conseils, le prix et un paquet-cadeau.', prompts: ['Saluez et expliquez ce que vous cherchez.', 'Demandez un conseil.', 'Demandez le prix et une réduction.', 'Demandez un paquet-cadeau et payez.'] }
    ] }
  ]
}

// ═════════════════════════════════════════════════════════════════════ B1
const B1 = {
  co: [
    {
      title: 'Reportage : le covoiturage étudiant', maxPlays: 2,
      script: `— Léa, vous êtes étudiante à Rouen et vous rentrez chez vos parents, à Nantes, tous les quinze jours. Comment voyagez-vous ?
— En covoiturage, avec une application. Le train coûte trop cher pour moi : le covoiturage me coûte environ vingt-cinq euros au lieu de soixante.
— Et c'est pratique ?
— Oui, la plupart du temps. En plus, je rencontre des gens très différents : la semaine dernière, j'ai voyagé avec un musicien et une infirmière. Le seul problème, c'est que les conducteurs annulent parfois à la dernière minute. Alors je réserve toujours une solution de secours.`,
      questions: [
        q('b1co1', 'Pourquoi Léa utilise-t-elle le covoiturage ?', ['C\'est plus rapide', 'C\'est moins cher que le train', 'Elle n\'aime pas le train', 'Ses parents le lui demandent'], 1, '25 € au lieu de 60 €.'),
        q('b1co2', 'Quel avantage social cite-t-elle ?', ['Elle dort pendant le trajet', 'Elle rencontre des gens différents', 'Elle travaille pendant le trajet', 'Elle voyage avec ses amis'], 1, 'Elle rencontre des gens très différents.'),
        q('b1co3', 'Quel est l\'inconvénient principal ?', ['Les voitures sont sales', 'Les conducteurs annulent parfois', 'Les trajets sont longs', 'L\'application est payante'], 1, 'Annulations de dernière minute.'),
        q('b1co4', 'Que fait-elle pour éviter ce problème ?', ['Elle prend toujours le train', 'Elle prévoit une solution de secours', 'Elle conduit elle-même', 'Elle part un jour plus tôt'], 1, 'Elle réserve une solution de secours.')
      ]
    },
    {
      title: 'Information aux employés', maxPlays: 2,
      script: `Information à tous les employés : à partir du lundi 3 mars, la cantine change d'organisation. Un menu végétarien sera proposé tous les jours. Pour limiter le gaspillage, il faudra réserver son repas sur l'application avant dix heures. Le prix du repas reste de quatre euros cinquante. Enfin, la cantine sera ouverte de onze heures trente à quatorze heures, soit une demi-heure de plus qu'aujourd'hui.`,
      questions: [
        q('b1co5', 'Qu\'est-ce qui sera proposé chaque jour ?', ['Un dessert gratuit', 'Un menu végétarien', 'Un menu enfant', 'Un plat coréen'], 1, 'Un menu végétarien tous les jours.'),
        q('b1co6', 'Pourquoi faudra-t-il réserver ?', ['Pour payer moins', 'Pour limiter le gaspillage', 'Parce qu\'il y a moins de places', 'Pour choisir sa table'], 1, 'Pour limiter le gaspillage.'),
        q('b1co7', 'Qu\'est-ce qui ne change pas ?', ['Les horaires', 'Le prix du repas', 'Le menu', 'Le jour d\'ouverture'], 1, 'Le prix reste de 4,50 €.')
      ]
    },
    {
      title: 'Témoignage : vivre à Séoul', maxPlays: 2,
      script: `Je m'appelle Antoine, je vis à Séoul depuis deux ans. Au début, la langue était un vrai problème : je ne pouvais même pas lire un menu. J'ai pris des cours tous les soirs pendant six mois, et maintenant je me débrouille. Ce que j'apprécie le plus ici, ce sont les transports : le métro est propre, rapide et pas cher. Ce qui me manque ? Le fromage, évidemment, et le rythme plus lent des repas en France.`,
      questions: [
        q('b1co8', 'Quelle difficulté Antoine a-t-il eue au début ?', ['Trouver un logement', 'La langue', 'Le climat', 'Le travail'], 1, 'Il ne pouvait pas lire un menu.'),
        q('b1co9', 'Comment a-t-il progressé ?', ['Avec une application', 'En prenant des cours tous les soirs', 'Avec des amis coréens', 'En regardant des séries'], 1, 'Des cours tous les soirs pendant six mois.'),
        q('b1co10', 'Qu\'apprécie-t-il le plus ?', ['La cuisine', 'Les transports', 'Le climat', 'Les loyers'], 1, 'Le métro propre, rapide et pas cher.')
      ]
    }
  ],
  ce: [
    {
      title: 'Les Repair Cafés, une seconde vie pour nos objets',
      text: `Un grille-pain qui ne chauffe plus, une lampe cassée, un pantalon déchiré : au lieu de les jeter, de plus en plus de Français les apportent dans un Repair Café. Le principe est simple : une fois par mois, des bénévoles bricoleurs, électriciens ou couturiers aident gratuitement les habitants à réparer leurs objets. Le but n'est pas seulement de faire des économies : il s'agit aussi de lutter contre le gaspillage et d'apprendre à réparer soi-même. « Les gens repartent fiers », explique Marc, bénévole depuis trois ans. Les Repair Cafés ont toutefois leurs limites : les réparations ne sont pas garanties, et certains appareils récents sont presque impossibles à ouvrir.`,
      questions: [
        q('b1ce1', 'Que fait-on dans un Repair Café ?', ['On achète des objets d\'occasion', 'On répare ses objets avec l\'aide de bénévoles', 'On vend des pièces détachées', 'On recycle les déchets'], 1, 'Des bénévoles aident à réparer.'),
        q('b1ce2', 'Combien coûte l\'aide des bénévoles ?', ['Rien', 'Un abonnement', 'Le prix des pièces seulement', 'Le texte ne le dit pas'], 0, 'Ils aident gratuitement.'),
        q('b1ce3', 'Quel objectif est cité en plus des économies ?', ['Gagner de l\'argent', 'Lutter contre le gaspillage', 'Vendre plus', 'Remplacer les magasins'], 1, 'Lutter contre le gaspillage et apprendre.'),
        q('b1ce4', 'Quelle limite est mentionnée ?', ['Les bénévoles sont trop peu nombreux', 'Les réparations ne sont pas garanties', 'C\'est trop loin', 'C\'est réservé aux adhérents'], 1, 'Pas de garantie ; appareils difficiles à ouvrir.')
      ]
    },
    {
      title: 'Forum : la ville sans voiture le dimanche ?',
      text: `Sophie, 34 ans : « J'adore les dimanches sans voiture ! Mes enfants peuvent faire du vélo sans danger, l'air est plus pur et les commerçants installent leurs terrasses dans la rue. »
Patrick, 58 ans : « Je comprends l'idée, mais j'habite loin du centre et les bus passent seulement toutes les quarante minutes le dimanche. Sans voiture, je ne peux plus rendre visite à ma mère. Qu'on améliore d'abord les transports en commun ! »
Nour, 22 ans : « Une fois par mois, ce serait un bon compromis. Cela permettrait de profiter de la ville autrement sans pénaliser ceux qui n'ont pas le choix. »`,
      questions: [
        q('b1ce5', 'Selon Sophie, quel est un avantage ?', ['Le stationnement est gratuit', 'Les enfants peuvent faire du vélo sans danger', 'Les magasins ferment', 'Il y a plus de bus'], 1, 'Vélo sans danger, air plus pur, terrasses.'),
        q('b1ce6', 'Pourquoi Patrick est-il réservé ?', ['Il n\'aime pas le vélo', 'Les transports en commun sont insuffisants le dimanche', 'Il travaille le dimanche', 'Il trouve la ville trop calme'], 1, 'Bus toutes les 40 minutes.'),
        q('b1ce7', 'Que propose Nour ?', ['Interdire la voiture tous les jours', 'Un dimanche sans voiture par mois', 'Supprimer les bus', 'Rien du tout'], 1, 'Une fois par mois = compromis.')
      ]
    },
    {
      title: 'Offre d\'emploi',
      text: `Colonie de vacances « Les Petits Explorateurs » recherche un animateur ou une animatrice bilingue français-coréen pour juillet et août.
Missions : encadrer des groupes de 8 à 12 enfants de 7 à 12 ans, organiser des activités culturelles et sportives, accompagner les sorties.
Profil : BAFA souhaité (formation possible), excellent contact avec les enfants, permis de conduire apprécié.
Nous offrons : salaire selon expérience, logement et repas pris en charge.
Envoyez CV et lettre de motivation avant le 15 mai.`,
      questions: [
        q('b1ce8', 'Quelle compétence est indispensable ?', ['Parler français et coréen', 'Avoir une voiture', 'Être professeur', 'Parler anglais'], 0, 'Bilingue français-coréen.'),
        q('b1ce9', 'Le BAFA est-il obligatoire ?', ['Oui', 'Non, il est souhaité et une formation est possible', 'Seulement en août', 'Le texte ne le dit pas'], 1, '« BAFA souhaité (formation possible) ».'),
        q('b1ce10', 'Qu\'est-ce qui est offert en plus du salaire ?', ['Une voiture', 'Le logement et les repas', 'Des billets d\'avion', 'Un téléphone'], 1, 'Logement et repas pris en charge.')
      ]
    }
  ],
  pe: [
    { tasks: [{ type: 'Contribution à un forum', subject: 'Sur un forum, une personne demande : « Vaut-il mieux vivre en ville ou à la campagne ? » Vous donnez votre opinion en l\'illustrant d\'exemples tirés de votre expérience. (160 mots minimum)', minWords: 160 }] },
    { tasks: [{ type: 'Article', subject: 'Vous avez participé à un événement (festival, concert, mariage, fête traditionnelle…). Vous écrivez un article pour le journal de votre école de langue : vous racontez l\'événement et donnez vos impressions. (160 mots minimum)', minWords: 160 }] },
    { tasks: [{ type: 'Lettre formelle', subject: 'Vous écrivez au directeur de votre école de langue pour signaler un problème (salle trop petite, horaires peu pratiques, matériel en panne…). Vous expliquez la situation et proposez des solutions. (160 mots minimum)', minWords: 160 }] }
  ],
  po: [
    { parts: [
      { title: 'Partie 1 — Entretien dirigé (2 à 3 min, sans préparation)', instructions: 'Parlez de vous, de vos activités, de vos centres d\'intérêt.', prompts: ['Parlez de votre parcours (études, travail).', 'Qu\'est-ce qui vous plaît dans la culture française ?', 'Quels sont vos projets pour les prochaines années ?'] },
      { title: 'Partie 2 — Exercice en interaction (3 à 4 min)', instructions: 'Vous avez acheté un téléphone qui ne fonctionne plus après une semaine. Vous retournez au magasin. Le vendeur refuse de vous le changer. Vous insistez poliment.', prompts: ['Expliquez le problème.', 'Réagissez au refus du vendeur.', 'Proposez une solution (réparation, échange, remboursement).'] },
      { title: 'Partie 3 — Expression d\'un point de vue (5 à 7 min, 10 min de préparation)', document: 'LES DEVOIRS À LA MAISON : UTILES OU INJUSTES ?\nCertains parents estiment que les devoirs aident les enfants à progresser. D\'autres pensent qu\'ils créent des inégalités, car tous les enfants ne peuvent pas être aidés à la maison.', instructions: 'Dégagez le thème du document et donnez votre opinion avec des exemples.', prompts: ['Présentez le thème.', 'Donnez votre opinion avec deux arguments.', 'Concluez.'] }
    ] },
    { parts: [
      { title: 'Partie 1 — Entretien dirigé (2 à 3 min, sans préparation)', instructions: 'Parlez de vous, de vos activités, de vos centres d\'intérêt.', prompts: ['Décrivez une journée typique.', 'Quel voyage vous a marqué(e) ?', 'Comment apprenez-vous le français ?'] },
      { title: 'Partie 2 — Exercice en interaction (3 à 4 min)', instructions: 'Votre voisin fait souvent la fête très tard le soir. Vous allez le voir pour en parler. L\'examinateur joue le voisin.', prompts: ['Présentez-vous et expliquez le problème.', 'Écoutez ses arguments.', 'Trouvez un compromis.'] },
      { title: 'Partie 3 — Expression d\'un point de vue (5 à 7 min, 10 min de préparation)', document: 'TÉLÉTRAVAIL : LIBERTÉ OU ISOLEMENT ?\nDe plus en plus de salariés travaillent depuis chez eux. Ils gagnent du temps, mais certains se sentent seuls et ont du mal à séparer vie privée et travail.', instructions: 'Dégagez le thème du document et donnez votre opinion avec des exemples.', prompts: ['Présentez le thème.', 'Donnez votre opinion avec deux arguments.', 'Concluez.'] }
    ] },
    { parts: [
      { title: 'Partie 1 — Entretien dirigé (2 à 3 min, sans préparation)', instructions: 'Parlez de vous, de vos activités, de vos centres d\'intérêt.', prompts: ['Présentez votre ville.', 'Quel est votre loisir préféré et pourquoi ?', 'Qu\'aimeriez-vous changer dans votre vie ?'] },
      { title: 'Partie 2 — Exercice en interaction (3 à 4 min)', instructions: 'Vous voulez partir en week-end avec un ami français. Il veut aller à la mer, vous préférez la montagne. Discutez pour choisir ensemble.', prompts: ['Proposez votre idée.', 'Réagissez à sa proposition.', 'Mettez-vous d\'accord.'] },
      { title: 'Partie 3 — Expression d\'un point de vue (5 à 7 min, 10 min de préparation)', document: 'LES RÉSEAUX SOCIAUX RAPPROCHENT-ILS LES GENS ?\nGrâce aux réseaux sociaux, on garde contact avec des amis à l\'étranger. Pourtant, des études montrent que beaucoup de jeunes se sentent plus seuls qu\'avant.', instructions: 'Dégagez le thème du document et donnez votre opinion avec des exemples.', prompts: ['Présentez le thème.', 'Donnez votre opinion avec deux arguments.', 'Concluez.'] }
    ] }
  ]
}

// ═════════════════════════════════════════════════════════════════════ B2 (sujets existants)
const B2 = {
  co: B2_EXAMS.flatMap((e) => e.co),
  ce: B2_EXAMS.flatMap((e) => e.ce),
  pe: B2_EXAMS.map((e) => ({ tasks: [{ type: e.pe.type, subject: e.pe.subject, minWords: e.pe.minWords }] })),
  po: B2_EXAMS.map((e) => ({ parts: [{ title: 'Exposé argumenté puis débat (20 min, 30 min de préparation)', document: e.po.document, instructions: e.po.instructions, prompts: e.po.followUps }] }))
}

// ═════════════════════════════════════════════════════════════════════ C1
const C1 = {
  co: [
    {
      title: 'Conférence : l\'économie circulaire', maxPlays: 2,
      script: `Pendant des décennies, notre économie a fonctionné selon un modèle linéaire : extraire, fabriquer, consommer, jeter. Ce modèle se heurte aujourd'hui à une double limite : l'épuisement des ressources et l'accumulation des déchets. L'économie circulaire propose de rompre avec cette logique en concevant dès l'origine des produits réparables, réutilisables et recyclables. Encore faut-il ne pas se méprendre : le recyclage, souvent présenté comme la solution miracle, n'arrive qu'en dernier recours, car il consomme lui-même de l'énergie. La priorité devrait aller à la réduction de la consommation et à l'allongement de la durée de vie des objets. Reste une difficulté de taille : ce modèle suppose de repenser la rentabilité des entreprises, qui ont longtemps tiré profit du renouvellement rapide des produits.`,
      questions: [
        q('c1co1', 'Quelles sont les limites du modèle linéaire selon la conférencière ?', ['Le coût de la main-d\'œuvre et la concurrence', 'L\'épuisement des ressources et l\'accumulation des déchets', 'La baisse de la consommation', 'La lenteur de la production'], 1, 'Double limite : ressources et déchets.'),
        q('c1co2', 'Quelle est sa position sur le recyclage ?', ['C\'est la meilleure solution', 'C\'est un dernier recours, car il consomme de l\'énergie', 'Il faut l\'interdire', 'Il est trop cher'], 1, '« n\'arrive qu\'en dernier recours ».'),
        q('c1co3', 'Que faudrait-il privilégier ?', ['Le recyclage massif', 'La réduction de la consommation et l\'allongement de la durée de vie', 'La production locale uniquement', 'Les taxes sur les déchets'], 1, 'Réduire et faire durer.'),
        q('c1co4', 'Quel obstacle est souligné à la fin ?', ['Le manque de technologies', 'La nécessité de repenser la rentabilité des entreprises', 'Le refus des consommateurs', 'Les lois européennes'], 1, 'Les entreprises profitaient du renouvellement rapide.')
      ]
    },
    {
      title: 'Débat radiophonique : les transports publics gratuits', maxPlays: 2,
      script: `— Plusieurs villes françaises ont rendu leurs transports publics gratuits. Monsieur Garnier, vous êtes économiste : est-ce une bonne idée ?
— Tout dépend de l'objectif. Si l'on espère faire renoncer massivement les automobilistes à leur voiture, les résultats sont décevants : la gratuité attire surtout des piétons et des cyclistes. En revanche, si l'objectif est social, à savoir rendre la ville accessible aux ménages modestes, l'effet est réel.
— Et le financement ?
— C'est le nœud du problème. La billetterie ne couvre souvent qu'une faible part du coût du réseau ; la supprimer n'est donc pas ruineux pour une ville moyenne. Pour une métropole, en revanche, c'est une autre affaire : le manque à gagner se compte en centaines de millions, au risque de sacrifier l'investissement dans de nouvelles lignes.`,
      questions: [
        q('c1co5', 'Selon l\'économiste, la gratuité attire surtout…', ['les automobilistes', 'les piétons et les cyclistes', 'les touristes', 'les entreprises'], 1, 'Résultats décevants sur la voiture.'),
        q('c1co6', 'Quel objectif la gratuité atteint-elle réellement ?', ['Un objectif écologique', 'Un objectif social', 'Un objectif touristique', 'Aucun'], 1, 'Rendre la ville accessible aux ménages modestes.'),
        q('c1co7', 'Pourquoi la gratuité est-elle plus difficile dans une métropole ?', ['Les habitants sont contre', 'Le manque à gagner est énorme et menace l\'investissement', 'Il n\'y a pas de bus', 'La loi l\'interdit'], 1, 'Centaines de millions, investissements sacrifiés.')
      ]
    }
  ],
  ce: [
    {
      title: 'La traduction automatique va-t-elle rendre les langues inutiles ?',
      text: `Il y a encore quinze ans, la traduction automatique prêtait à sourire. Aujourd'hui, elle permet de lire un journal étranger, de commander un repas ou de négocier un contrat avec une fluidité qui semblait inimaginable. Faut-il pour autant en conclure que l'apprentissage des langues est devenu superflu ? Rien n'est moins sûr.
D'abord, parce que la traduction, si performante soit-elle, reste une médiation : elle transmet un contenu, rarement une manière d'être. L'humour, les sous-entendus, la politesse implicite échappent encore largement aux algorithmes. Ensuite, parce qu'apprendre une langue ne se réduit pas à acquérir un outil de communication : c'est accéder à une autre façon de découper le monde. Les chercheurs en sciences cognitives soulignent par ailleurs les bénéfices du bilinguisme sur la flexibilité mentale.
Il n'en demeure pas moins que ces outils transforment les usages : nombre d'étudiants les utilisent comme des dictionnaires intelligents, au risque de déléguer l'effort qui fonde l'apprentissage. L'enjeu n'est donc pas de les bannir, mais d'apprendre à s'en servir avec discernement.`,
      questions: [
        q('c1ce1', 'Quelle est la thèse principale de l\'auteur ?', ['La traduction automatique rend les langues inutiles', 'L\'apprentissage des langues reste nécessaire malgré la traduction automatique', 'Il faut interdire la traduction automatique', 'Les algorithmes comprennent l\'humour'], 1, '« Rien n\'est moins sûr » : les langues restent utiles.'),
        q('c1ce2', 'Selon le texte, que transmet mal la traduction ?', ['Les informations factuelles', 'Les chiffres', 'L\'humour, les sous-entendus et la politesse implicite', 'Les noms propres'], 2, 'Elle transmet un contenu, pas une manière d\'être.'),
        q('c1ce3', '« Il n\'en demeure pas moins que » introduit…', ['une conclusion définitive', 'une concession qui nuance le propos', 'un exemple', 'une cause'], 1, 'L\'auteur reconnaît l\'impact réel des outils.'),
        q('c1ce4', 'Quelle position l\'auteur adopte-t-il à la fin ?', ['Bannir ces outils', 'Les utiliser avec discernement', 'Remplacer les professeurs', 'Ignorer le problème'], 1, '« apprendre à s\'en servir avec discernement ».')
      ]
    },
    {
      title: 'Le « tourisme lent », une mode ou une révolution ?',
      text: `Prendre le train de nuit plutôt que l'avion, séjourner trois semaines dans un même village, apprendre quelques mots de la langue locale : le « tourisme lent » séduit un nombre croissant de voyageurs. Ses partisans y voient une réponse à la fois écologique et existentielle à la frénésie des circuits « dix pays en dix jours ».
Pourtant, ses détracteurs pointent un paradoxe : voyager lentement suppose du temps, donc des congés longs ou une activité professionnelle flexible, privilège qui reste l'apanage d'une minorité. Loin de démocratiser le voyage, le tourisme lent risquerait ainsi d'en faire un nouveau marqueur social.
Entre ces deux lectures, certains acteurs du secteur tentent une voie médiane : proposer des séjours courts mais « ralentis », centrés sur un seul lieu et sur la rencontre avec les habitants. Reste à savoir si cette philosophie résistera aux contraintes économiques d'une industrie fondée sur le volume.`,
      questions: [
        q('c1ce5', 'Quelle double motivation les partisans du tourisme lent invoquent-ils ?', ['Économique et sportive', 'Écologique et existentielle', 'Culturelle et commerciale', 'Familiale et religieuse'], 1, '« à la fois écologique et existentielle ».'),
        q('c1ce6', 'Quel paradoxe soulignent les détracteurs ?', ['Le tourisme lent coûte moins cher', 'Il exige du temps, privilège d\'une minorité', 'Il pollue davantage', 'Il est réservé aux jeunes'], 1, 'Un nouveau marqueur social.'),
        q('c1ce7', 'Que proposent « certains acteurs du secteur » ?', ['Interdire l\'avion', 'Des séjours courts mais ralentis, centrés sur un lieu', 'Des circuits plus longs et plus chers', 'Des voyages virtuels'], 1, 'La voie médiane.'),
        q('c1ce8', 'Quelle incertitude subsiste à la fin ?', ['La résistance de cette philosophie aux contraintes économiques', 'L\'intérêt des habitants', 'La sécurité des trains de nuit', 'La météo'], 0, 'Industrie fondée sur le volume.')
      ]
    }
  ],
  pe: [
    { tasks: [
      { type: 'Synthèse (environ 220 mots)', subject: `Rédigez une synthèse objective des deux documents suivants, sans donner votre avis.
Document 1 : Selon une étude récente, 40 % des salariés déclarent consulter leurs e-mails professionnels pendant leurs congés. Les psychologues alertent sur les risques d'épuisement et rappellent l'importance de véritables périodes de repos.
Document 2 : Pour certains cadres, rester joignables en vacances est au contraire rassurant : cela leur évite une surcharge de travail au retour. Plusieurs entreprises expérimentent des « chartes de déconnexion » qui laissent à chacun le choix des moments où il répond.`, minWords: 200 },
      { type: 'Essai argumenté (250 mots minimum)', subject: 'Le droit à la déconnexion doit-il être imposé par la loi ou laissé à l\'appréciation de chacun ? Vous répondez dans un essai argumenté et nuancé.', minWords: 250 }
    ] },
    { tasks: [
      { type: 'Synthèse (environ 220 mots)', subject: `Rédigez une synthèse objective des deux documents suivants, sans donner votre avis.
Document 1 : Les ventes de livres papier résistent mieux que prévu face au numérique ; les jeunes adultes, notamment, plébiscitent l'objet-livre, qu'ils associent à une pause loin des écrans.
Document 2 : Les bibliothèques publiques développent des offres de prêt numérique, très appréciées des lecteurs âgés ou malvoyants qui peuvent agrandir les caractères. Mais ces licences coûtent cher aux collectivités.`, minWords: 200 },
      { type: 'Essai argumenté (250 mots minimum)', subject: 'Les bibliothèques publiques doivent-elles privilégier le livre papier ou le numérique ? Vous défendez une position argumentée dans un article destiné à la revue culturelle de votre ville.', minWords: 250 }
    ] }
  ],
  po: [
    { parts: [{ title: 'Exposé à partir de documents puis débat (30 min, 1 h de préparation)', document: 'DOSSIER : LA SEMAINE DE QUATRE JOURS\nDocument 1 : Une entreprise islandaise affirme que la productivité de ses équipes est restée stable après le passage à quatre jours.\nDocument 2 : Des syndicats craignent une intensification du travail, avec des journées plus longues et plus stressantes.\nDocument 3 : Pour les commerces et les hôpitaux, l\'organisation sur quatre jours pose des problèmes de continuité du service.', instructions: 'Dégagez une problématique à partir des documents, présentez un exposé structuré (introduction, deux ou trois parties, conclusion), puis défendez votre point de vue face aux objections.', prompts: ['Une mesure qui ne s\'applique pas à tous les métiers n\'est-elle pas injuste ?', 'Qui devrait décider : l\'État, les entreprises ou les salariés ?', 'Ce modèle serait-il adapté en Corée ?'] }] },
    { parts: [{ title: 'Exposé à partir de documents puis débat (30 min, 1 h de préparation)', document: 'DOSSIER : L\'INTELLIGENCE ARTIFICIELLE À L\'ÉCOLE\nDocument 1 : Des enseignants utilisent l\'IA pour proposer des exercices adaptés au niveau de chaque élève.\nDocument 2 : Une enquête révèle qu\'une majorité de lycéens utilisent l\'IA pour rédiger leurs devoirs.\nDocument 3 : Des chercheurs rappellent que l\'effort de mémorisation reste indispensable à l\'apprentissage.', instructions: 'Dégagez une problématique à partir des documents, présentez un exposé structuré (introduction, deux ou trois parties, conclusion), puis défendez votre point de vue face aux objections.', prompts: ['Faut-il interdire l\'IA pendant les devoirs ?', 'Comment évaluer les élèves si l\'IA peut tout rédiger ?', 'L\'IA peut-elle remplacer un professeur ?'] }] }
  ]
}

export const BANK = { A1, A2, B1, B2, C1 }

/** Combien de sujets différents existent pour un niveau (indication pour l'interface). */
export function bankSize(level) {
  const b = BANK[level]
  return { co: b.co.length, ce: b.ce.length, pe: b.pe.length, po: b.po.length }
}

/** Crée un examen au hasard à partir de la banque du niveau. */
export function generateExam(level) {
  const f = FORMATS[level]
  const b = BANK[level]
  const pick1 = (arr) => arr[Math.floor(Math.random() * arr.length)]
  const n = Math.floor(Math.random() * 900) + 100
  return {
    id: `${level}-${Date.now().toString(36)}`,
    level,
    title: `${f.name} — examen blanc n° ${n}`,
    source: 'banque',
    co: shuffle(b.co).slice(0, Math.min(f.co.docs, b.co.length)),
    ce: shuffle(b.ce).slice(0, Math.min(f.ce.docs, b.ce.length)),
    pe: pick1(b.pe),
    po: pick1(b.po)
  }
}
