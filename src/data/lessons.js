/**
 * LEÇONS — contenu original, rédigé pour des étudiants coréanophones.
 * Déroulé d'une leçon : 1) Cours  2) Erreurs fréquentes  3) Glossaire
 *                      4) Vérification (≥ 75 % pour valider)  5) Exercices (3 niveaux)
 *
 * Format d'une question :
 *   { id, type: 'qcm', prompt, sentence?, options: [...], answer: index, explanation, explanationKo? }
 *   { id, type: 'input', prompt, sentence?, answer: ['réponse acceptée', ...], explanation }
 *   { id, type: 'order', prompt, words: [...], answer: 'phrase correcte', explanation }
 * Dans `body`, **gras** et retours à la ligne sont pris en charge.
 * Pour ajouter une leçon : copier un objet, changer l'id, remplir les champs.
 */

export const LEVELS = [
  { id: 'A1', label: 'A1', name: 'Découverte', ko: '입문' },
  { id: 'A2', label: 'A2', name: 'Survie', ko: '초급' },
  { id: 'B1', label: 'B1', name: 'Seuil', ko: '중급' },
  { id: 'B2', label: 'B2', name: 'Avancé — objectif', ko: '중상급 — 목표' },
  { id: 'C1', label: 'C1', name: 'Autonome', ko: '고급' }
]

