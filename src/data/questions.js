/**
 * BANQUE DE QUESTIONS — « Tests de compétences » (grammaire, vocabulaire, compréhension).
 * Les questions de pratique des leçons du même niveau sont ajoutées automatiquement
 * aux tests de grammaire (voir src/pages/Tests.jsx).
 * `text` : petit texte de compréhension affiché au-dessus de la question.
 */

const T_A2 = `Chère Léa,
Je suis bien arrivée à Lyon samedi. Mon appartement est petit mais lumineux, et il est à dix minutes à pied de l'université. Les cours commencent lundi prochain. Dimanche, je suis allée au marché : il y avait beaucoup de monde ! Viens me voir quand tu veux.
Bises, Sora`

const T_B1 = `Depuis le mois de septembre, la mairie de Rouen prête gratuitement des vélos électriques aux habitants pendant trois mois. L'objectif est de les encourager à laisser leur voiture au garage. Pour en profiter, il suffit de présenter un justificatif de domicile. Après trois mois, ceux qui souhaitent garder le vélo peuvent l'acheter à prix réduit.`

const T_B2 = `Le télétravail, longtemps réservé à quelques cadres, s'est imposé dans de nombreuses entreprises. S'il permet d'économiser du temps de transport et d'améliorer la concentration, il comporte aussi des risques : isolement, difficulté à séparer vie privée et vie professionnelle, affaiblissement du sentiment d'appartenance. Les spécialistes recommandent donc une formule hybride, alternant jours au bureau et jours à domicile, ainsi qu'un « droit à la déconnexion » clairement défini par l'employeur.`

const T_B2b = `Dans plusieurs villes françaises, des « frigos solidaires » apparaissent sur les trottoirs. Commerçants et particuliers y déposent des aliments encore consommables qu'ils auraient autrement jetés ; chacun peut se servir librement. Les promoteurs de l'initiative y voient un double bénéfice : lutter contre le gaspillage et aider les personnes en difficulté sans les stigmatiser. Les critiques, elles, soulignent les questions d'hygiène et de responsabilité en cas d'intoxication, ce qui pousse les associations à établir des règles strictes : pas de produits faits maison, pas d'alcool, des dates de consommation vérifiées chaque jour.`

const T_C1 = `Si l'intelligence artificielle promet des gains de productivité considérables, son déploiement soulève des interrogations qu'on aurait tort de balayer d'un revers de main. La question n'est plus tant de savoir si ces outils transformeront le travail que de déterminer qui en tirera profit. Faute d'une réflexion collective sur la formation et la redistribution, les bénéfices risquent de se concentrer entre les mains d'une minorité.`

