/**
 * EXAMENS BLANCS DELF B2 — sujets ORIGINAUX écrits pour cette application
 * (ce ne sont pas des sujets officiels). Format inspiré de l'examen :
 *   Compréhension de l'oral   ≈ 30 min  /25
 *   Compréhension des écrits  1 h       /25
 *   Production écrite         1 h       /25  (auto-évaluation guidée, IA facultative)
 *   Production orale          30 min de préparation + 20 min  /25 (auto-évaluation, enregistrement)
 * Réussite : 50/100 minimum et au moins 5/25 dans chaque épreuve.
 * Les documents audio sont lus par la synthèse vocale du navigateur (voix française).
 * Les durées peuvent varier selon les sessions officielles : vérifiez votre convocation.
 */

export const SECTIONS = [
  { id: 'co', label: 'Compréhension de l\'oral', ko: '듣기', minutes: 30, icon: '🎧' },
  { id: 'ce', label: 'Compréhension des écrits', ko: '읽기', minutes: 60, icon: '📰' },
  { id: 'pe', label: 'Production écrite', ko: '쓰기', minutes: 60, icon: '✍️' },
  { id: 'po', label: 'Production orale', ko: '말하기', minutes: 50, icon: '🎤' }
]

export const PE_GRID = [
  { id: 'consigne', label: 'Respect de la consigne (type de texte, destinataire, nombre de mots)', ko: '지시문 준수 (글의 종류, 수신자, 단어 수)', max: 2 },
  { id: 'argument', label: 'Argumentation : position claire, arguments développés et illustrés', ko: '논증: 분명한 입장, 충분히 전개되고 예시가 있는 논거', max: 5 },
  { id: 'coherence', label: 'Cohérence et cohésion : plan visible, paragraphes, connecteurs variés', ko: '일관성과 응집성: 보이는 구성, 문단, 다양한 연결어', max: 4 },
  { id: 'lexique', label: 'Étendue et maîtrise du vocabulaire', ko: '어휘의 폭과 정확성', max: 5 },
  { id: 'grammaire', label: 'Morphosyntaxe : temps, accords, subjonctif, phrases complexes', ko: '문법: 시제, 일치, 접속법, 복문', max: 6 },
  { id: 'orthographe', label: 'Orthographe et ponctuation', ko: '철자와 구두점', max: 3 }
]

export const PO_GRID = [
  { id: 'probleme', label: 'Présenter le document et dégager le problème soulevé', ko: '자료를 소개하고 제기된 문제를 밝히기', max: 3 },
  { id: 'plan', label: 'Exposé organisé (introduction, plan, conclusion)', ko: '구성된 발표 (서론, 구성, 결론)', max: 4 },
  { id: 'argument', label: 'Défendre son point de vue avec des exemples', ko: '예시를 들어 자기 관점을 옹호하기', max: 4 },
  { id: 'interaction', label: 'Réagir aux objections, nuancer (simulé : répondez aux questions de relance)', ko: '반론에 대응하고 뉘앙스 주기 (아래 추가 질문에 답하기)', max: 4 },
  { id: 'lexique', label: 'Vocabulaire précis et varié', ko: '정확하고 다양한 어휘', max: 4 },
  { id: 'grammaire', label: 'Correction grammaticale', ko: '문법적 정확성', max: 3 },
  { id: 'prononciation', label: 'Prononciation et fluidité', ko: '발음과 유창성', max: 3 }
]