export const LESSONS = [
  // ───────────────────────────────── A1 — prononciation
  {
    id: 'a1-prononciation',
    level: 'A1',
    title: 'Prononciation : les sons difficiles pour les coréanophones',
    titleKo: '발음: 한국어 화자에게 어려운 소리',
    minutes: 25,
    objectives: ['Distinguer les voyelles nasales (an, on, in)', 'Distinguer u / ou, f / v et p / b', 'Comprendre le r français et la liaison'],
    sections: [
      {
        title: 'Les voyelles nasales',
        body: `Le français a trois **voyelles nasales** : l'air passe aussi par le nez.
**an / en** [ɑ̃] : lent, vent, enfant. **on** [ɔ̃] : long, bon, vont. **in / un** [ɛ̃] : lin, vin, pain.
Attention : ce n'est pas « 안, 온, 인 ». **On ne prononce pas de n final** : la langue ne touche pas le palais.`,
        examples: [
          { fr: 'lent', ko: '느린' }, { fr: 'long', ko: '긴' }, { fr: 'lin', ko: '아마 (식물)' },
          { fr: 'Le vent est fort.', ko: '바람이 세다.' }
        ]
      },
      {
        title: 'U et OU',
        body: `**u** [y] : lèvres arrondies comme pour « 우 », mais la langue reste à la place de « 이 ».
**ou** [u] : proche du « 우 » coréen.
Ces deux sons changent le sens du mot : tu / tout, vu / vous, rue / roue, dessus / dessous.`,
        examples: [
          { fr: 'tu', ko: '너' }, { fr: 'tout', ko: '모두' },
          { fr: 'La rue est longue.', ko: '거리가 길다.' }, { fr: 'La roue est cassée.', ko: '바퀴가 망가졌다.' }
        ]
      },
      {
        title: 'F / V et P / B',
        body: `Le coréen n'a ni **f** ni **v** : on a tendance à dire « 파 » ou « 바 ».
**f** : dents du haut posées sur la lèvre du bas, on souffle. **v** : même position, la gorge vibre.
**p** et **b** se font avec les deux lèvres. Le **b** français vibre davantage que le ㅂ coréen.
Paires à distinguer : fou / pou, vin / bain, vous / bout.`,
        examples: [
          { fr: 'Un verre de vin.', ko: '와인 한 잔.' }, { fr: 'Je prends un bain.', ko: '목욕을 해요.' }
        ]
      },
      {
        title: 'Le R français',
        body: `Le **r** français n'a rien à voir avec le ㄹ. Le bout de la langue reste derrière les dents du bas ; le son se fait **au fond de la gorge**, près de la luette, comme un léger raclement.
Si on le prononce comme ㄹ, on entend un **l** : riz (쌀) devient lit (침대).`,
        examples: [
          { fr: 'Paris', ko: '파리' }, { fr: 'Il est très rare.', ko: '그것은 매우 드물다.' }
        ]
      },
      {
        title: 'Lettres muettes et liaison',
        body: `La plupart des **consonnes finales ne se prononcent pas** : petit, vous, grand, les.
Mais devant un mot qui commence par une voyelle, la consonne se prononce et s'attache au mot suivant : c'est la **liaison**. les‿amis [lezami], vous‿avez [vuzave], un‿enfant.
Pas de liaison après **et** : « et alors » [e alɔʁ].`,
        examples: [
          { fr: 'Les amis arrivent.', ko: '친구들이 도착한다.' }, { fr: 'Vous avez un enfant ?', ko: '아이가 있으세요?' }
        ]
      }
    ],
    mistakes: [
      { wrong: '« bon » prononcé « 본 » (avec un n final)', right: '« bon » [bɔ̃] : voyelle nasale, sans n', why: 'Le n d\'une voyelle nasale ne se prononce pas.', whyKo: '비모음의 n은 받침처럼 발음하지 않습니다.' },
      { wrong: '« vous » prononcé comme « vu »', right: 'vous [vu] ≠ vu [vy]', why: 'u et ou sont deux sons différents.', whyKo: 'u와 ou는 다른 소리입니다.' },
      { wrong: '« vin » prononcé « 빈 »', right: 'vin [vɛ̃] : dents sur la lèvre', why: 'Le v n\'est pas un ㅂ.', whyKo: 'v는 ㅂ이 아닙니다. 윗니를 아랫입술에 대세요.' },
      { wrong: '« les livres » prononcé [lezlivʁ]', right: '[le livʁ]', why: 'Pas de liaison devant une consonne : le s reste muet.', whyKo: '자음 앞에서는 연음하지 않으므로 s를 발음하지 않습니다.' }
    ],
    glossary: [
      { fr: 'une voyelle nasale', ko: '비모음' },
      { fr: 'la liaison', ko: '연음' },
      { fr: 'une consonne muette', ko: '발음하지 않는 자음, 묵음' },
      { fr: 'la luette', ko: '목젖' },
      { fr: 'les lèvres (f.)', ko: '입술' },
      { fr: 'la langue', ko: '혀; 언어' }
    ],
    check: [
      { id: 'pr-c1', type: 'qcm', audio: 'vous', prompt: 'Écoutez : quel mot entendez-vous ?', options: ['vu', 'vous'], answer: 1, explanation: 'vous [vu] — son « ou ».', explanationKo: '"우" 소리: vous.' },
      { id: 'pr-c2', type: 'qcm', audio: 'long', prompt: 'Écoutez : quel mot entendez-vous ?', options: ['lent', 'long', 'lin'], answer: 1, explanation: 'long [lɔ̃] — nasale « on ».' },
      { id: 'pr-c3', type: 'qcm', prompt: 'Comment prononce-t-on « les amis » ?', options: ['[le ami]', '[lezami]', '[lesami]'], answer: 1, explanation: 'Liaison : le s se prononce [z] devant une voyelle.', explanationKo: '모음 앞에서 s는 [z]로 연음됩니다.' },
      { id: 'pr-c4', type: 'qcm', prompt: 'Où se prononce le r français ?', options: ['Comme le ㄹ coréen', 'Au fond de la gorge, près de la luette', 'Avec le bout de la langue qui vibre', 'On ne le prononce jamais'], answer: 1, explanation: 'Le r français est uvulaire : au fond de la gorge.', explanationKo: '프랑스어 r은 목 안쪽(목젖 근처)에서 냅니다.' }
    ],
    practice: {
      facile: [
        { id: 'pr-f1', type: 'qcm', audio: 'rue', prompt: 'Écoutez : quel mot entendez-vous ?', options: ['rue', 'roue'], answer: 0, explanation: 'rue [ʁy] — son « u ».' },
        { id: 'pr-f2', type: 'qcm', audio: 'vin', prompt: 'Écoutez : quel mot entendez-vous ?', options: ['vin', 'bain'], answer: 0, explanation: 'vin [vɛ̃] — v avec les dents.' },
        { id: 'pr-f3', type: 'qcm', audio: 'tu', prompt: 'Écoutez : quel mot entendez-vous ?', options: ['tu', 'tout'], answer: 0, explanation: 'tu [ty] — son « u ».' }
      ],
      moyen: [
        { id: 'pr-m1', type: 'qcm', audio: 'pain', prompt: 'Écoutez : quel mot entendez-vous ?', options: ['bain', 'pain', 'vin'], answer: 1, explanation: 'pain [pɛ̃] — p, sans vibration.' },
        { id: 'pr-m2', type: 'qcm', audio: 'vent', prompt: 'Écoutez : quel mot entendez-vous ?', options: ['vent', 'vont', 'vin'], answer: 0, explanation: 'vent [vɑ̃] — nasale « an/en ».' },
        { id: 'pr-m3', type: 'qcm', audio: 'dessous', prompt: 'Écoutez : quel mot entendez-vous ?', options: ['dessus', 'dessous'], answer: 1, explanation: 'dessous [dəsu] — son « ou ».' }
      ],
      difficile: [
        { id: 'pr-d1', type: 'qcm', audio: 'fou', prompt: 'Écoutez : quel mot entendez-vous ?', options: ['fou', 'pou', 'vous'], answer: 0, explanation: 'fou [fu] — f soufflé.' },
        { id: 'pr-d2', type: 'qcm', prompt: 'Dans quelle expression fait-on une liaison ?', options: ['les enfants', 'et alors', 'un garçon', 'vous parlez'], answer: 0, explanation: 'les‿enfants : s + voyelle. Jamais de liaison après « et ».' },
        { id: 'pr-d3', type: 'qcm', audio: 'bon', prompt: 'Écoutez : quel mot entendez-vous ?', options: ['banc', 'bon', 'bain'], answer: 1, explanation: 'bon [bɔ̃] — nasale « on ».' }
      ]
    }
  },

  // ───────────────────────────────── A1
  {
    id: 'a1-presenter',
    level: 'A1',
    title: 'Se présenter : être, avoir et les articles',
    titleKo: '자기소개: être, avoir 동사와 관사',
    minutes: 20,
    objectives: ['Conjuguer être et avoir au présent', 'Choisir le bon article (un, une, le, la, l\', les)', 'Dire son âge et sa profession sans erreur'],
    sections: [
      {
        title: 'Être et avoir au présent',
        body: `En français, le verbe change selon le sujet — ce n'est pas le cas en coréen. Être et avoir sont les deux verbes les plus importants : il faut les connaître par cœur.
**Être** : je suis, tu es, il/elle/on est, nous sommes, vous êtes, ils/elles sont.
**Avoir** : j'ai, tu as, il/elle/on a, nous avons, vous avez, ils/elles ont.
Devant une voyelle, **je** devient **j'** : j'ai, j'habite.`,
        ko: '프랑스어 동사는 주어에 따라 형태가 바뀝니다. être(~이다)와 avoir(가지다)는 반드시 외워야 합니다.',
        examples: [
          { fr: 'Je suis coréenne et j\'habite à Séoul.', ko: '저는 한국인(여성)이고 서울에 살아요.' },
          { fr: 'Nous sommes étudiants.', ko: '우리는 학생이에요.' },
          { fr: 'Vous avez un stylo ?', ko: '펜 있으세요?' }
        ]
      },
      {
        title: 'Le genre des noms et les articles',
        body: `Chaque nom français est **masculin** ou **féminin**. Le coréen n'a pas d'article : en français, on en met presque toujours un devant le nom.
**Article indéfini** (une chose non précisée) : un (masc.), une (fém.), des (pluriel).
**Article défini** (une chose connue ou générale) : le (masc.), la (fém.), l' (devant voyelle ou h muet), les (pluriel).
Apprenez toujours un nom **avec son article** : « une table », « un livre », « l'école (f.) ».`,
        ko: '모든 명사는 남성 또는 여성입니다. 명사는 항상 관사와 함께 외우세요.',
        examples: [
          { fr: 'J\'ai un frère et une sœur.', ko: '저는 남자 형제 한 명과 여자 형제 한 명이 있어요.' },
          { fr: 'L\'école est près de la gare.', ko: '학교는 역 근처에 있어요.' },
          { fr: 'J\'aime le café et les croissants.', ko: '저는 커피와 크루아상을 좋아해요.' }
        ]
      },
      {
        title: 'L\'âge et la profession',
        body: `**L'âge se dit avec avoir** : « J'ai 25 ans » (littéralement : j'ai 25 années). Jamais « je suis 25 ans ».
**La profession, après être, se dit sans article** : « Je suis infirmière », « Il est ingénieur ».
Mais avec une description, l'article revient : « C'est un ingénieur très compétent ».`,
        ko: '나이는 avoir로 말합니다 (J\'ai 25 ans). 직업은 être 뒤에 관사 없이 씁니다 (Je suis infirmière).',
        examples: [
          { fr: 'Elle a trente ans. Elle est médecin.', ko: '그녀는 서른 살이에요. 의사예요.' },
          { fr: 'C\'est un professeur sympathique.', ko: '친절한 선생님이에요.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Je suis 25 ans.', right: 'J\'ai 25 ans.', why: 'L\'âge se dit avec avoir.', whyKo: '나이는 avoir를 사용합니다.' },
      { wrong: 'Je suis un étudiant.', right: 'Je suis étudiant.', why: 'Pas d\'article après être + profession/statut.', whyKo: 'être + 직업/신분 뒤에는 관사를 쓰지 않습니다.' },
      { wrong: 'Le école', right: 'L\'école', why: 'Le/la deviennent l\' devant une voyelle.', whyKo: '모음 앞에서 le/la는 l\'가 됩니다.' },
      { wrong: 'Je ai', right: 'J\'ai', why: 'Je devient j\' devant une voyelle.', whyKo: '모음 앞에서 je는 j\'가 됩니다.' }
    ],
    glossary: [
      { fr: 's\'appeler', ko: '이름이 ~이다', note: 'Je m\'appelle Minji.' },
      { fr: 'habiter', ko: '살다', note: 'J\'habite à Busan.' },
      { fr: 'un an', ko: '살(나이), 년' },
      { fr: 'un étudiant / une étudiante', ko: '학생' },
      { fr: 'coréen / coréenne', ko: '한국인, 한국의 (남/여)' },
      { fr: 'une profession', ko: '직업' }
    ],
    check: [
      { id: 'a1p-c1', type: 'qcm', prompt: 'Complétez :', sentence: 'Nous ___ étudiants à Lyon.', options: ['sommes', 'êtes', 'sont', 'est'], answer: 0, explanation: 'Nous + être = nous sommes.' },
      { id: 'a1p-c2', type: 'qcm', prompt: 'Complétez :', sentence: 'J\'___ 22 ans.', options: ['suis', 'ai', 'as', 'est'], answer: 1, explanation: 'L\'âge se dit avec avoir : j\'ai 22 ans.', explanationKo: '나이는 avoir: j\'ai 22 ans.' },
      { id: 'a1p-c3', type: 'qcm', prompt: 'Quel article ?', sentence: '___ école est fermée.', options: ['Le', 'La', 'L\'', 'Un'], answer: 2, explanation: 'Devant une voyelle : l\'école.' },
      { id: 'a1p-c4', type: 'input', prompt: 'Conjuguez « être » :', sentence: 'Elle ___ professeure.', answer: ['est'], explanation: 'Elle est (être, 3e personne du singulier).' }
    ],
    practice: {
      facile: [
        { id: 'a1p-f1', type: 'qcm', prompt: 'Complétez :', sentence: 'Tu ___ un chat ?', options: ['as', 'a', 'es', 'ai'], answer: 0, explanation: 'Tu + avoir = tu as.' },
        { id: 'a1p-f2', type: 'qcm', prompt: 'Quel article ?', sentence: 'C\'est ___ table.', options: ['un', 'une', 'des', 'l\''], answer: 1, explanation: 'Table est féminin : une table.' }
      ],
      moyen: [
        { id: 'a1p-m1', type: 'input', prompt: 'Conjuguez « avoir » :', sentence: 'Ils ___ deux enfants.', answer: ['ont'], explanation: 'Ils + avoir = ils ont.' },
        { id: 'a1p-m2', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['Je suis un médecin.', 'Je suis médecin.', 'J\'ai médecin.', 'Je suis le médecin de profession.'], answer: 1, explanation: 'Profession après être : sans article.' }
      ],
      difficile: [
        { id: 'a1p-d1', type: 'order', prompt: 'Remettez dans l\'ordre :', words: ['ans', 'a', 'Mon', 'frère', 'dix-huit'], answer: 'Mon frère a dix-huit ans', explanation: 'Sujet + avoir + nombre + ans.' },
        { id: 'a1p-d2', type: 'input', prompt: 'Traduisez en français : « 저는 학생이에요. » (je = homme)', answer: ['je suis étudiant'], explanation: 'Je suis étudiant (sans article).' }
      ]
    }
  },

  // ───────────────────────────────── A2
  {
    id: 'a2-passe-compose',
    level: 'A2',
    title: 'Le passé composé : avoir ou être ?',
    titleKo: '복합과거: avoir일까 être일까?',
    minutes: 25,
    objectives: ['Former le passé composé', 'Choisir l\'auxiliaire avoir ou être', 'Accorder le participe passé avec être'],
    sections: [
      {
        title: 'Formation',
        body: `Le passé composé raconte une **action terminée** dans le passé (comme -었/았- en coréen).
**Formation** : auxiliaire avoir ou être **au présent** + **participe passé**.
Participes réguliers : -er → **-é** (parler → parlé), -ir → **-i** (finir → fini), -re → **-u** (vendre → vendu).
Participes irréguliers à connaître : faire → **fait**, prendre → **pris**, voir → **vu**, avoir → **eu**, être → **été**, mettre → **mis**, lire → **lu**, écrire → **écrit**, venir → **venu**, boire → **bu**.`,
        ko: '복합과거 = 조동사(avoir/être 현재형) + 과거분사. 끝난 행동을 표현합니다.',
        examples: [
          { fr: 'Hier, j\'ai regardé un film.', ko: '어제 영화를 봤어요.' },
          { fr: 'Nous avons pris le train.', ko: '우리는 기차를 탔어요.' }
        ]
      },
      {
        title: 'Les verbes avec être',
        body: `La plupart des verbes utilisent **avoir**. Une quinzaine de verbes de **mouvement ou de changement d'état** utilisent **être** :
aller, venir, arriver, partir, entrer, sortir, monter, descendre, naître, mourir, rester, tomber, retourner, devenir, revenir.
**Tous les verbes pronominaux** (se lever, se promener, s'habiller…) utilisent aussi être.`,
        ko: '이동이나 상태 변화를 나타내는 약 15개 동사와 모든 대명동사는 être를 씁니다.',
        examples: [
          { fr: 'Je suis allé à Paris en mai.', ko: '저는 5월에 파리에 갔어요.' },
          { fr: 'Elle s\'est levée à sept heures.', ko: '그녀는 7시에 일어났어요.' }
        ]
      },
      {
        title: 'L\'accord avec être',
        body: `Avec **être**, le participe passé **s'accorde avec le sujet**, comme un adjectif :
féminin **+e**, pluriel **+s**, féminin pluriel **+es**.
Elle est partie. Ils sont arrivés. Mes sœurs sont venues.
Avec **avoir**, en général, pas d'accord : Elle a mangé.`,
        ko: 'être를 쓰면 과거분사를 주어의 성·수에 일치시킵니다 (여성 +e, 복수 +s).',
        examples: [
          { fr: 'Mes amies sont arrivées en retard.', ko: '내 (여자) 친구들이 늦게 도착했어요.' },
          { fr: 'Ils se sont rencontrés à Busan.', ko: '그들은 부산에서 만났어요.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'J\'ai allé au cinéma.', right: 'Je suis allé(e) au cinéma.', why: 'Aller utilise l\'auxiliaire être.', whyKo: 'aller는 être를 씁니다.' },
      { wrong: 'Elle est parti.', right: 'Elle est partie.', why: 'Avec être, accord au féminin.', whyKo: 'être와 함께면 여성형 일치.' },
      { wrong: 'Il a venu.', right: 'Il est venu.', why: 'Venir utilise être.', whyKo: 'venir는 être를 씁니다.' },
      { wrong: 'J\'ai prendu le bus.', right: 'J\'ai pris le bus.', why: 'Participe irrégulier : prendre → pris.', whyKo: 'prendre의 과거분사는 pris입니다.' }
    ],
    glossary: [
      { fr: 'le participe passé', ko: '과거분사' },
      { fr: 'un auxiliaire', ko: '조동사' },
      { fr: 'l\'accord (m.)', ko: '일치 (성·수)' },
      { fr: 'hier', ko: '어제' },
      { fr: 'la semaine dernière', ko: '지난주' },
      { fr: 'déjà', ko: '이미, 벌써' }
    ],
    check: [
      { id: 'a2pc-c1', type: 'qcm', prompt: 'Quel auxiliaire ?', sentence: 'Nous ___ partis tôt.', options: ['avons', 'sommes', 'avez', 'êtes'], answer: 1, explanation: 'Partir utilise être : nous sommes partis.' },
      { id: 'a2pc-c2', type: 'qcm', prompt: 'Complétez :', sentence: 'J\'ai ___ mes devoirs.', options: ['faire', 'fait', 'faisé', 'fais'], answer: 1, explanation: 'Faire → fait.' },
      { id: 'a2pc-c3', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['Elle est arrivé.', 'Elle a arrivée.', 'Elle est arrivée.', 'Elle a arrivé.'], answer: 2, explanation: 'Arriver + être, accord au féminin : arrivée.' },
      { id: 'a2pc-c4', type: 'input', prompt: 'Participe passé de « voir » :', answer: ['vu'], explanation: 'Voir → vu.' }
    ],
    practice: {
      facile: [
        { id: 'a2pc-f1', type: 'qcm', prompt: 'Participe passé de « finir » :', options: ['finé', 'fini', 'finu', 'finit'], answer: 1, explanation: '-ir → -i.' },
        { id: 'a2pc-f2', type: 'qcm', prompt: 'Complétez :', sentence: 'Tu ___ mangé ?', options: ['as', 'es', 'a', 'est'], answer: 0, explanation: 'Manger utilise avoir : tu as mangé.' }
      ],
      moyen: [
        { id: 'a2pc-m1', type: 'input', prompt: 'Mettez au passé composé (elle) :', sentence: 'Elle (tomber) dans l\'escalier.', answer: ['est tombée', 'elle est tombée'], explanation: 'Tomber + être, accord : est tombée.' },
        { id: 'a2pc-m2', type: 'qcm', prompt: 'Complétez :', sentence: 'Ils se ___ à minuit.', options: ['sont couché', 'ont couchés', 'sont couchés', 'sont couchées'], answer: 2, explanation: 'Pronominal → être ; ils → accord masculin pluriel.' }
      ],
      difficile: [
        { id: 'a2pc-d1', type: 'input', prompt: 'Passé composé (nous, mixte) :', sentence: 'Nous (venir) en voiture.', answer: ['sommes venus', 'nous sommes venus'], explanation: 'Venir + être, masculin pluriel par défaut : venus.' },
        { id: 'a2pc-d2', type: 'order', prompt: 'Remettez dans l\'ordre :', words: ['ne', 'Je', 'pas', 'suis', 'sorti'], answer: 'Je ne suis pas sorti', explanation: 'La négation entoure l\'auxiliaire : ne + suis + pas + participe.' }
      ]
    }
  },

  // ───────────────────────────────── B1
  {
    id: 'b1-imparfait-pc',
    level: 'B1',
    title: 'Imparfait ou passé composé ?',
    titleKo: '반과거와 복합과거의 구별',
    minutes: 30,
    objectives: ['Former l\'imparfait', 'Distinguer le décor (imparfait) et les événements (passé composé)', 'Raconter un souvenir'],
    sections: [
      {
        title: 'Former l\'imparfait',
        body: `Prenez le verbe à la forme **nous** du présent, enlevez **-ons**, ajoutez : **-ais, -ais, -ait, -ions, -iez, -aient**.
nous finissons → je finissais ; nous prenons → je prenais ; nous faisons → je faisais.
Seule exception : **être → j'étais**.`,
        ko: '반과거 = nous 현재형 어간 + -ais, -ais, -ait, -ions, -iez, -aient. 예외: être → j\'étais.',
        examples: [
          { fr: 'Quand j\'étais enfant, j\'habitais à Daegu.', ko: '어렸을 때 저는 대구에 살았어요.' },
          { fr: 'Nous prenions le bus tous les matins.', ko: '우리는 매일 아침 버스를 타곤 했어요.' }
        ]
      },
      {
        title: 'Deux rôles différents',
        body: `Imaginez un film : l'**imparfait** est le **décor** (description, situation, habitude, action en cours), le **passé composé** fait **avancer l'histoire** (événements ponctuels, actions terminées).
**Imparfait** : il faisait beau, j'étais fatigué, je lisais tous les soirs, je dormais…
**Passé composé** : soudain, le téléphone a sonné ; je suis sorti ; j'ai vécu deux ans à Lyon (durée limitée et terminée).`,
        ko: '반과거는 배경·묘사·습관·진행 중인 행동, 복합과거는 이야기를 진행시키는 완료된 사건입니다. 한국어의 \'-곤 했다/-고 있었다\'와 \'-었다\'의 차이와 비슷합니다.',
        examples: [
          { fr: 'Je dormais quand le téléphone a sonné.', ko: '전화가 울렸을 때 저는 자고 있었어요.' },
          { fr: 'Il pleuvait, alors nous sommes restés à la maison.', ko: '비가 오고 있어서 우리는 집에 있었어요.' }
        ]
      },
      {
        title: 'Les mots qui aident',
        body: `Plutôt **imparfait** : autrefois, d'habitude, chaque jour, tous les étés, souvent, quand j'étais petit.
Plutôt **passé composé** : soudain, tout à coup, un jour, ce matin-là, pendant deux heures (durée fermée), trois fois.`,
        ko: '시간 표현이 힌트가 됩니다: d\'habitude(보통) → 반과거, soudain(갑자기) → 복합과거.',
        examples: [
          { fr: 'Tous les étés, nous allions à la mer.', ko: '매년 여름 우리는 바다에 가곤 했어요.' },
          { fr: 'Un jour, nous sommes allés en Bretagne.', ko: '어느 날 우리는 브르타뉴에 갔어요.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Quand j\'étais petit, je suis allé à la plage chaque été.', right: '… j\'allais à la plage chaque été.', why: 'Une habitude passée → imparfait.', whyKo: '과거의 습관 → 반과거.' },
      { wrong: 'Hier, je regardais la télé pendant trois heures.', right: 'Hier, j\'ai regardé la télé pendant trois heures.', why: 'Durée précise et terminée → passé composé.', whyKo: '정해진 기간의 끝난 행동 → 복합과거.' },
      { wrong: 'Je suis fatigué hier soir.', right: 'J\'étais fatigué hier soir.', why: 'Un état dans le passé → imparfait.', whyKo: '과거의 상태 → 반과거.' }
    ],
    glossary: [
      { fr: 'autrefois', ko: '예전에' },
      { fr: 'd\'habitude', ko: '보통, 평소에' },
      { fr: 'soudain / tout à coup', ko: '갑자기' },
      { fr: 'un souvenir', ko: '추억, 기억' },
      { fr: 'le décor', ko: '배경' },
      { fr: 'raconter', ko: '이야기하다' }
    ],
    check: [
      { id: 'b1ip-c1', type: 'qcm', prompt: 'Complétez :', sentence: 'Il ___ quand je suis sorti.', options: ['a plu', 'pleuvait', 'pleut', 'pleuvra'], answer: 1, explanation: 'Décor de l\'action → imparfait.' },
      { id: 'b1ip-c2', type: 'qcm', prompt: 'Complétez :', sentence: 'Soudain, quelqu\'un ___ à la porte.', options: ['frappait', 'a frappé', 'frappe', 'frapperait'], answer: 1, explanation: 'Soudain → événement ponctuel → passé composé.' },
      { id: 'b1ip-c3', type: 'input', prompt: 'Imparfait de « finir » (nous) :', answer: ['finissions', 'nous finissions'], explanation: 'nous finissons → finiss- + -ions.' },
      { id: 'b1ip-c4', type: 'qcm', prompt: 'Quelle phrase exprime une habitude ?', options: ['J\'ai pris le métro.', 'Je prenais le métro chaque matin.', 'J\'ai pris le métro trois fois.', 'Je prendrai le métro.'], answer: 1, explanation: 'Habitude passée → imparfait + chaque matin.' }
    ],
    practice: {
      facile: [
        { id: 'b1ip-f1', type: 'qcm', prompt: 'Imparfait de « être » (je) :', options: ['j\'étais', 'j\'été', 'j\'êtais', 'je suisais'], answer: 0, explanation: 'Être → ét- : j\'étais.' },
        { id: 'b1ip-f2', type: 'qcm', prompt: 'Complétez :', sentence: 'D\'habitude, nous ___ à 8 h.', options: ['avons commencé', 'commencions', 'commençons', 'commencerons'], answer: 1, explanation: 'D\'habitude → imparfait.' }
      ],
      moyen: [
        { id: 'b1ip-m1', type: 'input', prompt: 'Imparfait (je) :', sentence: 'Quand j\'(avoir) dix ans, je jouais au foot.', answer: ['avais', 'j\'avais'], explanation: 'nous avons → av- + -ais.' },
        { id: 'b1ip-m2', type: 'qcm', prompt: 'Complétez :', sentence: 'Nous ___ en Corée pendant deux ans, puis nous sommes rentrés.', options: ['vivions', 'avons vécu', 'vivons', 'vivrions'], answer: 1, explanation: 'Durée fermée et terminée → passé composé.' }
      ],
      difficile: [
        { id: 'b1ip-d1', type: 'qcm', prompt: 'Choisissez la suite correcte :', sentence: 'Je traversais la rue quand une voiture…', options: ['…passait trop vite.', '…est passée à toute vitesse.', '…passe.', '…passerait.'], answer: 1, explanation: 'Action en cours (imparfait) interrompue par un événement (passé composé).' },
        { id: 'b1ip-d2', type: 'input', prompt: 'Passé composé ou imparfait ? (elle, voir)', sentence: 'Ce matin-là, elle (voir) un accident.', answer: ['a vu', 'elle a vu'], explanation: 'Ce matin-là = moment précis → passé composé.' }
      ]
    }
  },
  {
    id: 'b1-relatifs',
    level: 'B1',
    title: 'Les pronoms relatifs : qui, que, où, dont',
    titleKo: '관계대명사: qui, que, où, dont',
    minutes: 25,
    objectives: ['Relier deux phrases avec un pronom relatif', 'Choisir entre qui, que, où et dont'],
    sections: [
      {
        title: 'Le principe',
        body: `Un pronom relatif relie deux phrases et évite de répéter un nom. En coréen, la précision vient **avant** le nom (읽은 책) ; en français, elle vient **après** : le livre **que j'ai lu**.
**Qui** remplace le **sujet** du verbe qui suit : L'homme **qui** parle est mon professeur.
**Que (qu')** remplace le **complément d'objet direct** : Le film **que** j'ai vu était long.`,
        ko: '한국어의 관형절(읽은 책)처럼 명사를 꾸미지만, 프랑스어에서는 명사 뒤에 옵니다. qui = 주어, que = 목적어.',
        examples: [
          { fr: 'J\'ai une amie qui parle trois langues.', ko: '저에게는 3개 국어를 하는 친구가 있어요.' },
          { fr: 'La ville que je préfère, c\'est Busan.', ko: '제가 가장 좋아하는 도시는 부산이에요.' }
        ]
      },
      {
        title: 'Où et dont',
        body: `**Où** remplace un **lieu** ou un **moment** : la ville **où** je suis né, le jour **où** nous nous sommes rencontrés.
**Dont** remplace un complément introduit par **de** : parler **de**, avoir besoin **de**, se souvenir **de**, être fier **de**, ou le complément d'un nom.
J'ai besoin **de ce livre** → C'est le livre **dont** j'ai besoin.`,
        ko: 'où = 장소나 시간, dont = de가 필요한 표현 (avoir besoin de, parler de 등).',
        examples: [
          { fr: 'C\'est le café où nous travaillons souvent.', ko: '우리가 자주 일하는 카페예요.' },
          { fr: 'Voici le projet dont je t\'ai parlé.', ko: '내가 너에게 말했던 프로젝트가 이거야.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Le livre que j\'ai besoin.', right: 'Le livre dont j\'ai besoin.', why: 'Avoir besoin de → dont.', whyKo: 'avoir besoin de → dont.' },
      { wrong: 'L\'homme que parle.', right: 'L\'homme qui parle.', why: 'L\'homme est sujet de « parle » → qui.', whyKo: '주어 역할 → qui.' },
      { wrong: 'Le jour que je suis arrivé.', right: 'Le jour où je suis arrivé.', why: 'Un moment → où.', whyKo: '시간 → où.' }
    ],
    glossary: [
      { fr: 'un pronom relatif', ko: '관계대명사' },
      { fr: 'avoir besoin de', ko: '~이 필요하다' },
      { fr: 'se souvenir de', ko: '~을 기억하다' },
      { fr: 'être fier de', ko: '~을 자랑스러워하다' },
      { fr: 'un antécédent', ko: '선행사' }
    ],
    check: [
      { id: 'b1r-c1', type: 'qcm', prompt: 'Complétez :', sentence: 'Le restaurant ___ nous avons dîné était excellent.', options: ['que', 'qui', 'où', 'dont'], answer: 2, explanation: 'Lieu → où.' },
      { id: 'b1r-c2', type: 'qcm', prompt: 'Complétez :', sentence: 'C\'est la chanson ___ j\'adore.', options: ['qui', 'que', 'dont', 'où'], answer: 1, explanation: 'J\'adore la chanson → COD → que.' },
      { id: 'b1r-c3', type: 'qcm', prompt: 'Complétez :', sentence: 'Le collègue ___ je me souviens s\'appelait Marc.', options: ['que', 'qui', 'dont', 'où'], answer: 2, explanation: 'Se souvenir de → dont.' },
      { id: 'b1r-c4', type: 'input', prompt: 'Complétez avec qui, que, où ou dont :', sentence: 'La femme ___ chante est ma voisine.', answer: ['qui'], explanation: 'Sujet de « chante » → qui.' }
    ],
    practice: {
      facile: [
        { id: 'b1r-f1', type: 'qcm', prompt: 'Complétez :', sentence: 'Le bus ___ va à la gare est en retard.', options: ['qui', 'que', 'dont', 'où'], answer: 0, explanation: 'Sujet → qui.' },
        { id: 'b1r-f2', type: 'qcm', prompt: 'Complétez :', sentence: 'La maison ___ j\'ai grandi.', options: ['que', 'où', 'qui', 'dont'], answer: 1, explanation: 'Lieu → où.' }
      ],
      moyen: [
        { id: 'b1r-m1', type: 'input', prompt: 'Complétez :', sentence: 'Voilà le dictionnaire ___ tu as besoin.', answer: ['dont'], explanation: 'Avoir besoin de → dont.' },
        { id: 'b1r-m2', type: 'qcm', prompt: 'Complétez :', sentence: 'L\'année ___ j\'ai eu mon diplôme, j\'ai déménagé.', options: ['que', 'où', 'dont', 'qui'], answer: 1, explanation: 'Un moment → où.' }
      ],
      difficile: [
        { id: 'b1r-d1', type: 'qcm', prompt: 'Complétez :', sentence: 'C\'est un écrivain ___ les romans sont traduits en coréen.', options: ['que', 'qui', 'dont', 'où'], answer: 2, explanation: 'Les romans de cet écrivain → complément du nom → dont.' },
        { id: 'b1r-d2', type: 'qcm', prompt: 'Complétez :', sentence: 'Le résultat ___ elle est le plus fière, c\'est son DELF.', options: ['que', 'dont', 'où', 'qui'], answer: 1, explanation: 'Être fier de → dont.' }
      ]
    }
  },

  // ───────────────────────────────── B2
  {
    id: 'b2-subjonctif',
    level: 'B2',
    title: 'Le subjonctif présent : quand et comment',
    titleKo: '접속법 현재: 언제, 어떻게 쓰나',
    minutes: 35,
    objectives: ['Former le subjonctif présent (réguliers et irréguliers)', 'Savoir quand il est obligatoire', 'Éviter les pièges : espérer, après que, même sujet'],
    sections: [
      {
        title: 'Formation',
        body: `Prenez le verbe à la forme **ils** du présent, enlevez **-ent**, ajoutez : **-e, -es, -e, -ions, -iez, -ent**.
ils finissent → que je finisse ; ils prennent → que je prenne ; ils partent → que je parte.
Pour **nous** et **vous**, la forme ressemble à l'imparfait : que nous prenions, que vous preniez.
**Irréguliers essentiels** : être → que je sois, qu'il soit, que nous soyons ; avoir → que j'aie, qu'il ait, que nous ayons ; faire → que je fasse ; aller → que j'aille, que nous allions ; pouvoir → que je puisse ; savoir → que je sache ; vouloir → que je veuille.`,
        ko: '접속법 = ils 현재형 어간 + -e, -es, -e, -ions, -iez, -ent. être, avoir, faire, aller, pouvoir, savoir, vouloir는 불규칙이므로 외워야 합니다.',
        examples: [
          { fr: 'Il faut que tu finisses ce dossier avant vendredi.', ko: '너는 금요일 전까지 이 서류를 끝내야 해.' },
          { fr: 'Je veux que vous soyez à l\'heure.', ko: '여러분이 제시간에 오기를 바랍니다.' }
        ]
      },
      {
        title: 'Quand l\'utiliser ?',
        body: `Le subjonctif exprime le regard **subjectif** du locuteur : ce qu'il veut, ressent ou met en doute. Le coréen n'a pas de mode équivalent ; il faut donc repérer les **déclencheurs** :
**Nécessité** : il faut que, il est nécessaire / important / essentiel que.
**Volonté** : je veux que, je souhaite que, je demande que, je préfère que.
**Sentiment** : je suis content que, je regrette que, j'ai peur que, c'est dommage que.
**Doute** : je doute que, je ne pense pas que, il est possible que.
**Conjonctions** : bien que, pour que, afin que, avant que, à condition que, sans que, jusqu'à ce que.`,
        ko: '접속법은 화자의 주관(의지·감정·의심·필요)을 나타냅니다. 한국어에는 없는 형태이므로 \'신호 표현\'을 외우세요.',
        examples: [
          { fr: 'Je suis ravie que tu viennes ce week-end.', ko: '네가 이번 주말에 온다니 정말 기뻐.' },
          { fr: 'Bien qu\'il soit fatigué, il continue à travailler.', ko: '그는 피곤하지만 계속 일한다.' },
          { fr: 'Je ne pense pas que ce soit une bonne idée.', ko: '그게 좋은 생각이라고는 생각하지 않아요.' }
        ]
      },
      {
        title: 'Les pièges',
        body: `**Espérer que** + **indicatif** : J'espère qu'il **viendra**. (Jamais « qu'il vienne ».)
**Penser / croire que** à la forme affirmative + indicatif : Je pense qu'il **a** raison. Mais à la forme négative ou interrogative : Je ne pense pas qu'il **ait** raison.
**Après que** + indicatif (norme) : après qu'il **est** parti. **Avant que** + subjonctif : avant qu'il **parte**.
**Même sujet → infinitif** : Je veux **partir** (pas « je veux que je parte »). Je suis content **d'être** ici.`,
        ko: 'espérer que → 직설법. 주절과 종속절의 주어가 같으면 부정사를 씁니다 (Je veux partir).',
        examples: [
          { fr: 'J\'espère que tu réussiras ton examen.', ko: '네가 시험에 합격하길 바라.' },
          { fr: 'Je voudrais partir avant qu\'il fasse nuit.', ko: '어두워지기 전에 떠나고 싶어요.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'J\'espère qu\'il vienne.', right: 'J\'espère qu\'il viendra / qu\'il vient.', why: 'Espérer que + indicatif.', whyKo: 'espérer que 뒤에는 직설법.' },
      { wrong: 'Bien qu\'il est malade, il travaille.', right: 'Bien qu\'il soit malade, il travaille.', why: 'Bien que + subjonctif.', whyKo: 'bien que 뒤에는 접속법.' },
      { wrong: 'Je veux que je parte.', right: 'Je veux partir.', why: 'Même sujet → infinitif.', whyKo: '주어가 같으면 부정사.' },
      { wrong: 'Il faut que tu fais attention.', right: 'Il faut que tu fasses attention.', why: 'Il faut que + subjonctif ; faire → fasse.', whyKo: 'il faut que + 접속법, faire → fasse.' }
    ],
    glossary: [
      { fr: 'le subjonctif', ko: '접속법' },
      { fr: 'l\'indicatif (m.)', ko: '직설법' },
      { fr: 'un déclencheur', ko: '유발 표현, 신호어' },
      { fr: 'bien que', ko: '~에도 불구하고, ~이지만' },
      { fr: 'à condition que', ko: '~라는 조건으로' },
      { fr: 'douter', ko: '의심하다' }
    ],
    check: [
      { id: 'b2s-c1', type: 'qcm', prompt: 'Complétez :', sentence: 'Il faut que nous ___ ce projet.', options: ['finissons', 'finissions', 'finirons', 'finissent'], answer: 1, explanation: 'Il faut que + subjonctif : que nous finissions.' },
      { id: 'b2s-c2', type: 'qcm', prompt: 'Complétez :', sentence: 'J\'espère qu\'elle ___ demain.', options: ['vienne', 'viendra', 'viendrait', 'vînt'], answer: 1, explanation: 'Espérer que + indicatif (futur).', explanationKo: 'espérer que + 직설법.' },
      { id: 'b2s-c3', type: 'input', prompt: 'Subjonctif de « être » :', sentence: 'Bien qu\'il ___ tard, nous continuons.', answer: ['soit'], explanation: 'Bien que + subjonctif : qu\'il soit.' },
      { id: 'b2s-c4', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['Je veux que je réussisse.', 'Je veux réussir.', 'Je veux que réussir.', 'Je veux de réussir.'], answer: 1, explanation: 'Même sujet → infinitif.' }
    ],
    practice: {
      facile: [
        { id: 'b2s-f1', type: 'qcm', prompt: 'Subjonctif de « avoir » (tu) :', options: ['que tu as', 'que tu aies', 'que tu ais', 'que tu ayes'], answer: 1, explanation: 'Que tu aies.' },
        { id: 'b2s-f2', type: 'qcm', prompt: 'Complétez :', sentence: 'Je suis content que tu ___ là.', options: ['es', 'sois', 'seras', 'étais'], answer: 1, explanation: 'Sentiment → subjonctif.' }
      ],
      moyen: [
        { id: 'b2s-m1', type: 'input', prompt: 'Subjonctif de « faire » (vous) :', sentence: 'Il est important que vous ___ des efforts.', answer: ['fassiez'], explanation: 'Faire → fass- : que vous fassiez.' },
        { id: 'b2s-m2', type: 'qcm', prompt: 'Complétez :', sentence: 'Je pense qu\'il ___ raison.', options: ['ait', 'a', 'aie', 'avait eu'], answer: 1, explanation: 'Penser (affirmatif) + indicatif.' }
      ],
      difficile: [
        { id: 'b2s-d1', type: 'qcm', prompt: 'Complétez :', sentence: 'Je ne crois pas qu\'il ___ venir.', options: ['peut', 'puisse', 'pourra', 'pouvait'], answer: 1, explanation: 'Croire à la forme négative → subjonctif : puisse.' },
        { id: 'b2s-d2', type: 'input', prompt: 'Subjonctif de « aller » (nous) :', sentence: 'Il faut que nous y ___ ensemble.', answer: ['allions'], explanation: 'Aller : que nous allions (radical de nous).' }
      ]
    }
  },
  {
    id: 'b2-connecteurs',
    level: 'B2',
    title: 'Les connecteurs logiques pour argumenter',
    titleKo: '논증을 위한 연결어',
    minutes: 30,
    objectives: ['Organiser un argument (ajout, opposition, cause, conséquence, but)', 'Nuancer avec la concession', 'Utiliser la bonne construction après chaque connecteur'],
    sections: [
      {
        title: 'Ajouter et structurer',
        body: `Au DELF B2, l'examinateur évalue la **cohérence** de vos textes : les connecteurs montrent le chemin de votre raisonnement.
**Introduire / énumérer** : tout d'abord, ensuite, par ailleurs, enfin.
**Ajouter** : de plus, en outre, d'ailleurs.
**Conclure** : en somme, en définitive, pour conclure.`,
        ko: 'DELF B2에서는 글의 일관성(cohérence)을 평가합니다. 연결어는 논리의 흐름을 보여 줍니다.',
        examples: [
          { fr: 'Tout d\'abord, le télétravail réduit les trajets. De plus, il améliore la concentration.', ko: '우선, 재택근무는 이동을 줄여 준다. 게다가 집중력을 높여 준다.' }
        ]
      },
      {
        title: 'Opposer et concéder',
        body: `**Opposer deux faits** : en revanche, au contraire, alors que, tandis que.
**Concéder (reconnaître un point, puis le limiter)** : certes… mais, cependant, toutefois, néanmoins, pourtant.
**Construction** : **bien que** + subjonctif ; **même si** + indicatif ; **malgré** + nom.
Bien qu'il **pleuve**… / Même s'il **pleut**… / Malgré **la pluie**…`,
        ko: 'certes… mais(물론 ~이지만), cependant(그러나), en revanche(반면에). bien que + 접속법, même si + 직설법, malgré + 명사.',
        examples: [
          { fr: 'Certes, les réseaux sociaux rapprochent les gens ; toutefois, ils peuvent isoler.', ko: '물론 SNS는 사람들을 가깝게 해 준다. 하지만 고립시킬 수도 있다.' },
          { fr: 'Paris est cher, en revanche Lyon est plus abordable.', ko: '파리는 비싸다. 반면에 리옹은 더 저렴하다.' }
        ]
      },
      {
        title: 'Cause, conséquence, but',
        body: `**Cause** : car, puisque (cause connue), étant donné que, **grâce à** + nom (cause positive), **à cause de** + nom (cause négative), en raison de + nom.
**Conséquence** : donc, par conséquent, c'est pourquoi, si bien que, de sorte que.
**But** : pour / afin de + infinitif (même sujet) ; pour que / afin que + **subjonctif** (sujets différents).
Attention : **en effet** sert à **confirmer ou expliquer**, jamais à opposer.`,
        ko: 'grâce à(덕분에, 긍정), à cause de(때문에, 부정). par conséquent(따라서). pour que + 접속법. en effet는 \'실제로/왜냐하면\'의 의미이며 대조가 아닙니다.',
        examples: [
          { fr: 'Grâce à cette bourse, elle a pu étudier en France.', ko: '이 장학금 덕분에 그녀는 프랑스에서 공부할 수 있었다.' },
          { fr: 'Les loyers augmentent ; par conséquent, beaucoup de jeunes quittent la capitale.', ko: '임대료가 오르고 있다. 그 결과 많은 젊은이들이 수도를 떠난다.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Grâce à la pluie, le match a été annulé.', right: 'À cause de la pluie, le match a été annulé.', why: 'Grâce à = cause positive.', whyKo: 'grâce à는 긍정적인 원인에만.' },
      { wrong: 'Malgré qu\'il pleuve…', right: 'Bien qu\'il pleuve… / Malgré la pluie…', why: 'Malgré + nom seulement.', whyKo: 'malgré 뒤에는 명사만.' },
      { wrong: 'Même s\'il soit tard…', right: 'Même s\'il est tard…', why: 'Même si + indicatif.', whyKo: 'même si + 직설법.' },
      { wrong: 'Il fait beau. En effet, je reste chez moi.', right: 'Il fait beau. Pourtant, je reste chez moi.', why: 'En effet confirme ; pour opposer : pourtant, cependant.', whyKo: 'en effet는 확인/설명, 대조는 pourtant.' }
    ],
    glossary: [
      { fr: 'cependant / toutefois', ko: '그러나, 하지만' },
      { fr: 'en revanche', ko: '반면에' },
      { fr: 'néanmoins', ko: '그럼에도 불구하고' },
      { fr: 'certes', ko: '물론, 확실히' },
      { fr: 'par conséquent', ko: '따라서, 그 결과' },
      { fr: 'en outre', ko: '게다가, 더욱이' },
      { fr: 'étant donné que', ko: '~이므로, ~을 고려하면' },
      { fr: 'afin de', ko: '~하기 위해' }
    ],
    check: [
      { id: 'b2c-c1', type: 'qcm', prompt: 'Complétez :', sentence: '___ ses efforts, il n\'a pas obtenu le poste.', options: ['Bien que', 'Malgré', 'Même si', 'Grâce à'], answer: 1, explanation: 'Malgré + nom (ses efforts).' },
      { id: 'b2c-c2', type: 'qcm', prompt: 'Quel connecteur exprime une conséquence ?', options: ['en revanche', 'par conséquent', 'certes', 'bien que'], answer: 1, explanation: 'Par conséquent = conséquence.' },
      { id: 'b2c-c3', type: 'qcm', prompt: 'Complétez :', sentence: 'Je t\'explique ___ tu comprennes.', options: ['pour', 'pour que', 'afin de', 'car'], answer: 1, explanation: 'Sujets différents + subjonctif → pour que.' },
      { id: 'b2c-c4', type: 'qcm', prompt: 'Complétez :', sentence: '___ à son aide, j\'ai réussi.', options: ['À cause', 'Grâce', 'Malgré', 'En raison'], answer: 1, explanation: 'Cause positive → grâce à.' }
    ],
    practice: {
      facile: [
        { id: 'b2c-f1', type: 'qcm', prompt: 'Quel connecteur sert à ajouter un argument ?', options: ['en outre', 'pourtant', 'donc', 'alors que'], answer: 0, explanation: 'En outre = de plus.' },
        { id: 'b2c-f2', type: 'qcm', prompt: 'Complétez :', sentence: 'Même s\'il ___ froid, je sors.', options: ['fasse', 'fait', 'ferait', 'faisant'], answer: 1, explanation: 'Même si + indicatif.' }
      ],
      moyen: [
        { id: 'b2c-m1', type: 'qcm', prompt: 'Complétez :', sentence: 'La ville est bruyante ; la campagne, ___, est calme.', options: ['en effet', 'en revanche', 'par conséquent', 'de plus'], answer: 1, explanation: 'Opposition de deux faits → en revanche.' },
        { id: 'b2c-m2', type: 'input', prompt: 'Complétez avec « bien que » ou « même si » :', sentence: '___ elle soit occupée, elle m\'aide.', answer: ['bien qu\'', 'bien que', 'bien qu'], explanation: 'Subjonctif (soit) → bien que.' }
      ],
      difficile: [
        { id: 'b2c-d1', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['Afin que réussir, il travaille.', 'Il travaille afin de réussir.', 'Il travaille afin qu\'il réussit.', 'Il travaille pour qu\'il réussir.'], answer: 1, explanation: 'Même sujet → afin de + infinitif.' },
        { id: 'b2c-d2', type: 'qcm', prompt: 'Complétez :', sentence: 'Les prix ont baissé, ___ les ventes ont augmenté.', options: ['si bien que', 'bien que', 'alors que', 'malgré'], answer: 0, explanation: 'Si bien que = conséquence + indicatif.' }
      ]
    }
  },
  {
    id: 'b2-discours-rapporte',
    level: 'B2',
    title: 'Le discours rapporté et la concordance des temps',
    titleKo: '간접화법과 시제 일치',
    minutes: 35,
    objectives: ['Passer du discours direct au discours indirect', 'Appliquer la concordance des temps', 'Transformer les questions et les indicateurs de temps'],
    sections: [
      {
        title: 'Le principe',
        body: `Le discours indirect rapporte les paroles de quelqu'un **sans guillemets**, dans une subordonnée. Les pronoms changent selon la personne qui parle.
Il dit : « **Je** suis fatigué. » → Il dit qu'**il** est fatigué.
Verbes introducteurs utiles au B2 : affirmer, expliquer, annoncer, préciser, ajouter, reconnaître, nier, demander, répondre, se plaindre que.`,
        ko: '간접화법은 따옴표 없이 남의 말을 전합니다. 인칭 대명사가 바뀝니다. 한국어의 \'-다고 했다\'에 해당합니다.',
        examples: [
          { fr: 'Elle affirme que le projet avance bien.', ko: '그녀는 프로젝트가 잘 진행되고 있다고 단언한다.' }
        ]
      },
      {
        title: 'La concordance des temps',
        body: `Si le verbe introducteur est **au passé** (il a dit, il expliquait…), les temps reculent :
**présent → imparfait** : « Je travaille » → il a dit qu'il **travaillait**.
**passé composé → plus-que-parfait** : « J'ai fini » → il a dit qu'il **avait fini**.
**futur → conditionnel présent** : « Je viendrai » → il a dit qu'il **viendrait**.
L'imparfait, le conditionnel et le plus-que-parfait **ne changent pas**.`,
        ko: '주절 동사가 과거이면 시제가 하나씩 뒤로 갑니다: 현재 → 반과거, 복합과거 → 대과거, 미래 → 조건법 현재.',
        examples: [
          { fr: 'Il a expliqué qu\'il avait raté son train.', ko: '그는 기차를 놓쳤다고 설명했다.' },
          { fr: 'Elle a annoncé qu\'elle déménagerait en juin.', ko: '그녀는 6월에 이사할 거라고 발표했다.' }
        ]
      },
      {
        title: 'Questions, ordres et indicateurs de temps',
        body: `**Questions** : est-ce que / question fermée → **si** ; qu'est-ce que → **ce que** ; qu'est-ce qui → **ce qui** ; où, quand, comment, pourquoi → inchangés.
**Ordres** : impératif → **de + infinitif** : « Asseyez-vous » → il nous a demandé **de nous asseoir**.
**Temps** (récit au passé) : aujourd'hui → ce jour-là ; hier → **la veille** ; demain → **le lendemain** ; la semaine prochaine → la semaine suivante ; ici → là.`,
        ko: '의문문: est-ce que → si, qu\'est-ce que → ce que. 명령: de + 부정사. 시간: demain → le lendemain, hier → la veille.',
        examples: [
          { fr: 'Il m\'a demandé si j\'étais libre le lendemain.', ko: '그는 나에게 다음 날 시간이 있는지 물었다.' },
          { fr: 'Elle voulait savoir ce que nous pensions.', ko: '그녀는 우리가 무엇을 생각하는지 알고 싶어 했다.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Il m\'a demandé est-ce que je venais.', right: 'Il m\'a demandé si je venais.', why: 'Est-ce que → si.', whyKo: 'est-ce que → si.' },
      { wrong: 'Elle a dit qu\'elle viendra demain.', right: 'Elle a dit qu\'elle viendrait le lendemain.', why: 'Futur → conditionnel ; demain → le lendemain.', whyKo: '미래 → 조건법, demain → le lendemain.' },
      { wrong: 'Il m\'a demandé qu\'est-ce que je faisais.', right: 'Il m\'a demandé ce que je faisais.', why: 'Qu\'est-ce que → ce que.', whyKo: 'qu\'est-ce que → ce que.' }
    ],
    glossary: [
      { fr: 'le discours indirect', ko: '간접화법' },
      { fr: 'la concordance des temps', ko: '시제 일치' },
      { fr: 'le plus-que-parfait', ko: '대과거' },
      { fr: 'la veille', ko: '전날' },
      { fr: 'le lendemain', ko: '다음 날' },
      { fr: 'nier', ko: '부인하다' },
      { fr: 'reconnaître', ko: '인정하다' }
    ],
    check: [
      { id: 'b2d-c1', type: 'qcm', prompt: 'Transformez : « Je suis prêt. » → Il a dit qu\'il…', options: ['est prêt', 'était prêt', 'sera prêt', 'a été prêt'], answer: 1, explanation: 'Présent → imparfait.' },
      { id: 'b2d-c2', type: 'qcm', prompt: '« Est-ce que tu viens ? » → Elle m\'a demandé…', options: ['est-ce que je venais', 'que je venais', 'si je venais', 'ce que je venais'], answer: 2, explanation: 'Question fermée → si.' },
      { id: 'b2d-c3', type: 'input', prompt: '« J\'ai perdu mes clés. » → Il a expliqué qu\'il ___ ses clés.', answer: ['avait perdu'], explanation: 'Passé composé → plus-que-parfait.' },
      { id: 'b2d-c4', type: 'qcm', prompt: '« demain » dans un récit au passé devient :', options: ['la veille', 'le lendemain', 'aujourd\'hui', 'ce jour-là'], answer: 1, explanation: 'Demain → le lendemain.' }
    ],
    practice: {
      facile: [
        { id: 'b2d-f1', type: 'qcm', prompt: '« Je viendrai. » → Elle a promis qu\'elle…', options: ['viendra', 'viendrait', 'venait', 'vienne'], answer: 1, explanation: 'Futur → conditionnel.' },
        { id: 'b2d-f2', type: 'qcm', prompt: '« hier » dans un récit au passé devient :', options: ['la veille', 'le lendemain', 'avant-hier', 'ce jour-là'], answer: 0, explanation: 'Hier → la veille.' }
      ],
      moyen: [
        { id: 'b2d-m1', type: 'input', prompt: '« Fermez la porte ! » → Il nous a demandé ___ la porte.', answer: ['de fermer'], explanation: 'Impératif → de + infinitif.' },
        { id: 'b2d-m2', type: 'qcm', prompt: '« Qu\'est-ce qui se passe ? » → Il voulait savoir…', options: ['qu\'est-ce qui se passait', 'ce qui se passait', 'ce que se passait', 's\'il se passait'], answer: 1, explanation: 'Qu\'est-ce qui → ce qui.' }
      ],
      difficile: [
        { id: 'b2d-d1', type: 'input', prompt: '« Nous partirons la semaine prochaine. » → Ils ont annoncé qu\'ils ___ la semaine suivante.', answer: ['partiraient'], explanation: 'Futur → conditionnel présent.' },
        { id: 'b2d-d2', type: 'qcm', prompt: '« Je travaillais déjà ici. » → Il a précisé qu\'il…', options: ['travaillait déjà là', 'avait travaillé déjà ici', 'travaillerait déjà là', 'travaille déjà ici'], answer: 0, explanation: 'L\'imparfait ne change pas ; ici → là.' }
      ]
    }
  },
  {
    id: 'b2-essai',
    level: 'B2',
    title: 'Réussir la production écrite du DELF B2',
    titleKo: 'DELF B2 작문 잘 쓰기',
    minutes: 40,
    objectives: ['Analyser une consigne', 'Construire un plan argumenté', 'Employer un registre soutenu et des formules adaptées'],
    sections: [
      {
        title: 'Analyser la consigne',
        body: `L'épreuve demande un **texte argumenté** (au moins **250 mots** en général) : contribution à un forum, lettre formelle, article d'opinion…
Avant d'écrire, soulignez : **qui écrit** (votre rôle), **à qui** (destinataire), **quel type de texte**, **quel est le problème** posé, **quelle position** on attend.
Respecter le format compte : une lettre formelle a un objet, une formule d'appel et une formule de politesse ; un article a un titre.`,
        ko: '쓰기 전에 역할, 수신자, 글의 종류, 문제, 요구되는 입장을 확인하세요. 보통 250단어 이상입니다.',
        examples: [
          { fr: 'Objet : Projet de fermeture de la bibliothèque municipale', ko: '제목: 시립 도서관 폐쇄 계획' }
        ]
      },
      {
        title: 'Le plan',
        body: `**Introduction** : une accroche (fait, chiffre, question), la **problématique**, l'annonce du plan.
**Développement** : 2 ou 3 paragraphes ; **un argument par paragraphe**, illustré par **un exemple concret**. Pensez à la **concession** : « Certes… ; toutefois… ».
**Conclusion** : bilan de votre position + ouverture (proposition, question).
Un saut de ligne entre les paragraphes rend la structure visible pour le correcteur.`,
        ko: '서론(도입·문제 제기·구성 소개) → 본론(문단마다 논거 하나 + 구체적 예시) → 결론(입장 정리 + 전망).',
        examples: [
          { fr: 'Faut-il interdire la voiture en centre-ville ? Si la question divise, elle mérite d\'être examinée sous plusieurs angles.', ko: '도심에서 자동차를 금지해야 할까? 의견이 갈리는 문제지만 여러 측면에서 검토할 가치가 있다.' }
        ]
      },
      {
        title: 'Des formules efficaces',
        body: `**Donner son avis** : il me semble que, j'estime que, je suis convaincu(e) que, à mon sens.
**Présenter un fait** : force est de constater que, il est indéniable que.
**Réfuter** : on pourrait objecter que… ; or, …
**Lettre formelle** : Madame, Monsieur, … / Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
Variez : évitez de répéter « je pense que » et utilisez le vouvoiement dans une lettre formelle.`,
        ko: '의견 표현을 다양하게 하세요 (il me semble que, j\'estime que…). 공식 편지에서는 vous를 사용합니다.',
        examples: [
          { fr: 'Force est de constater que les mentalités ont évolué.', ko: '사고방식이 변했다는 것을 인정하지 않을 수 없다.' },
          { fr: 'On pourrait objecter que cette mesure coûte cher ; or, elle permettrait des économies à long terme.', ko: '이 조치가 비용이 많이 든다고 반론할 수 있다. 그러나 장기적으로는 절약이 될 것이다.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Écrire 180 mots.', right: 'Atteindre au moins le nombre de mots demandé.', why: 'Un texte trop court est pénalisé.', whyKo: '너무 짧으면 감점됩니다.' },
      { wrong: 'Salut ! Je t\'écris pour…', right: 'Madame, Monsieur, je me permets de vous écrire au sujet de…', why: 'Registre formel attendu.', whyKo: '공식적인 어조가 필요합니다.' },
      { wrong: 'Je pense que… Je pense aussi que… Je pense enfin que…', right: 'Il me semble que… J\'estime également que… Enfin, je suis convaincu que…', why: 'La richesse du lexique est notée.', whyKo: '어휘의 다양성이 평가됩니다.' }
    ],
    glossary: [
      { fr: 'une consigne', ko: '지시문, 과제 설명' },
      { fr: 'une problématique', ko: '문제 제기' },
      { fr: 'une accroche', ko: '도입부 (관심 끌기)' },
      { fr: 'un argument', ko: '논거' },
      { fr: 'réfuter', ko: '반박하다' },
      { fr: 'le registre soutenu', ko: '격식체' }
    ],
    check: [
      { id: 'b2e-c1', type: 'qcm', prompt: 'Que doit contenir chaque paragraphe du développement ?', options: ['Plusieurs arguments sans exemple', 'Un argument illustré par un exemple', 'Uniquement des exemples', 'Une citation'], answer: 1, explanation: 'Un argument + un exemple concret par paragraphe.' },
      { id: 'b2e-c2', type: 'qcm', prompt: 'Quelle formule convient pour terminer une lettre formelle ?', options: ['Bisous !', 'À plus.', 'Je vous prie d\'agréer l\'expression de mes salutations distinguées.', 'Cordialement les amis.'], answer: 2, explanation: 'Formule de politesse soutenue.' },
      { id: 'b2e-c3', type: 'qcm', prompt: 'Que met-on dans l\'introduction ?', options: ['La conclusion', 'Une accroche, la problématique et l\'annonce du plan', 'Tous les arguments', 'Une formule de politesse'], answer: 1, explanation: 'Accroche + problématique + annonce du plan.' },
      { id: 'b2e-c4', type: 'qcm', prompt: 'Quelle expression sert à réfuter une objection ?', options: ['On pourrait objecter que… ; or…', 'Tout d\'abord', 'En somme', 'Par ailleurs'], answer: 0, explanation: 'On présente l\'objection puis on la réfute avec « or ».' }
    ],
    practice: {
      facile: [
        { id: 'b2e-f1', type: 'qcm', prompt: 'Quelle formule exprime une opinion personnelle ?', options: ['à mon sens', 'en revanche', 'par conséquent', 'certes'], answer: 0, explanation: 'À mon sens = selon moi.' },
        { id: 'b2e-f2', type: 'qcm', prompt: 'Quel pronom utiliser dans une lettre au maire ?', options: ['tu', 'vous', 'on', 'il'], answer: 1, explanation: 'Vouvoiement dans un écrit formel.' }
      ],
      moyen: [
        { id: 'b2e-m1', type: 'qcm', prompt: 'Laquelle est une bonne accroche ?', options: ['Bonjour, je vais parler du sujet.', 'Selon une étude récente, un Français sur trois travaille depuis chez lui.', 'Voici mon texte.', 'Je n\'ai pas d\'avis.'], answer: 1, explanation: 'Un fait chiffré attire l\'attention.' },
        { id: 'b2e-m2', type: 'qcm', prompt: 'Que mettre dans la conclusion ?', options: ['Un nouvel argument', 'Un bilan et une ouverture', 'Uniquement « Merci »', 'La consigne recopiée'], answer: 1, explanation: 'Bilan + ouverture.' }
      ],
      difficile: [
        { id: 'b2e-d1', type: 'order', prompt: 'Remettez dans l\'ordre :', words: ['constater', 'Force', 'que', 'est', 'de', 'la', 'situation', 'a', 'changé'], answer: 'Force est de constater que la situation a changé', explanation: 'Formule figée : force est de constater que…' },
        { id: 'b2e-d2', type: 'qcm', prompt: 'Quelle phrase marque une concession ?', options: ['Certes, ce projet coûte cher ; il reste néanmoins indispensable.', 'Ce projet coûte cher, donc il faut l\'arrêter.', 'Ce projet coûte cher car il est grand.', 'Ce projet coûte cher.'], answer: 0, explanation: 'Certes… néanmoins : on reconnaît puis on nuance.' }
      ]
    }
  },

  // ───────────────────────────────── C1
  {
    id: 'c1-nominalisation',
    level: 'C1',
    title: 'La nominalisation',
    titleKo: '명사화',
    minutes: 30,
    objectives: ['Transformer un verbe ou un adjectif en nom', 'Connaître les suffixes et le genre des noms obtenus', 'Écrire un style synthétique (titres, notes, synthèses)'],
    sections: [
      {
        title: 'Pourquoi nominaliser ?',
        body: `La nominalisation transforme un verbe ou un adjectif en **nom**. Elle rend l'écrit plus **synthétique** : titres de presse, prises de notes, synthèses de documents (épreuve du DALF C1).
« Le gouvernement a décidé d'augmenter les impôts » → « **L'augmentation** des impôts décidée par le gouvernement ».
Le coréen fait la même chose avec -기 / -음 ou des noms sino-coréens (증가, 감소…).`,
        ko: '명사화는 동사나 형용사를 명사로 바꾸어 글을 간결하게 만듭니다 (한국어의 -기/-음, 증가·감소 같은 한자어와 비슷).',
        examples: [
          { fr: 'Hausse du prix de l\'électricité', ko: '전기 요금 인상' },
          { fr: 'Le départ du ministre a surpris tout le monde.', ko: '장관의 사임(떠남)은 모두를 놀라게 했다.' }
        ]
      },
      {
        title: 'Les suffixes et le genre',
        body: `**Verbe → nom** :
-tion / -sion (fém.) : réduire → la réduction, décider → la décision.
-ment (masc.) : développer → le développement, licencier → le licenciement.
-age (masc.) : nettoyer → le nettoyage. -ure (fém.) : ouvrir → l'ouverture.
-ance / -ence (fém.) : croître → la croissance, préférer → la préférence.
Formes courtes : choisir → le choix, partir → le départ, refuser → le refus, analyser → l'analyse (f.).
**Adjectif → nom** : -ité (fém.) efficace → l'efficacité ; -esse (fém.) faible → la faiblesse ; -eur (fém.) lent → la lenteur ; -ise (fém.) franc → la franchise.`,
        ko: '-tion, -ance, -ité, -ure는 대부분 여성, -ment, -age는 남성입니다.',
        examples: [
          { fr: 'La rapidité de la réponse a été appréciée.', ko: '답변의 신속함이 좋은 평가를 받았다.' },
          { fr: 'Le refus des syndicats bloque la négociation.', ko: '노조의 거부가 협상을 막고 있다.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'la réduisation', right: 'la réduction', why: 'Réduire → réduction.', whyKo: 'réduire → réduction.' },
      { wrong: 'le choisissement', right: 'le choix', why: 'Forme courte irrégulière.', whyKo: '불규칙한 짧은 형태입니다.' },
      { wrong: 'la développement', right: 'le développement', why: 'Les noms en -ment sont masculins.', whyKo: '-ment 명사는 남성입니다.' }
    ],
    glossary: [
      { fr: 'la nominalisation', ko: '명사화' },
      { fr: 'la hausse / la baisse', ko: '인상 / 인하' },
      { fr: 'la croissance', ko: '성장' },
      { fr: 'le licenciement', ko: '해고' },
      { fr: 'une synthèse', ko: '종합, 요약' }
    ],
    check: [
      { id: 'c1n-c1', type: 'qcm', prompt: 'Nom correspondant à « réduire » :', options: ['la réduisation', 'la réduction', 'le réduisement', 'la réduite'], answer: 1, explanation: 'Réduire → la réduction.' },
      { id: 'c1n-c2', type: 'qcm', prompt: 'Genre de « développement » :', options: ['masculin', 'féminin'], answer: 0, explanation: '-ment → masculin.' },
      { id: 'c1n-c3', type: 'input', prompt: 'Nom correspondant à « choisir » (avec article) :', answer: ['le choix'], explanation: 'Choisir → le choix.' },
      { id: 'c1n-c4', type: 'qcm', prompt: 'Nom correspondant à « efficace » :', options: ['l\'efficacement', 'l\'efficacité', 'l\'efficace', 'l\'efficacesse'], answer: 1, explanation: '-ité : l\'efficacité.' }
    ],
    practice: {
      facile: [
        { id: 'c1n-f1', type: 'qcm', prompt: 'Nom correspondant à « partir » :', options: ['la partition', 'le départ', 'le partement', 'la partie'], answer: 1, explanation: 'Partir → le départ.' },
        { id: 'c1n-f2', type: 'qcm', prompt: 'Nom correspondant à « lent » :', options: ['la lentesse', 'la lenteur', 'la lentité', 'le lentement'], answer: 1, explanation: 'Lent → la lenteur.' }
      ],
      moyen: [
        { id: 'c1n-m1', type: 'input', prompt: 'Nom correspondant à « croître » (avec article) :', answer: ['la croissance'], explanation: 'Croître → la croissance.' },
        { id: 'c1n-m2', type: 'qcm', prompt: 'Titre de presse pour « Les prix ont beaucoup augmenté » :', options: ['Forte hausse des prix', 'Les prix augmentent fort', 'Augmenter les prix', 'Haute des prix'], answer: 0, explanation: 'Nominalisation : hausse + adjectif.' }
      ],
      difficile: [
        { id: 'c1n-d1', type: 'input', prompt: 'Nominalisez : « refuser le projet » → « le ___ du projet »', answer: ['refus'], explanation: 'Refuser → le refus.' },
        { id: 'c1n-d2', type: 'qcm', prompt: 'Nominalisez : « On a ouvert un nouveau musée. »', options: ['Ouvrement d\'un nouveau musée', 'Ouverture d\'un nouveau musée', 'Ouvrage d\'un nouveau musée', 'Ouvrition d\'un nouveau musée'], answer: 1, explanation: 'Ouvrir → l\'ouverture.' }
      ]
    }
  }
]

export const lessonById = (id) => LESSONS.find((l) => l.id === id)