export const QUESTION_BANK = [
  // A1
  { id: 'qa1-g1', level: 'A1', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'Vous ___ français ?', options: ['êtes', 'es', 'sommes', 'est'], answer: 0, explanation: 'Vous + être = vous êtes.' },
  { id: 'qa1-g2', level: 'A1', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'Je n\'aime ___ le thé.', options: ['ne', 'pas', 'non', 'jamais pas'], answer: 1, explanation: 'Négation : ne… pas.' },
  { id: 'qa1-v1', level: 'A1', skill: 'vocabulaire', type: 'qcm', prompt: 'Le contraire de « grand » :', options: ['gros', 'petit', 'long', 'jeune'], answer: 1, explanation: 'Grand ≠ petit.' },
  { id: 'qa1-v2', level: 'A1', skill: 'vocabulaire', type: 'qcm', prompt: 'Que signifie « la boulangerie » ?', options: ['정육점', '빵집', '약국', '우체국'], answer: 1, explanation: 'La boulangerie = 빵집.' },
  { id: 'qa1-c1', level: 'A1', skill: 'comprehension', type: 'qcm', text: 'Bonjour ! Je m\'appelle Jun. J\'ai 24 ans. Je suis coréen et j\'habite à Paris. Je suis étudiant en architecture.', prompt: 'Que fait Jun ?', options: ['Il est architecte.', 'Il étudie l\'architecture.', 'Il est professeur.', 'Il travaille à Séoul.'], answer: 1, explanation: '« Je suis étudiant en architecture ».' },

  // A2
  { id: 'qa2-g1', level: 'A2', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'Demain, nous ___ au musée.', options: ['allons aller', 'irons', 'sommes allés', 'allions'], answer: 1, explanation: 'Futur simple : nous irons.' },
  { id: 'qa2-g2', level: 'A2', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'Tu connais Marie ? Oui, je ___ connais bien.', options: ['lui', 'la', 'le', 'leur'], answer: 1, explanation: 'Connaître quelqu\'un → COD féminin : la.' },
  { id: 'qa2-v1', level: 'A2', skill: 'vocabulaire', type: 'qcm', prompt: '« Un loyer », c\'est…', options: ['l\'argent payé chaque mois pour un logement', 'un meuble', 'un document d\'identité', 'un moyen de transport'], answer: 0, explanation: 'Le loyer = 월세.' },
  { id: 'qa2-c1', level: 'A2', skill: 'comprehension', type: 'qcm', text: T_A2, prompt: 'Où se trouve l\'appartement de Sora ?', options: ['Loin de l\'université', 'À dix minutes à pied de l\'université', 'Au marché', 'À Paris'], answer: 1, explanation: '« à dix minutes à pied de l\'université ».' },
  { id: 'qa2-c2', level: 'A2', skill: 'comprehension', type: 'qcm', text: T_A2, prompt: 'Quand les cours commencent-ils ?', options: ['Samedi', 'Dimanche', 'Lundi prochain', 'Ils ont déjà commencé'], answer: 2, explanation: '« Les cours commencent lundi prochain ».' },

  // B1
  { id: 'qb1-g1', level: 'B1', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'Si j\'avais le temps, je ___ le coréen.', options: ['apprendrai', 'apprendrais', 'apprenais', 'aurais appris'], answer: 1, explanation: 'Si + imparfait → conditionnel présent.' },
  { id: 'qb1-g2', level: 'B1', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'Des pommes ? J\'___ ai acheté trois.', options: ['y', 'en', 'les', 'leur'], answer: 1, explanation: 'Quantité → en.' },
  { id: 'qb1-v1', level: 'B1', skill: 'vocabulaire', type: 'qcm', prompt: 'Synonyme de « se débrouiller » :', options: ['abandonner', 'se tromper', 'trouver une solution seul', 'se reposer'], answer: 2, explanation: 'Se débrouiller = s\'en sortir seul.' },
  { id: 'qb1-v2', level: 'B1', skill: 'vocabulaire', type: 'qcm', prompt: '« Un justificatif de domicile » est…', options: ['un document qui prouve où l\'on habite', 'une clé', 'un contrat de travail', 'un billet de train'], answer: 0, explanation: 'Ex. : facture d\'électricité, quittance de loyer.' },
  { id: 'qb1-c1', level: 'B1', skill: 'comprehension', type: 'qcm', text: T_B1, prompt: 'Quel est l\'objectif de la mairie ?', options: ['Vendre des vélos', 'Réduire l\'usage de la voiture', 'Construire des parkings', 'Organiser une course'], answer: 1, explanation: '« les encourager à laisser leur voiture au garage ».' },
  { id: 'qb1-c2', level: 'B1', skill: 'comprehension', type: 'qcm', text: T_B1, prompt: 'Que se passe-t-il après trois mois ?', options: ['Le vélo est donné gratuitement', 'On peut acheter le vélo moins cher', 'On doit payer une amende', 'Le prêt est prolongé automatiquement'], answer: 1, explanation: '« l\'acheter à prix réduit ».' },

  // B2
  { id: 'qb2-g1', level: 'B2', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'Si j\'avais su, je ___ plus tôt.', options: ['serais venu', 'viendrais', 'suis venu', 'venais'], answer: 0, explanation: 'Si + plus-que-parfait → conditionnel passé.' },
  { id: 'qb2-g2', level: 'B2', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'Les lettres qu\'il a ___ sont arrivées.', options: ['écrit', 'écrites', 'écrits', 'écrite'], answer: 1, explanation: 'Avoir + COD placé avant (les lettres) → accord : écrites.' },
  { id: 'qb2-g3', level: 'B2', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'C\'est la solution à ___ je pensais.', options: ['qui', 'laquelle', 'lequel', 'quoi'], answer: 1, explanation: 'Penser à + chose féminine → à laquelle.' },
  { id: 'qb2-g4', level: 'B2', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'En ___ ses devoirs, il écoute de la musique.', options: ['fait', 'faisant', 'faire', 'ayant fait'], answer: 1, explanation: 'Gérondif = en + participe présent : en faisant.' },
  { id: 'qb2-g5', level: 'B2', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'Le projet ___ par le conseil municipal la semaine dernière.', options: ['a adopté', 'a été adopté', 'est adoptant', 'était adoptant'], answer: 1, explanation: 'Voix passive au passé composé : a été + participe.' },
  { id: 'qb2-v1', level: 'B2', skill: 'vocabulaire', type: 'qcm', prompt: 'Que signifie « un enjeu » ?', options: ['un jeu vidéo', 'ce qu\'on peut gagner ou perdre ; ce qui est en question', 'une erreur', 'un règlement'], answer: 1, explanation: 'L\'enjeu = 쟁점, 관건.' },
  { id: 'qb2-v2', level: 'B2', skill: 'vocabulaire', type: 'qcm', prompt: '« Mettre en œuvre » un projet signifie…', options: ['l\'abandonner', 'le réaliser concrètement', 'le critiquer', 'le financer'], answer: 1, explanation: 'Mettre en œuvre = 실행하다, 시행하다.' },
  { id: 'qb2-v3', level: 'B2', skill: 'vocabulaire', type: 'qcm', prompt: 'Le contraire de « favoriser » :', options: ['encourager', 'freiner', 'aider', 'développer'], answer: 1, explanation: 'Favoriser ≠ freiner (entraver).' },
  { id: 'qb2-v4', level: 'B2', skill: 'vocabulaire', type: 'qcm', prompt: 'Quel mot convient ?', sentence: 'Cette décision a suscité de nombreuses ___ chez les habitants.', options: ['réactions', 'réacteurs', 'actions', 'récits'], answer: 0, explanation: 'Susciter des réactions = 반응을 불러일으키다.' },
  { id: 'qb2-v5', level: 'B2', skill: 'vocabulaire', type: 'qcm', prompt: '« Une formule hybride » est une formule…', options: ['entièrement nouvelle', 'qui mélange deux modes', 'très chère', 'interdite'], answer: 1, explanation: 'Hybride = qui combine deux éléments.' },
  { id: 'qb2-c1', level: 'B2', skill: 'comprehension', type: 'qcm', text: T_B2, prompt: 'Selon le texte, quel est un risque du télétravail ?', options: ['La perte de temps dans les transports', 'L\'isolement', 'Une meilleure concentration', 'Trop de réunions au bureau'], answer: 1, explanation: 'Le texte cite isolement, frontière floue vie privée/pro, perte d\'appartenance.' },
  { id: 'qb2-c2', level: 'B2', skill: 'comprehension', type: 'qcm', text: T_B2, prompt: 'Que recommandent les spécialistes ?', options: ['Supprimer le télétravail', 'Le télétravail à 100 %', 'Une alternance bureau/domicile et un droit à la déconnexion', 'Des horaires plus longs'], answer: 2, explanation: '« une formule hybride… ainsi qu\'un droit à la déconnexion ».' },
  { id: 'qb2-c3', level: 'B2', skill: 'comprehension', type: 'qcm', text: T_B2b, prompt: 'Quel « double bénéfice » les promoteurs voient-ils ?', options: ['Gagner de l\'argent et créer des emplois', 'Lutter contre le gaspillage et aider sans stigmatiser', 'Vendre des produits frais et faire de la publicité', 'Réduire les impôts et nettoyer les rues'], answer: 1, explanation: 'Anti-gaspillage + aide discrète.' },
  { id: 'qb2-c4', level: 'B2', skill: 'comprehension', type: 'qcm', text: T_B2b, prompt: 'Pourquoi les associations fixent-elles des règles strictes ?', options: ['Pour vendre plus', 'À cause des critiques sur l\'hygiène et la responsabilité', 'Parce que la loi interdit les frigos', 'Pour attirer les touristes'], answer: 1, explanation: 'Les critiques sur l\'hygiène les y poussent.' },

  // C1
  { id: 'qc1-g1', level: 'C1', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: '___ soit la difficulté, nous continuerons.', options: ['Quel que', 'Quelle que', 'Quoique', 'Quelque'], answer: 1, explanation: 'Quel que soit + nom : « quel » s\'accorde avec le nom. Difficulté est féminin → quelle que.' },
  { id: 'qc1-g2', level: 'C1', skill: 'grammaire', type: 'qcm', prompt: 'Complétez :', sentence: 'Pour peu qu\'on lui ___ confiance, il s\'investit pleinement.', options: ['fait', 'fasse', 'fera', 'ferait'], answer: 1, explanation: 'Pour peu que + subjonctif.' },
  { id: 'qc1-v1', level: 'C1', skill: 'vocabulaire', type: 'qcm', prompt: '« Balayer d\'un revers de main » signifie…', options: ['nettoyer rapidement', 'rejeter sans examiner', 'saluer quelqu\'un', 'travailler vite'], answer: 1, explanation: 'Écarter une idée sans la considérer.' },
  { id: 'qc1-c1', level: 'C1', skill: 'comprehension', type: 'qcm', text: T_C1, prompt: 'Quelle est, selon l\'auteur, la vraie question ?', options: ['Savoir si l\'IA transformera le travail', 'Déterminer qui profitera des gains de l\'IA', 'Interdire l\'IA', 'Mesurer la productivité'], answer: 1, explanation: '« de déterminer qui en tirera profit ».' },
  { id: 'qc1-c2', level: 'C1', skill: 'comprehension', type: 'qcm', text: T_C1, prompt: 'Que craint l\'auteur faute de réflexion collective ?', options: ['Une baisse de la productivité', 'Une concentration des bénéfices dans une minorité', 'La disparition de l\'IA', 'Une hausse des salaires'], answer: 1, explanation: '« se concentrer entre les mains d\'une minorité ».' }
]

export const SKILLS = [
  { id: 'grammaire', label: 'Grammaire', ko: '문법', icon: '🧩' },
  { id: 'vocabulaire', label: 'Vocabulaire', ko: '어휘', icon: '📖' },
  { id: 'comprehension', label: 'Compréhension', ko: '독해', icon: '👁️' }
]