export const EXAMS = [
  {
    id: 'sujet-1',
    title: 'Sujet 1 — Vivre et travailler autrement',
    co: [
      {
        title: 'Document 1 — Annonce radio',
        maxPlays: 2,
        script: `Bonjour à toutes et à tous. Dimanche prochain, le centre-ville de Lyon sera entièrement réservé aux piétons et aux cyclistes, de dix heures à dix-huit heures. C'est la troisième édition de la journée « Respirons la ville ». Les bus continueront de circuler, mais sur des itinéraires modifiés : pensez à consulter le site des transports en commun avant de partir. Au programme : des ateliers de réparation de vélos gratuits place Bellecour, un marché de producteurs locaux et, pour les enfants, un parcours d'initiation au vélo. Les automobilistes qui habitent dans le périmètre pourront sortir leur véhicule, mais uniquement sur présentation d'un justificatif de domicile. L'an dernier, plus de cinquante mille personnes avaient participé à l'événement.`,
        questions: [
          { id: 's1co1', type: 'qcm', prompt: 'Que se passera-t-il dimanche prochain ?', options: ['Les bus seront supprimés.', 'Le centre-ville sera réservé aux piétons et aux cyclistes.', 'Une course de vélos sera organisée.', 'Les commerces seront fermés.'], answer: 1, explanation: 'Le centre-ville sera « réservé aux piétons et aux cyclistes ».' },
          { id: 's1co2', type: 'qcm', prompt: 'Que conseille-t-on aux usagers des bus ?', options: ['De prendre leur voiture', 'De consulter les itinéraires modifiés', 'D\'acheter un ticket spécial', 'De ne pas sortir'], answer: 1, explanation: 'Les bus circuleront sur des itinéraires modifiés : il faut consulter le site.' },
          { id: 's1co3', type: 'qcm', prompt: 'Quelle activité est proposée place Bellecour ?', options: ['Un concert', 'Des ateliers de réparation de vélos', 'Un marché aux puces', 'Une exposition de voitures'], answer: 1, explanation: 'Ateliers de réparation de vélos gratuits place Bellecour.' },
          { id: 's1co4', type: 'qcm', prompt: 'À quelle condition les habitants peuvent-ils utiliser leur voiture ?', options: ['Aucune', 'Avec un justificatif de domicile', 'Avant dix heures uniquement', 'En payant une taxe'], answer: 1, explanation: '« uniquement sur présentation d\'un justificatif de domicile ».' }
        ]
      },
      {
        title: 'Document 2 — Entretien avec une sociologue',
        maxPlays: 2,
        script: `— Claire Moreau, vous êtes sociologue du travail. Plusieurs entreprises françaises testent la semaine de quatre jours. Est-ce une bonne nouvelle pour les salariés ?
— Globalement, oui. Les premières études montrent une baisse de la fatigue et de l'absentéisme. Les salariés disent avoir davantage de temps pour leur famille, pour le sport ou pour des activités associatives. Mais il faut distinguer deux modèles. Dans le premier, on travaille moins d'heures pour le même salaire : c'est le plus avantageux pour les salariés. Dans le second, on concentre les trente-cinq heures sur quatre jours, ce qui donne des journées de près de neuf heures. Et là, les effets sont beaucoup plus discutables : certains salariés se disent épuisés le jeudi soir.
— Et du côté des employeurs ?
— Beaucoup y voient un argument pour recruter. Dans les secteurs où l'on manque de personnel, proposer quatre jours peut faire la différence. En revanche, ce modèle est difficile à appliquer dans les métiers où il faut assurer une présence continue, comme les hôpitaux ou les commerces. Je dirais donc que la semaine de quatre jours n'est pas une solution universelle, mais un outil parmi d'autres pour améliorer la qualité de vie au travail.`,
        questions: [
          { id: 's1co5', type: 'qcm', prompt: 'Selon la sociologue, quel est un effet positif constaté ?', options: ['Une hausse des salaires', 'Une baisse de la fatigue et de l\'absentéisme', 'Plus d\'heures supplémentaires', 'Moins de recrutements'], answer: 1, explanation: '« une baisse de la fatigue et de l\'absentéisme ».' },
          { id: 's1co6', type: 'qcm', prompt: 'Quel modèle est le plus avantageux pour les salariés ?', options: ['35 heures sur quatre jours', 'Moins d\'heures pour le même salaire', 'Quatre jours avec un salaire réduit', 'Cinq jours plus courts'], answer: 1, explanation: 'Travailler moins d\'heures pour le même salaire.' },
          { id: 's1co7', type: 'qcm', prompt: 'Pourquoi le second modèle est-il « discutable » ?', options: ['Il coûte trop cher.', 'Les journées sont très longues et fatigantes.', 'Il est interdit par la loi.', 'Les salariés gagnent moins.'], answer: 1, explanation: 'Journées de près de neuf heures, salariés épuisés.' },
          { id: 's1co8', type: 'qcm', prompt: 'Quelle est la conclusion de la sociologue ?', options: ['Il faut généraliser la semaine de quatre jours.', 'C\'est un outil parmi d\'autres, pas une solution universelle.', 'C\'est une mauvaise idée.', 'Seuls les hôpitaux doivent l\'appliquer.'], answer: 1, explanation: '« pas une solution universelle, mais un outil parmi d\'autres ».' },
          { id: 's1co9', type: 'qcm', prompt: 'Pour quels métiers ce modèle est-il difficile ?', options: ['Les métiers de bureau', 'Ceux qui exigent une présence continue (hôpitaux, commerces)', 'Les métiers artistiques', 'L\'enseignement à distance'], answer: 1, explanation: 'Hôpitaux et commerces : présence continue.' },
          { id: 's1co10', type: 'qcm', prompt: 'Pour les employeurs, la semaine de quatre jours est surtout…', options: ['un moyen d\'économiser', 'un argument pour recruter', 'une obligation légale', 'une source de conflits'], answer: 1, explanation: 'Un argument pour recruter dans les secteurs en pénurie.' }
        ]
      }
    ],
    ce: [
      {
        title: 'Texte 1 — Les jardins partagés gagnent les villes',
        text: `Entre deux immeubles du quartier Saint-Sever, à Rouen, une ancienne friche est devenue en trois ans un jardin foisonnant. Tomates, courges, plantes aromatiques : une quarantaine d'habitants y cultivent chacun une parcelle, mais l'essentiel se joue ailleurs. « On vient pour les légumes, on reste pour les gens », résume Nadia, retraitée et membre de l'association qui gère le lieu.
Les jardins partagés se sont multipliés en France depuis une vingtaine d'années. Leur principe est simple : la commune met un terrain à disposition, une association s'engage à l'entretenir et à l'ouvrir au public plusieurs heures par semaine. Les avantages sont nombreux : création de lien social, sensibilisation des enfants à l'alimentation, retour de la biodiversité en ville.
Le modèle a pourtant ses limites. Les listes d'attente s'allongent et certains jardins peinent à attirer les habitants les plus éloignés de ce type d'initiative, notamment les jeunes actifs, qui manquent de temps. Par ailleurs, la pression immobilière pousse parfois les municipalités à récupérer les terrains pour y construire des logements. Pour les défenseurs des jardins, ces espaces devraient pourtant être considérés comme des équipements publics à part entière, au même titre qu'une bibliothèque ou un gymnase.`,
        questions: [
          { id: 's1ce1', type: 'qcm', prompt: 'Selon Nadia, quelle est la principale raison de rester au jardin ?', options: ['Les légumes', 'Les rencontres avec les autres', 'Le calme', 'Les économies'], answer: 1, explanation: '« on reste pour les gens » : le lien social.' },
          { id: 's1ce2', type: 'qcm', prompt: 'Qui entretient généralement un jardin partagé ?', options: ['La commune', 'Une association', 'Une entreprise privée', 'L\'État'], answer: 1, explanation: 'Une association s\'engage à l\'entretenir.' },
          { id: 's1ce3', type: 'qcm', prompt: 'Lequel de ces avantages n\'est PAS cité ?', options: ['Le lien social', 'La biodiversité', 'Les revenus pour la commune', 'L\'éducation alimentaire des enfants'], answer: 2, explanation: 'Aucun revenu pour la commune n\'est mentionné.' },
          { id: 's1ce4', type: 'qcm', prompt: 'Pourquoi les jeunes actifs fréquentent-ils peu ces jardins ?', options: ['Ils n\'aiment pas jardiner.', 'Ils manquent de temps.', 'Ils sont interdits.', 'C\'est trop cher.'], answer: 1, explanation: '« qui manquent de temps ».' },
          { id: 's1ce5', type: 'qcm', prompt: 'Quelle menace pèse sur certains jardins ?', options: ['La pollution', 'La construction de logements', 'Le manque d\'eau', 'Le vandalisme'], answer: 1, explanation: 'La pression immobilière.' },
          { id: 's1ce6', type: 'qcm', prompt: 'Que demandent les défenseurs des jardins ?', options: ['Qu\'ils deviennent payants', 'Qu\'ils soient reconnus comme des équipements publics', 'Qu\'ils soient fermés l\'hiver', 'Qu\'ils soient réservés aux retraités'], answer: 1, explanation: 'Équipements publics « au même titre qu\'une bibliothèque ».' }
        ]
      },
      {
        title: 'Texte 2 — Lire sur papier ou sur écran ?',
        text: `On a longtemps cru que le livre papier était condamné. Liseuses, tablettes et téléphones devaient le remplacer, comme le streaming a remplacé le disque. Or, il n'en est rien : en France, le livre imprimé représente encore l'immense majorité des ventes. Faut-il y voir une simple nostalgie ?
Plusieurs travaux de recherche suggèrent que non. Lorsqu'il s'agit de textes longs et complexes, la lecture sur papier favoriserait une meilleure compréhension. Les lecteurs se repèrent plus facilement dans l'espace physique du livre ; ils savent qu'une idée se trouvait « en haut d'une page de gauche », ce qui aide la mémoire. À l'écran, en revanche, on a tendance à survoler, à lire en diagonale, habitude prise sur Internet.
Il serait toutefois caricatural d'opposer les deux supports. L'écran offre des atouts indéniables : on peut agrandir les caractères, chercher un mot dans un dictionnaire intégré, emporter des centaines de livres en voyage. Pour les personnes malvoyantes ou les étudiants étrangers, ces fonctions changent tout. Le véritable enjeu n'est donc pas de choisir un camp, mais d'apprendre à lire de manière approfondie, quel que soit le support, et de réserver chacun d'eux aux usages pour lesquels il est le plus adapté.`,
        questions: [
          { id: 's1ce7', type: 'qcm', prompt: 'Que constate l\'auteur au début du texte ?', options: ['Le livre papier a disparu.', 'Le livre papier reste majoritaire dans les ventes.', 'Les liseuses sont interdites.', 'Le streaming a remplacé le livre.'], answer: 1, explanation: 'Le livre imprimé représente encore l\'immense majorité des ventes.' },
          { id: 's1ce8', type: 'qcm', prompt: 'Selon les recherches citées, le papier favorise…', options: ['une lecture plus rapide', 'une meilleure compréhension des textes longs', 'les achats impulsifs', 'la lecture en diagonale'], answer: 1, explanation: 'Meilleure compréhension pour les textes longs et complexes.' },
          { id: 's1ce9', type: 'qcm', prompt: 'Pourquoi le livre papier aide-t-il la mémoire ?', options: ['Il est plus lourd.', 'On se repère dans l\'espace physique des pages.', 'Il contient des images.', 'Il est plus cher.'], answer: 1, explanation: 'Se souvenir qu\'une idée était « en haut d\'une page de gauche ».' },
          { id: 's1ce10', type: 'qcm', prompt: 'Quel atout de l\'écran est mentionné ?', options: ['Il fatigue moins les yeux.', 'On peut agrandir les caractères.', 'Il est toujours gratuit.', 'Il améliore la concentration.'], answer: 1, explanation: 'Agrandir les caractères, dictionnaire intégré, transport facile.' },
          { id: 's1ce11', type: 'qcm', prompt: 'Quelle est la position finale de l\'auteur ?', options: ['Il faut abandonner les écrans.', 'Il faut choisir le papier.', 'Il faut apprendre à lire en profondeur et utiliser chaque support à bon escient.', 'Les deux supports sont identiques.'], answer: 2, explanation: 'Pas de camp à choisir : lire en profondeur, usage adapté.' },
          { id: 's1ce12', type: 'qcm', prompt: 'Dans « il serait toutefois caricatural d\'opposer les deux supports », l\'auteur…', options: ['introduit une concession / nuance', 'donne une conséquence', 'ajoute un exemple', 'conclut'], answer: 0, explanation: '« Toutefois » marque la nuance.' }
        ]
      }
    ],
    pe: {
      subject: 'Votre université envisage d\'interdire l\'usage des ordinateurs portables et des téléphones pendant les cours magistraux. Le journal des étudiants ouvre un débat. Vous rédigez un article argumenté dans lequel vous donnez votre opinion sur cette mesure, en vous appuyant sur des exemples précis.',
      type: 'Article d\'opinion (avec un titre)',
      minWords: 250
    },
    po: {
      document: `MUSÉES : ET SI L'ENTRÉE DEVENAIT GRATUITE POUR TOUS ?
Plusieurs villes européennes ont rendu leurs musées municipaux gratuits. Leurs défenseurs affirment que la culture doit être accessible à chacun, quels que soient ses revenus. Les sceptiques répondent que la gratuité ne suffit pas à attirer de nouveaux publics et qu'elle prive les musées de ressources indispensables à l'entretien des collections.`,
      instructions: 'Dégagez le problème soulevé par le document. Présentez ensuite votre opinion sous la forme d\'un exposé argumenté et organisé, avec des exemples. Puis répondez aux questions de relance ci-dessous, à voix haute.',
      followUps: ['Les musées gratuits ne risquent-ils pas d\'être envahis par les touristes ?', 'Qui devrait payer l\'entretien des collections si l\'entrée est gratuite ?', 'Dans votre pays, les musées sont-ils gratuits ? Qu\'en pensez-vous ?']
    }
  },
  {
    id: 'sujet-2',
    title: 'Sujet 2 — Consommer, voyager, s\'engager',
    co: [
      {
        title: 'Document 1 — Message d\'information',
        maxPlays: 2,
        script: `Information aux usagers : à partir du premier novembre, la médiathèque Simone-Veil élargit ses horaires d'ouverture. Elle sera désormais ouverte du mardi au samedi de dix heures à vingt heures, et le dimanche de quatorze heures à dix-huit heures. Le lundi reste un jour de fermeture. Cette extension a été rendue possible grâce au recrutement de trois agents supplémentaires et au soutien de la région. L'inscription reste gratuite pour les moins de vingt-six ans et pour les demandeurs d'emploi. Pour les autres usagers, la carte annuelle passe de quinze à douze euros. Enfin, un espace de travail silencieux de quarante places sera ouvert au premier étage pendant les périodes d'examens.`,
        questions: [
          { id: 's2co1', type: 'qcm', prompt: 'Quel jour la médiathèque est-elle fermée ?', options: ['Le dimanche', 'Le lundi', 'Le samedi', 'Le mardi'], answer: 1, explanation: '« Le lundi reste un jour de fermeture ».' },
          { id: 's2co2', type: 'qcm', prompt: 'Qu\'est-ce qui a permis d\'élargir les horaires ?', options: ['Une hausse des tarifs', 'Le recrutement de trois agents et le soutien de la région', 'Des bénévoles', 'La fermeture d\'une autre médiathèque'], answer: 1, explanation: 'Trois agents supplémentaires + soutien de la région.' },
          { id: 's2co3', type: 'qcm', prompt: 'Combien coûte désormais la carte annuelle pour un adulte de 40 ans qui travaille ?', options: ['Gratuite', '12 euros', '15 euros', '26 euros'], answer: 1, explanation: 'Elle passe de 15 à 12 euros.' },
          { id: 's2co4', type: 'qcm', prompt: 'Que propose-t-on pendant les périodes d\'examens ?', options: ['Des cours gratuits', 'Un espace de travail silencieux', 'Des horaires réduits', 'Des examens blancs'], answer: 1, explanation: 'Un espace de travail silencieux de quarante places.' }
        ]
      },
      {
        title: 'Document 2 — Les jeunes et le bénévolat',
        maxPlays: 2,
        script: `— Thomas Leroy, vous dirigez une association qui met en relation des jeunes et des structures qui cherchent des bénévoles. On entend souvent dire que les jeunes s'engagent moins qu'avant. Qu'en pensez-vous ?
— C'est une idée reçue. Les jeunes s'engagent autant, mais différemment. Ils sont moins attirés par l'adhésion à long terme à une grande organisation, avec des réunions mensuelles et des statuts. En revanche, ils répondent présents pour des missions ponctuelles et concrètes : distribuer des repas un samedi, nettoyer une plage, accompagner des personnes âgées pendant l'été. Ils veulent voir rapidement l'impact de leur action.
— Le numérique a-t-il joué un rôle ?
— Énorme. Aujourd'hui, on trouve une mission en trois clics, depuis son téléphone. Mais cela a aussi un inconvénient : l'engagement devient parfois un peu « consommable ». On s'inscrit, on se désinscrit facilement. Pour les associations, c'est un vrai défi d'organisation. Notre rôle, c'est justement d'aider les structures à s'adapter, par exemple en proposant des formats courts, tout en donnant envie aux jeunes de revenir.`,
        questions: [
          { id: 's2co5', type: 'qcm', prompt: 'Selon Thomas Leroy, l\'idée que les jeunes s\'engagent moins est…', options: ['vraie', 'une idée reçue', 'prouvée par des études', 'sans importance'], answer: 1, explanation: '« C\'est une idée reçue ».' },
          { id: 's2co6', type: 'qcm', prompt: 'Quel type d\'engagement les jeunes préfèrent-ils ?', options: ['L\'adhésion longue à une grande organisation', 'Des missions ponctuelles et concrètes', 'Les réunions mensuelles', 'Les dons d\'argent'], answer: 1, explanation: 'Missions ponctuelles et concrètes.' },
          { id: 's2co7', type: 'qcm', prompt: 'Quel inconvénient du numérique est mentionné ?', options: ['Les missions sont trop chères.', 'L\'engagement devient « consommable » : on s\'inscrit et se désinscrit facilement.', 'Les jeunes n\'ont pas de téléphone.', 'Les associations refusent Internet.'], answer: 1, explanation: 'Engagement « consommable ».' },
          { id: 's2co8', type: 'qcm', prompt: 'Quel est le rôle de l\'association de Thomas Leroy ?', options: ['Collecter des fonds', 'Aider les structures à s\'adapter et donner envie aux jeunes de revenir', 'Organiser des voyages', 'Former des enseignants'], answer: 1, explanation: 'Aider les structures à s\'adapter, proposer des formats courts.' },
          { id: 's2co9', type: 'qcm', prompt: 'Que veulent voir rapidement les jeunes ?', options: ['Leur nom dans le journal', 'L\'impact de leur action', 'Une récompense', 'Un diplôme'], answer: 1, explanation: '« voir rapidement l\'impact de leur action ».' },
          { id: 's2co10', type: 'qcm', prompt: 'Lequel de ces exemples de mission est cité ?', options: ['Construire une école', 'Nettoyer une plage', 'Donner des cours de langue', 'Garder des animaux'], answer: 1, explanation: 'Distribuer des repas, nettoyer une plage, accompagner des personnes âgées.' }
        ]
      }
    ],
    ce: [
      {
        title: 'Texte 1 — La seconde main, nouvelle norme ?',
        text: `Il y a dix ans, acheter un vêtement d'occasion relevait souvent de la nécessité ou d'un goût pour le « vintage ». Aujourd'hui, la seconde main s'est banalisée : applications de revente entre particuliers, rayons dédiés dans les grandes enseignes, friperies branchées en centre-ville. Selon plusieurs études de marché, près d'un Français sur deux a déjà acheté un vêtement d'occasion au cours de l'année.
Les motivations sont multiples. L'argument économique reste le premier : on s'habille pour moins cher, et on revend ce qu'on ne porte plus. Vient ensuite la préoccupation écologique, l'industrie textile étant l'une des plus polluantes au monde. Enfin, certains y voient un moyen d'affirmer un style personnel, loin des collections uniformes.
Le tableau n'est cependant pas idyllique. Des chercheurs observent un « effet rebond » : grâce à la revente, certains consommateurs achètent davantage de vêtements neufs, sachant qu'ils pourront s'en débarrasser facilement. Par ailleurs, les colis envoyés d'un bout à l'autre du pays ont eux aussi un coût environnemental. La seconde main n'est donc vertueuse que si elle remplace réellement l'achat neuf, au lieu de s'y ajouter.`,
        questions: [
          { id: 's2ce1', type: 'qcm', prompt: 'Comment la seconde main était-elle perçue il y a dix ans ?', options: ['Comme une mode générale', 'Comme une nécessité ou un goût pour le vintage', 'Comme interdite', 'Comme un luxe'], answer: 1, explanation: '« relevait souvent de la nécessité ou d\'un goût pour le vintage ».' },
          { id: 's2ce2', type: 'qcm', prompt: 'Quelle est la première motivation des acheteurs ?', options: ['L\'écologie', 'L\'économie', 'Le style', 'La qualité'], answer: 1, explanation: '« L\'argument économique reste le premier ».' },
          { id: 's2ce3', type: 'qcm', prompt: 'Que désigne l\'« effet rebond » ?', options: ['Les prix de l\'occasion augmentent.', 'On achète plus de neuf car on sait qu\'on pourra revendre.', 'Les friperies ferment.', 'Les colis se perdent.'], answer: 1, explanation: 'La revente encourage l\'achat de neuf.' },
          { id: 's2ce4', type: 'qcm', prompt: 'Quel autre problème environnemental est cité ?', options: ['Le lavage des vêtements', 'L\'envoi des colis à travers le pays', 'Le plastique des étiquettes', 'L\'éclairage des magasins'], answer: 1, explanation: 'Les colis ont un coût environnemental.' },
          { id: 's2ce5', type: 'qcm', prompt: 'Selon la conclusion, la seconde main est vertueuse si…', options: ['elle est moins chère', 'elle remplace l\'achat neuf au lieu de s\'y ajouter', 'elle est vendue en magasin', 'elle concerne les marques de luxe'], answer: 1, explanation: 'Remplacer et non s\'ajouter.' }
        ]
      },
      {
        title: 'Texte 2 — Le surtourisme, rançon du succès',
        text: `Venise, Barcelone, Dubrovnik, mais aussi le Mont-Saint-Michel ou certaines calanques de Marseille : partout, le même constat s'impose. Trop de visiteurs, concentrés aux mêmes endroits, aux mêmes moments, finissent par dégrader ce qu'ils sont venus admirer. Les habitants, eux, voient les loyers grimper sous l'effet des locations touristiques et les commerces de proximité céder la place aux boutiques de souvenirs.
Face à ce phénomène, les solutions se multiplient. Certaines villes instaurent une taxe d'entrée pour les visiteurs à la journée ; d'autres limitent le nombre de places grâce à des réservations obligatoires. Ces mesures ont fait leurs preuves dans certains sites naturels, où la fréquentation a pu être divisée par deux sans nuire à l'économie locale.
Reste une question délicate : celle de l'équité. Faire payer l'accès à un lieu, c'est prendre le risque de le réserver aux plus aisés. Pour certains spécialistes, la réponse passe moins par la restriction que par la diffusion : mieux faire connaître des destinations moins célèbres, encourager les voyages hors saison, développer les transports vers les régions délaissées. Autrement dit, il ne s'agirait pas de voyager moins, mais de voyager autrement.`,
        questions: [
          { id: 's2ce6', type: 'qcm', prompt: 'Quel est le constat commun à toutes ces destinations ?', options: ['Elles manquent de touristes.', 'Trop de visiteurs dégradent les lieux.', 'Elles sont trop chères.', 'Elles sont mal desservies.'], answer: 1, explanation: 'Concentration excessive de visiteurs.' },
          { id: 's2ce7', type: 'qcm', prompt: 'Quelle conséquence pour les habitants est mentionnée ?', options: ['La baisse des loyers', 'La hausse des loyers à cause des locations touristiques', 'L\'ouverture de nouvelles écoles', 'La gratuité des transports'], answer: 1, explanation: 'Les loyers grimpent.' },
          { id: 's2ce8', type: 'qcm', prompt: 'Quel résultat ont eu certaines mesures dans des sites naturels ?', options: ['La fermeture définitive', 'Une fréquentation divisée par deux sans nuire à l\'économie locale', 'Une hausse de la pollution', 'Des manifestations'], answer: 1, explanation: 'Fréquentation divisée par deux sans dommage économique.' },
          { id: 's2ce9', type: 'qcm', prompt: 'Quel risque pose une taxe d\'accès ?', options: ['Réserver les lieux aux plus aisés', 'Augmenter le nombre de touristes', 'Faire disparaître les souvenirs', 'Réduire les impôts'], answer: 0, explanation: 'Question de l\'équité.' },
          { id: 's2ce10', type: 'qcm', prompt: 'Que proposent « certains spécialistes » ?', options: ['Interdire le tourisme', 'Voyager autrement : destinations moins connues, hors saison', 'Doubler les taxes', 'Construire plus d\'hôtels'], answer: 1, explanation: '« non pas voyager moins, mais voyager autrement ».' },
          { id: 's2ce11', type: 'qcm', prompt: 'Dans le texte, « délaissées » signifie…', options: ['très visitées', 'abandonnées, négligées', 'dangereuses', 'protégées'], answer: 1, explanation: 'Délaisser = 소홀히 하다, 방치하다.' }
        ]
      }
    ],
    pe: {
      subject: 'La mairie de votre ville a annoncé la transformation d\'un parc du centre-ville en parking de 300 places. Vous habitez à proximité. Vous écrivez une lettre formelle au maire pour exprimer votre position sur ce projet, en développant des arguments précis et en proposant, si vous le souhaitez, une solution alternative.',
      type: 'Lettre formelle',
      minWords: 250
    },
    po: {
      document: `ÉCRANS : FAUT-IL FIXER UN ÂGE MINIMUM ?
Des médecins recommandent d'éviter les écrans avant trois ans et de limiter leur usage ensuite. Certains parents estiment que c'est à la loi d'intervenir, par exemple en interdisant les réseaux sociaux avant quinze ans. D'autres jugent que l'éducation au numérique, à l'école et en famille, est plus efficace que l'interdiction.`,
      instructions: 'Dégagez le problème soulevé par le document. Présentez ensuite votre opinion sous la forme d\'un exposé argumenté et organisé, avec des exemples. Puis répondez aux questions de relance ci-dessous, à voix haute.',
      followUps: ['Une interdiction par la loi est-elle vraiment applicable ?', 'Les écrans n\'ont-ils pas aussi des effets positifs sur l\'apprentissage ?', 'Comment les écrans sont-ils encadrés pour les enfants en Corée ?']
    }
  }
]
