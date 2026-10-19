/**
 * LEÇONS SUPPLÉMENTAIRES (même format que lessons.js).
 * LESSONS_EXTRA_KO : explications complètes en coréen, objectifs traduits et
 * encadré « Différence avec le coréen » pour ces leçons.
 */

export const LESSONS_EXTRA = [
  // ───────────────────────────────── A1
  {
    id: 'a1-partitifs',
    level: 'A1',
    title: 'Les articles partitifs et les quantités',
    titleKo: '부분관사와 수량 표현',
    minutes: 20,
    objectives: ['Utiliser du, de la, de l\', des', 'Dire « pas de » à la forme négative', 'Exprimer une quantité : beaucoup de, un peu de, un kilo de'],
    sections: [
      {
        title: 'Du, de la, de l\', des',
        body: `Quand on parle d'une **quantité qu'on ne compte pas** (de l'eau, du pain, du courage), on utilise l'**article partitif** :
**du** (masculin) : du pain, du café. **de la** (féminin) : de la soupe, de la musique. **de l'** (devant voyelle) : de l'eau, de l'argent. **des** (pluriel) : des pâtes, des légumes.
On l'utilise souvent avec **manger, boire, acheter, prendre, il y a, faire** (du sport, de la musique).`,
        examples: [
          { fr: 'Le matin, je bois du café et je mange du pain.', ko: '아침에 저는 커피를 마시고 빵을 먹어요.' },
          { fr: 'Il y a de l\'eau dans le frigo.', ko: '냉장고에 물이 있어요.' },
          { fr: 'Elle fait de la musique.', ko: '그녀는 음악을 해요.' }
        ]
      },
      {
        title: 'À la forme négative : pas de',
        body: `Après une négation, **du, de la, de l', des, un, une** deviennent **de** (ou **d'** devant voyelle) :
Je bois du café → Je **ne** bois **pas de** café. Il y a des œufs → Il **n'**y a **pas d'**œufs.
Attention : avec **être**, on garde l'article : Ce n'est pas **du** sucre, c'est **du** sel.`,
        examples: [
          { fr: 'Je ne mange pas de viande.', ko: '저는 고기를 먹지 않아요.' },
          { fr: 'Nous n\'avons pas d\'enfants.', ko: '우리는 아이가 없어요.' }
        ]
      },
      {
        title: 'Exprimer une quantité précise',
        body: `Après un mot de quantité, on utilise seulement **de** : **beaucoup de**, **un peu de**, **trop de**, **assez de**, **un kilo de**, **une bouteille de**, **un paquet de**.
beaucoup **de** travail, un peu **de** sucre, un kilo **de** pommes, une bouteille **d'**eau.`,
        examples: [
          { fr: 'J\'achète un kilo de tomates et une bouteille d\'eau.', ko: '토마토 1킬로와 물 한 병을 사요.' },
          { fr: 'Il a beaucoup de travail cette semaine.', ko: '그는 이번 주에 일이 많아요.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Je mange le pain tous les matins.', right: 'Je mange du pain tous les matins.', why: 'Une quantité non précisée → partitif.', whyKo: '정해지지 않은 양 → 부분관사.' },
      { wrong: 'Je ne bois pas du café.', right: 'Je ne bois pas de café.', why: 'Après la négation : pas de.', whyKo: '부정문에서는 pas de.' },
      { wrong: 'beaucoup des amis', right: 'beaucoup d\'amis', why: 'Après beaucoup : de (d\') seul.', whyKo: 'beaucoup 뒤에는 de만 씁니다.' }
    ],
    glossary: [
      { fr: 'du pain', ko: '빵 (약간의)' },
      { fr: 'de l\'eau', ko: '물 (약간의)' },
      { fr: 'beaucoup de', ko: '많은' },
      { fr: 'un peu de', ko: '조금의' },
      { fr: 'une bouteille de', ko: '~ 한 병' },
      { fr: 'un kilo de', ko: '~ 1킬로' }
    ],
    check: [
      { id: 'a1pa-c1', type: 'qcm', prompt: 'Complétez :', sentence: 'Je voudrais ___ eau, s\'il vous plaît.', options: ['du', 'de la', 'de l\'', 'des'], answer: 2, explanation: 'Devant une voyelle : de l\'eau.' },
      { id: 'a1pa-c2', type: 'qcm', prompt: 'Complétez :', sentence: 'Il n\'y a pas ___ lait.', options: ['du', 'de', 'le', 'un'], answer: 1, explanation: 'Négation → pas de.', explanationKo: '부정문 → pas de.' },
      { id: 'a1pa-c3', type: 'qcm', prompt: 'Complétez :', sentence: 'Elle a beaucoup ___ livres.', options: ['des', 'de', 'les', 'du'], answer: 1, explanation: 'Beaucoup de + nom.' },
      { id: 'a1pa-c4', type: 'input', prompt: 'Complétez avec du, de la ou des :', sentence: 'Je mange ___ soupe.', answer: ['de la'], explanation: 'Soupe est féminin : de la soupe.' }
    ],
    practice: {
      facile: [
        { id: 'a1pa-f1', type: 'qcm', prompt: 'Complétez :', sentence: 'Tu veux ___ café ?', options: ['du', 'de la', 'des', 'de l\''], answer: 0, explanation: 'Café est masculin : du café.' },
        { id: 'a1pa-f2', type: 'qcm', prompt: 'Complétez :', sentence: 'J\'achète ___ pommes.', options: ['du', 'de la', 'des', 'de l\''], answer: 2, explanation: 'Pluriel : des pommes.' }
      ],
      moyen: [
        { id: 'a1pa-m1', type: 'input', prompt: 'Mettez à la forme négative :', sentence: 'Je bois du thé. → Je ne bois pas ___ thé.', answer: ['de'], explanation: 'Négation → de.' },
        { id: 'a1pa-m2', type: 'qcm', prompt: 'Complétez :', sentence: 'Elle fait ___ sport tous les jours.', options: ['de la', 'du', 'des', 'le'], answer: 1, explanation: 'Faire du sport.' }
      ],
      difficile: [
        { id: 'a1pa-d1', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['Ce n\'est pas de sucre.', 'Ce n\'est pas du sucre.', 'Ce n\'est pas le sucre de.', 'Ce n\'est sucre pas.'], answer: 1, explanation: 'Avec être, on garde l\'article : pas du sucre.' },
        { id: 'a1pa-d2', type: 'input', prompt: 'Complétez :', sentence: 'Une bouteille ___ eau minérale.', answer: ['d\'', 'd'], explanation: 'Quantité + de → d\' devant voyelle.' }
      ]
    }
  },
  {
    id: 'a1-questions-negation',
    level: 'A1',
    title: 'Poser des questions et dire non',
    titleKo: '질문하기와 부정하기',
    minutes: 20,
    objectives: ['Poser une question de trois façons', 'Utiliser les mots interrogatifs (où, quand, comment…)', 'Construire la négation : ne… pas, ne… jamais, ne… plus'],
    sections: [
      {
        title: 'Trois façons de poser une question',
        body: `1. **L'intonation** (à l'oral, familier) : Tu viens ? — la voix monte à la fin.
2. **Est-ce que** (courant) : **Est-ce que** tu viens ?
3. **L'inversion** (soutenu, à l'écrit) : **Viens-tu ?** On met un tiret entre le verbe et le sujet.
Pour une question ouverte, on ajoute un mot interrogatif : **où** (어디), **quand** (언제), **comment** (어떻게), **pourquoi** (왜), **combien** (얼마나), **qui** (누구), **que / qu'est-ce que** (무엇).`,
        examples: [
          { fr: 'Où est-ce que tu habites ?', ko: '어디에 살아요?' },
          { fr: 'Quand partez-vous ?', ko: '언제 떠나세요?' },
          { fr: 'Qu\'est-ce que tu fais ce soir ?', ko: '오늘 저녁에 뭐 해?' }
        ]
      },
      {
        title: 'La négation',
        body: `La négation a **deux parties** qui entourent le verbe : **ne** + verbe + **pas**.
Je **ne** parle **pas** japonais. Devant une voyelle, **ne → n'** : Il **n'**aime **pas** le froid.
Autres négations : **ne… jamais** (절대/한 번도 ~않다), **ne… plus** (더 이상 ~않다), **ne… rien** (아무것도 ~않다), **ne… personne** (아무도 ~않다).
À l'oral familier, on supprime souvent le « ne » : J'sais pas. À l'écrit et à l'examen, gardez-le !`,
        examples: [
          { fr: 'Je ne fume jamais.', ko: '저는 절대 담배를 피우지 않아요.' },
          { fr: 'Elle n\'habite plus à Séoul.', ko: '그녀는 더 이상 서울에 살지 않아요.' },
          { fr: 'Je ne vois personne.', ko: '아무도 안 보여요.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Je pas parle français.', right: 'Je ne parle pas français.', why: 'Ne… pas entoure le verbe.', whyKo: 'ne…pas는 동사를 감쌉니다.' },
      { wrong: 'Où tu habites est-ce que ?', right: 'Où est-ce que tu habites ?', why: 'Ordre : mot interrogatif + est-ce que + sujet + verbe.', whyKo: '순서: 의문사 + est-ce que + 주어 + 동사.' },
      { wrong: 'Parles tu anglais ?', right: 'Parles-tu anglais ?', why: 'Inversion : tiret obligatoire.', whyKo: '도치할 때는 하이픈(-)이 필요합니다.' }
    ],
    glossary: [
      { fr: 'où', ko: '어디' },
      { fr: 'quand', ko: '언제' },
      { fr: 'comment', ko: '어떻게' },
      { fr: 'pourquoi', ko: '왜' },
      { fr: 'combien', ko: '얼마나, 몇' },
      { fr: 'ne… jamais', ko: '절대 ~하지 않다' }
    ],
    check: [
      { id: 'a1qn-c1', type: 'qcm', prompt: 'Quel mot interrogatif ?', sentence: '___ coûte ce livre ? — 15 euros.', options: ['Où', 'Combien', 'Quand', 'Qui'], answer: 1, explanation: 'Un prix → combien.' },
      { id: 'a1qn-c2', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['Je ne aime pas le thé.', 'Je n\'aime pas le thé.', 'Je n\'aime le thé pas.', 'Je pas aime le thé.'], answer: 1, explanation: 'Ne → n\' devant voyelle, pas après le verbe.' },
      { id: 'a1qn-c3', type: 'qcm', prompt: 'Complétez :', sentence: 'Il ne travaille ___ ici : il a changé d\'entreprise.', options: ['jamais', 'plus', 'rien', 'personne'], answer: 1, explanation: 'Un changement → ne… plus.', explanationKo: '변화 → ne…plus (더 이상 ~않다).' },
      { id: 'a1qn-c4', type: 'order', prompt: 'Remettez dans l\'ordre :', words: ['est-ce', 'tu', 'Où', 'que', 'travailles'], answer: 'Où est-ce que tu travailles', explanation: 'Où + est-ce que + sujet + verbe.' }
    ],
    practice: {
      facile: [
        { id: 'a1qn-f1', type: 'qcm', prompt: 'Quel mot interrogatif ?', sentence: '___ tu pars ? — Demain.', options: ['Quand', 'Où', 'Comment', 'Pourquoi'], answer: 0, explanation: 'Un moment → quand.' },
        { id: 'a1qn-f2', type: 'input', prompt: 'Complétez la négation :', sentence: 'Je mange. → Je ___ mange pas.', answer: ['ne'], explanation: 'Je ne mange pas.' }
      ],
      moyen: [
        { id: 'a1qn-m1', type: 'qcm', prompt: 'Quelle question correspond à « Je vais bien, merci » ?', options: ['Où vas-tu ?', 'Comment vas-tu ?', 'Quand vas-tu ?', 'Pourquoi vas-tu ?'], answer: 1, explanation: 'Comment vas-tu ? = 잘 지내?' },
        { id: 'a1qn-m2', type: 'qcm', prompt: 'Complétez :', sentence: 'Je ne comprends ___ : tout est trop difficile !', options: ['personne', 'rien', 'jamais', 'plus'], answer: 1, explanation: 'Ne… rien = aucune chose.' }
      ],
      difficile: [
        { id: 'a1qn-d1', type: 'input', prompt: 'Transformez avec l\'inversion :', sentence: 'Vous parlez coréen ? → ___ coréen ?', answer: ['parlez-vous'], explanation: 'Verbe-tiret-sujet : Parlez-vous ?' },
        { id: 'a1qn-d2', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['Je ne vois pas personne.', 'Je ne vois personne.', 'Je vois ne personne.', 'Je personne ne vois.'], answer: 1, explanation: 'Ne… personne remplace ne… pas.' }
      ]
    }
  },

  // ───────────────────────────────── A2
  {
    id: 'a2-futur',
    level: 'A2',
    title: 'Parler de l\'avenir : futur proche et futur simple',
    titleKo: '미래 말하기: 근접미래와 단순미래',
    minutes: 25,
    objectives: ['Former le futur proche (aller + infinitif)', 'Former le futur simple et ses verbes irréguliers', 'Choisir entre les deux'],
    sections: [
      {
        title: 'Le futur proche',
        body: `**aller au présent + infinitif** : je **vais partir**, tu **vas manger**, nous **allons voir**.
On l'utilise pour une action **proche** ou **déjà décidée**, surtout à l'oral : Attention, il **va pleuvoir** ! Ce soir, je **vais regarder** un film.
Négation : ne + aller + pas + infinitif → Je **ne vais pas** sortir.`,
        examples: [
          { fr: 'Ce week-end, nous allons visiter Rouen.', ko: '이번 주말에 우리는 루앙을 방문할 거예요.' },
          { fr: 'Dépêche-toi, le train va partir !', ko: '서둘러, 기차가 곧 떠나!' }
        ]
      },
      {
        title: 'Le futur simple',
        body: `**infinitif + -ai, -as, -a, -ons, -ez, -ont** : je parler**ai**, tu finir**as**, il partir**a**. Pour les verbes en -re, on enlève le e : prendre → je prendr**ai**.
**Irréguliers à connaître** : être → je **serai** ; avoir → j'**aurai** ; aller → j'**irai** ; faire → je **ferai** ; venir → je **viendrai** ; voir → je **verrai** ; pouvoir → je **pourrai** ; vouloir → je **voudrai**.
On l'utilise pour un futur plus **lointain**, des **prévisions**, des **promesses** et à l'écrit.`,
        examples: [
          { fr: 'Dans dix ans, je parlerai bien français.', ko: '10년 후에 나는 프랑스어를 잘할 거예요.' },
          { fr: 'Je t\'appellerai demain, promis.', ko: '내일 전화할게, 약속해.' },
          { fr: 'Demain, il fera beau dans le nord.', ko: '내일 북부는 날씨가 좋겠습니다.' }
        ]
      },
      {
        title: 'Quand + futur',
        body: `En français, après **quand** pour l'avenir, on utilise le **futur**, pas le présent : **Quand** je **serai** en France, je visiterai Paris.
Les mots du futur : **demain**, **la semaine prochaine**, **l'année prochaine**, **dans deux jours**, **bientôt**, **plus tard**.`,
        examples: [
          { fr: 'Quand j\'aurai mon diplôme, je travaillerai à Paris.', ko: '졸업장을 받으면 파리에서 일할 거예요.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Je vais à partir.', right: 'Je vais partir.', why: 'Aller + infinitif, sans « à ».', whyKo: 'aller + 동사원형, à를 넣지 않습니다.' },
      { wrong: 'Quand je suis en France, je visiterai Paris.', right: 'Quand je serai en France, je visiterai Paris.', why: 'Après quand (futur) → futur.', whyKo: '미래의 quand 뒤에는 미래형.' },
      { wrong: 'J\'allerai au cinéma.', right: 'J\'irai au cinéma.', why: 'Aller → j\'irai (irrégulier).', whyKo: 'aller의 미래는 j\'irai (불규칙).' },
      { wrong: 'Je seriai content.', right: 'Je serai content.', why: 'Être → je serai.', whyKo: 'être의 미래는 je serai.' }
    ],
    glossary: [
      { fr: 'le futur proche', ko: '근접미래' },
      { fr: 'le futur simple', ko: '단순미래' },
      { fr: 'la semaine prochaine', ko: '다음 주' },
      { fr: 'bientôt', ko: '곧' },
      { fr: 'dans deux jours', ko: '이틀 후에' },
      { fr: 'une prévision', ko: '예측, 예보' }
    ],
    check: [
      { id: 'a2fu-c1', type: 'qcm', prompt: 'Complétez (futur proche) :', sentence: 'Regarde ces nuages, il ___ pleuvoir.', options: ['va', 'vais', 'allez', 'ira'], answer: 0, explanation: 'Il va + infinitif.' },
      { id: 'a2fu-c2', type: 'qcm', prompt: 'Futur simple de « être » (nous) :', options: ['nous serons', 'nous étons', 'nous serions', 'nous sommerons'], answer: 0, explanation: 'Être → ser- : nous serons.' },
      { id: 'a2fu-c3', type: 'input', prompt: 'Futur simple :', sentence: 'Demain, je (faire) les courses.', answer: ['ferai', 'je ferai'], explanation: 'Faire → je ferai.', },
      { id: 'a2fu-c4', type: 'qcm', prompt: 'Complétez :', sentence: 'Quand tu ___ à Lyon, appelle-moi.', options: ['arrives', 'arriveras', 'arrivais', 'es arrivé'], answer: 1, explanation: 'Quand + futur pour l\'avenir.', explanationKo: '미래의 quand 뒤 → 미래형.' }
    ],
    practice: {
      facile: [
        { id: 'a2fu-f1', type: 'qcm', prompt: 'Complétez :', sentence: 'Nous ___ dîner au restaurant ce soir.', options: ['allons', 'irons', 'vont', 'allez'], answer: 0, explanation: 'Nous allons + infinitif.' },
        { id: 'a2fu-f2', type: 'qcm', prompt: 'Futur simple de « parler » (je) :', options: ['je parlerai', 'je parlrai', 'je parlais', 'je parlerais'], answer: 0, explanation: 'Infinitif + -ai.' },
        { id: 'a2fu-f3', type: 'qcm', prompt: 'Futur simple de « avoir » (tu) :', options: ['tu avras', 'tu auras', 'tu auriras', 'tu as'], answer: 1, explanation: 'Avoir → aur- : tu auras.' }
      ],
      moyen: [
        { id: 'a2fu-m1', type: 'input', prompt: 'Futur simple :', sentence: 'L\'année prochaine, ils (aller) au Japon.', answer: ['iront', 'ils iront'], explanation: 'Aller → ir- : ils iront.' },
        { id: 'a2fu-m2', type: 'input', prompt: 'Futur simple :', sentence: 'Tu (venir) à ma fête ?', answer: ['viendras', 'tu viendras'], explanation: 'Venir → viendr- : tu viendras.' },
        { id: 'a2fu-m3', type: 'qcm', prompt: 'Quelle phrase exprime une promesse ?', options: ['Je vais tomber !', 'Je t\'aiderai, c\'est promis.', 'J\'aide ma mère.', 'J\'ai aidé Paul.'], answer: 1, explanation: 'Promesse → futur simple.' }
      ],
      difficile: [
        { id: 'a2fu-d1', type: 'input', prompt: 'Futur simple :', sentence: 'Nous (pouvoir) partir plus tôt.', answer: ['pourrons', 'nous pourrons'], explanation: 'Pouvoir → pourr- : nous pourrons.' },
        { id: 'a2fu-d2', type: 'order', prompt: 'Remettez dans l\'ordre :', words: ['vais', 'ne', 'Je', 'pas', 'sortir'], answer: 'Je ne vais pas sortir', explanation: 'La négation entoure aller.' },
        { id: 'a2fu-d3', type: 'qcm', prompt: 'Complétez :', sentence: 'Quand je ___ grand, je serai pilote.', options: ['suis', 'serai', 'serais', 'étais'], answer: 1, explanation: 'Quand + futur.' }
      ]
    }
  },
  {
    id: 'a2-pronoms',
    level: 'A2',
    title: 'Les pronoms COD et COI : le, la, les, lui, leur',
    titleKo: '직접·간접 목적어 대명사',
    minutes: 25,
    objectives: ['Remplacer un complément direct (le, la, les)', 'Remplacer un complément indirect de personne (lui, leur)', 'Placer le pronom avant le verbe'],
    sections: [
      {
        title: 'Le, la, l\', les : le complément direct (COD)',
        body: `Le **COD** suit le verbe **sans préposition** : Je regarde **la télé**. Pour ne pas répéter, on le remplace par **le, la, l', les** :
Je regarde la télé → Je **la** regarde. Tu connais Marc ? → Oui, je **le** connais. Elle aime les chats → Elle **les** aime.
Le pronom se place **avant le verbe** (ce qui ressemble un peu à l'ordre coréen !).`,
        examples: [
          { fr: 'Ce film ? Je l\'ai déjà vu.', ko: '그 영화? 이미 봤어요.' },
          { fr: 'Tes clés ? Je les cherche partout !', ko: '네 열쇠? 사방에서 찾고 있어!' }
        ]
      },
      {
        title: 'Lui, leur : le complément indirect (COI)',
        body: `Le **COI** est introduit par **à** + une personne : Je parle **à Sophie**. On le remplace par **lui** (singulier, masculin ou féminin) et **leur** (pluriel).
Je téléphone à ma mère → Je **lui** téléphone. J'écris à mes amis → Je **leur** écris.
Verbes courants avec à : parler à, téléphoner à, écrire à, répondre à, donner à, envoyer à, demander à, offrir à.`,
        examples: [
          { fr: 'Je lui offre un livre pour son anniversaire.', ko: '그(그녀)의 생일에 책을 선물해요.' },
          { fr: 'Nous leur répondons demain.', ko: '우리는 내일 그들에게 답장해요.' }
        ]
      },
      {
        title: 'La place du pronom',
        body: `Toujours **devant le verbe conjugué** : Je **le** vois. Je ne **le** vois pas.
Au passé composé : devant l'auxiliaire → Je **l'**ai vu. Je **lui** ai parlé.
Avec un infinitif : devant l'infinitif → Je vais **le** voir. Je veux **lui** parler.`,
        examples: [
          { fr: 'Je ne leur ai pas encore répondu.', ko: '아직 그들에게 답장하지 않았어요.' },
          { fr: 'Je vais l\'appeler ce soir.', ko: '오늘 저녁에 그(그녀)에게 전화할 거예요.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Je téléphone le à Paul.', right: 'Je lui téléphone.', why: 'Téléphoner à → COI → lui, devant le verbe.', whyKo: 'téléphoner à → 간접목적어 lui, 동사 앞.' },
      { wrong: 'Je leurs parle.', right: 'Je leur parle.', why: 'Leur (pronom) ne prend jamais de s.', whyKo: '대명사 leur에는 s를 붙이지 않습니다.' },
      { wrong: 'Je vois le.', right: 'Je le vois.', why: 'Le pronom se place avant le verbe.', whyKo: '대명사는 동사 앞에 옵니다.' }
    ],
    glossary: [
      { fr: 'un pronom', ko: '대명사' },
      { fr: 'le complément d\'objet direct (COD)', ko: '직접목적어' },
      { fr: 'le complément d\'objet indirect (COI)', ko: '간접목적어' },
      { fr: 'téléphoner à', ko: '~에게 전화하다' },
      { fr: 'offrir à', ko: '~에게 선물하다' },
      { fr: 'répondre à', ko: '~에게 답하다' }
    ],
    check: [
      { id: 'a2pr-c1', type: 'qcm', prompt: 'Remplacez les mots soulignés :', sentence: 'Je regarde [le match].', options: ['Je lui regarde.', 'Je le regarde.', 'Je la regarde.', 'Je regarde le.'], answer: 1, explanation: 'Le match : COD masculin → le.' },
      { id: 'a2pr-c2', type: 'qcm', prompt: 'Remplacez :', sentence: 'J\'écris [à mes parents].', options: ['Je les écris.', 'Je lui écris.', 'Je leur écris.', 'Je leurs écris.'], answer: 2, explanation: 'À + personnes au pluriel → leur.', explanationKo: 'à + 사람(복수) → leur.' },
      { id: 'a2pr-c3', type: 'input', prompt: 'Complétez avec un pronom :', sentence: 'Tu parles à Julie ? Oui, je ___ parle.', answer: ['lui'], explanation: 'Parler à quelqu\'un → lui.' },
      { id: 'a2pr-c4', type: 'qcm', prompt: 'Où placer le pronom ?', sentence: 'Je vais ___ voir ___ demain.', options: ['avant « vais »', 'avant « voir »', 'après « voir »', 'à la fin'], answer: 1, explanation: 'Devant l\'infinitif : je vais le voir.' }
    ],
    practice: {
      facile: [
        { id: 'a2pr-f1', type: 'qcm', prompt: 'Remplacez :', sentence: 'J\'aime [la musique].', options: ['Je l\'aime.', 'Je lui aime.', 'Je les aime.', 'J\'aime la.'], answer: 0, explanation: 'La + voyelle → l\'.' },
        { id: 'a2pr-f2', type: 'qcm', prompt: 'Remplacez :', sentence: 'Je téléphone [à mon frère].', options: ['Je le téléphone.', 'Je lui téléphone.', 'Je leur téléphone.', 'Je téléphone lui.'], answer: 1, explanation: 'Téléphoner à → lui.' },
        { id: 'a2pr-f3', type: 'qcm', prompt: 'Remplacez :', sentence: 'Il achète [les billets].', options: ['Il leur achète.', 'Il les achète.', 'Il le achète.', 'Il achète les.'], answer: 1, explanation: 'COD pluriel → les.' }
      ],
      moyen: [
        { id: 'a2pr-m1', type: 'input', prompt: 'Complétez :', sentence: 'Tes amis ? Je ___ envoie un message.', answer: ['leur'], explanation: 'Envoyer à des personnes → leur.' },
        { id: 'a2pr-m2', type: 'qcm', prompt: 'Passé composé :', sentence: 'La lettre ? Je ___ envoyée hier.', options: ['l\'ai', 'lui ai', 'ai l\'', 'la ai'], answer: 0, explanation: 'Pronom devant l\'auxiliaire : je l\'ai envoyée.' },
        { id: 'a2pr-m3', type: 'order', prompt: 'Remettez dans l\'ordre :', words: ['ne', 'Je', 'connais', 'pas', 'le'], answer: 'Je ne le connais pas', explanation: 'Ne + pronom + verbe + pas.' }
      ],
      difficile: [
        { id: 'a2pr-d1', type: 'input', prompt: 'Répondez avec un pronom :', sentence: 'Tu as parlé au professeur ? Oui, je ___ ai parlé.', answer: ['lui'], explanation: 'Parler à → lui, devant l\'auxiliaire.' },
        { id: 'a2pr-d2', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['Je veux lui demander.', 'Je lui veux demander.', 'Je veux demander lui.', 'Je veux leurs demander.'], answer: 0, explanation: 'Devant l\'infinitif : veux lui demander.' },
        { id: 'a2pr-d3', type: 'qcm', prompt: 'Remplacez :', sentence: 'Elle offre des fleurs [à sa voisine].', options: ['Elle la offre des fleurs.', 'Elle lui offre des fleurs.', 'Elle leur offre des fleurs.', 'Elle offre lui des fleurs.'], answer: 1, explanation: 'Offrir à une personne → lui.' }
      ]
    }
  },
  {
    id: 'a2-comparaison',
    level: 'A2',
    title: 'Comparer : le comparatif et le superlatif',
    titleKo: '비교하기: 비교급과 최상급',
    minutes: 20,
    objectives: ['Comparer avec plus, moins, aussi… que', 'Utiliser meilleur et mieux', 'Former le superlatif (le plus, le moins)'],
    sections: [
      {
        title: 'Le comparatif',
        body: `Avec un **adjectif** ou un **adverbe** : **plus** / **moins** / **aussi** + adjectif + **que**.
Séoul est **plus grande que** Paris. Le train est **moins cher que** l'avion. Elle parle **aussi vite que** moi.
Avec un **nom** : **plus de** / **moins de** / **autant de** + nom + **que** : J'ai **plus de** temps **que** toi.
Avec un **verbe** : verbe + **plus** / **moins** / **autant** + que : Il travaille **plus que** moi.`,
        examples: [
          { fr: 'Le coréen est plus difficile que l\'anglais pour moi.', ko: '저에게는 한국어가 영어보다 더 어려워요.' },
          { fr: 'À Paris, il y a moins de montagnes qu\'en Corée.', ko: '파리에는 한국보다 산이 적어요.' }
        ]
      },
      {
        title: 'Meilleur et mieux',
        body: `**bon** (adjectif) → **meilleur** : Ce gâteau est **meilleur que** l'autre. (jamais « plus bon »)
**bien** (adverbe) → **mieux** : Elle chante **mieux que** moi. (jamais « plus bien »)
Astuce : meilleur accompagne un **nom** (le gâteau), mieux accompagne un **verbe** (chanter).`,
        examples: [
          { fr: 'Ton français est meilleur qu\'avant !', ko: '네 프랑스어가 전보다 좋아졌어!' },
          { fr: 'Je dors mieux à la campagne.', ko: '시골에서 잠을 더 잘 자요.' }
        ]
      },
      {
        title: 'Le superlatif',
        body: `**le / la / les + plus / moins + adjectif** (+ **de**) : C'est **la plus belle** ville **de** France. C'est **le moins cher**.
Bon → **le meilleur** : C'est **le meilleur** restaurant du quartier. Bien → **le mieux** : C'est elle qui chante **le mieux**.`,
        examples: [
          { fr: 'C\'est le plus grand musée du monde.', ko: '세계에서 가장 큰 박물관이에요.' },
          { fr: 'Le bibimbap est mon plat préféré, c\'est le meilleur !', ko: '비빔밥은 내가 가장 좋아하는 음식이야, 최고야!' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Ce café est plus bon.', right: 'Ce café est meilleur.', why: 'Bon → meilleur.', whyKo: 'bon의 비교급은 meilleur.' },
      { wrong: 'Il parle plus bien que moi.', right: 'Il parle mieux que moi.', why: 'Bien → mieux.', whyKo: 'bien의 비교급은 mieux.' },
      { wrong: 'Paris est plus grand de Lyon.', right: 'Paris est plus grand que Lyon.', why: 'Comparatif : que ; superlatif : de.', whyKo: '비교급은 que, 최상급은 de.' }
    ],
    glossary: [
      { fr: 'plus… que', ko: '~보다 더' },
      { fr: 'moins… que', ko: '~보다 덜' },
      { fr: 'aussi… que', ko: '~만큼' },
      { fr: 'meilleur', ko: '더 좋은 (bon의 비교급)' },
      { fr: 'mieux', ko: '더 잘 (bien의 비교급)' },
      { fr: 'le plus', ko: '가장' }
    ],
    check: [
      { id: 'a2co-c1', type: 'qcm', prompt: 'Complétez :', sentence: 'Le TGV est ___ rapide ___ la voiture.', options: ['plus / que', 'plus / de', 'le plus / que', 'aussi / de'], answer: 0, explanation: 'Comparatif : plus + adjectif + que.' },
      { id: 'a2co-c2', type: 'qcm', prompt: 'Complétez :', sentence: 'Elle danse ___ que sa sœur.', options: ['meilleur', 'mieux', 'plus bien', 'plus bonne'], answer: 1, explanation: 'Danser (verbe) → mieux.', explanationKo: '동사를 꾸미므로 mieux.' },
      { id: 'a2co-c3', type: 'input', prompt: 'Complétez :', sentence: 'C\'est le ___ film de l\'année ! (bon)', answer: ['meilleur'], explanation: 'Bon → le meilleur.' },
      { id: 'a2co-c4', type: 'qcm', prompt: 'Complétez :', sentence: 'J\'ai ___ livres que toi.', options: ['plus de', 'plus des', 'plus que', 'le plus'], answer: 0, explanation: 'Avec un nom : plus de.' }
    ],
    practice: {
      facile: [
        { id: 'a2co-f1', type: 'qcm', prompt: 'Complétez :', sentence: 'L\'été est ___ chaud que l\'hiver.', options: ['plus', 'meilleur', 'mieux', 'de'], answer: 0, explanation: 'Plus + adjectif.' },
        { id: 'a2co-f2', type: 'qcm', prompt: 'Le contraire de « plus cher » :', options: ['moins cher', 'aussi cher', 'meilleur', 'le plus cher'], answer: 0, explanation: 'Plus ≠ moins.' }
      ],
      moyen: [
        { id: 'a2co-m1', type: 'qcm', prompt: 'Complétez :', sentence: 'Cette pizza est ___ que l\'autre.', options: ['mieux', 'meilleure', 'plus bonne', 'meilleur'], answer: 1, explanation: 'Pizza féminin → meilleure.' },
        { id: 'a2co-m2', type: 'input', prompt: 'Complétez (égalité) :', sentence: 'Il est ___ grand que son père.', answer: ['aussi'], explanation: 'Égalité avec un adjectif : aussi… que.' }
      ],
      difficile: [
        { id: 'a2co-d1', type: 'qcm', prompt: 'Complétez :', sentence: 'C\'est la ville la plus peuplée ___ pays.', options: ['que le', 'du', 'de la', 'dans'], answer: 1, explanation: 'Superlatif + de (de + le = du).' },
        { id: 'a2co-d2', type: 'qcm', prompt: 'Complétez (égalité avec un nom) :', sentence: 'Nous avons ___ travail que vous.', options: ['aussi de', 'autant de', 'aussi', 'autant'], answer: 1, explanation: 'Avec un nom : autant de.' }
      ]
    }
  },
  {
    id: 'a2-prepositions',
    level: 'A2',
    title: 'Les prépositions de lieu et de temps',
    titleKo: '장소와 시간의 전치사',
    minutes: 25,
    objectives: ['Dire où on est / va : à, en, au, aux, chez', 'Situer dans le temps : depuis, pendant, il y a, dans', 'Utiliser les contractions au, aux, du, des'],
    sections: [
      {
        title: 'Villes et pays',
        body: `**Ville** → **à** : à Paris, à Séoul, à Busan.
**Pays féminin** (souvent en -e) → **en** : en France, en Corée, en Italie.
**Pays masculin** → **au** : au Japon, au Canada, au Portugal.
**Pays pluriel** → **aux** : aux États-Unis, aux Pays-Bas.
Pour l'origine : **de** Paris, **de** France, **du** Japon, **des** États-Unis.`,
        examples: [
          { fr: 'J\'habite à Séoul, en Corée.', ko: '저는 한국 서울에 살아요.' },
          { fr: 'L\'été prochain, nous allons au Canada.', ko: '내년 여름에 우리는 캐나다에 가요.' }
        ]
      },
      {
        title: 'Au, à la, chez',
        body: `**à + le = au** : au cinéma, au marché. **à + les = aux** : aux toilettes. **à la**, **à l'** ne changent pas : à la gare, à l'école.
Pour une **personne**, on utilise **chez** : chez moi, chez le médecin, chez Marie.`,
        examples: [
          { fr: 'Je vais au marché puis chez ma grand-mère.', ko: '시장에 갔다가 할머니 댁에 가요.' },
          { fr: 'Elle a rendez-vous chez le dentiste.', ko: '그녀는 치과 예약이 있어요.' }
        ]
      },
      {
        title: 'Situer dans le temps',
        body: `**il y a** + durée = un moment passé (~전에) : Je suis arrivé **il y a** deux ans.
**depuis** + durée = une action qui continue (~부터, ~째) : J'apprends le français **depuis** six mois.
**pendant** + durée = la durée d'une action terminée ou prévue (~동안) : J'ai dormi **pendant** dix heures.
**dans** + durée = dans le futur (~후에) : Le film commence **dans** cinq minutes.
**en** + mois/année/saison : **en** mai, **en** 2026, **en** été (mais **au** printemps).`,
        examples: [
          { fr: 'J\'habite en France depuis trois ans.', ko: '저는 3년째 프랑스에 살고 있어요.' },
          { fr: 'Je suis arrivée il y a trois ans.', ko: '저는 3년 전에 도착했어요.' },
          { fr: 'Je reviens dans une semaine.', ko: '일주일 후에 돌아와요.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Je vais en Japon.', right: 'Je vais au Japon.', why: 'Japon est masculin → au.', whyKo: 'Japon은 남성 → au.' },
      { wrong: 'Je vais à le cinéma.', right: 'Je vais au cinéma.', why: 'À + le = au.', whyKo: 'à + le = au.' },
      { wrong: 'J\'habite ici il y a deux ans.', right: 'J\'habite ici depuis deux ans.', why: 'Action qui continue → depuis.', whyKo: '계속되는 일 → depuis.' },
      { wrong: 'Je vais à mon ami.', right: 'Je vais chez mon ami.', why: 'Chez + personne.', whyKo: '사람의 집 → chez.' }
    ],
    glossary: [
      { fr: 'chez', ko: '~의 집에, ~에게' },
      { fr: 'depuis', ko: '~부터, ~째' },
      { fr: 'pendant', ko: '~동안' },
      { fr: 'il y a (+ durée)', ko: '~전에' },
      { fr: 'dans (+ durée)', ko: '~후에' },
      { fr: 'un pays', ko: '나라' }
    ],
    check: [
      { id: 'a2pp-c1', type: 'qcm', prompt: 'Complétez :', sentence: 'Elle travaille ___ Portugal.', options: ['en', 'au', 'à', 'aux'], answer: 1, explanation: 'Portugal est masculin → au.' },
      { id: 'a2pp-c2', type: 'qcm', prompt: 'Complétez :', sentence: 'J\'apprends le coréen ___ deux ans (et je continue).', options: ['il y a', 'depuis', 'pendant', 'dans'], answer: 1, explanation: 'Action qui continue → depuis.', explanationKo: '지금도 계속 → depuis.' },
      { id: 'a2pp-c3', type: 'input', prompt: 'Complétez avec à, au, aux ou chez :', sentence: 'Ce soir, je dîne ___ mes parents.', answer: ['chez'], explanation: 'Une personne → chez.' },
      { id: 'a2pp-c4', type: 'qcm', prompt: 'Complétez :', sentence: 'Le bus arrive ___ dix minutes.', options: ['il y a', 'depuis', 'dans', 'pendant'], answer: 2, explanation: 'Futur → dans + durée.' }
    ],
    practice: {
      facile: [
        { id: 'a2pp-f1', type: 'qcm', prompt: 'Complétez :', sentence: 'Je suis né ___ Busan.', options: ['en', 'à', 'au', 'chez'], answer: 1, explanation: 'Ville → à.' },
        { id: 'a2pp-f2', type: 'qcm', prompt: 'Complétez :', sentence: 'Nous allons ___ France en juillet.', options: ['au', 'à la', 'en', 'aux'], answer: 2, explanation: 'Pays féminin → en.' },
        { id: 'a2pp-f3', type: 'qcm', prompt: 'Complétez :', sentence: 'Je vais ___ supermarché.', options: ['à le', 'au', 'en', 'chez'], answer: 1, explanation: 'À + le = au.' }
      ],
      moyen: [
        { id: 'a2pp-m1', type: 'input', prompt: 'Complétez :', sentence: 'Ils habitent ___ États-Unis.', answer: ['aux'], explanation: 'Pays pluriel → aux.' },
        { id: 'a2pp-m2', type: 'qcm', prompt: 'Complétez :', sentence: 'J\'ai visité le Louvre ___ trois jours (c\'est fini).', options: ['depuis', 'il y a', 'dans', 'en'], answer: 1, explanation: 'Un moment passé → il y a.' }
      ],
      difficile: [
        { id: 'a2pp-d1', type: 'qcm', prompt: 'Complétez :', sentence: 'J\'ai attendu le bus ___ une heure !', options: ['depuis', 'pendant', 'dans', 'il y a'], answer: 1, explanation: 'Durée d\'une action terminée → pendant.' },
        { id: 'a2pp-d2', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['Je viens du Corée.', 'Je viens de Corée.', 'Je viens en Corée.', 'Je viens à Corée.'], answer: 1, explanation: 'Pays féminin : venir de (sans article).' }
      ]
    }
  },

  // ───────────────────────────────── B1
  {
    id: 'b1-hypothese',
    level: 'B1',
    title: 'Exprimer une hypothèse : si et le conditionnel',
    titleKo: '가정 표현: si와 조건법',
    minutes: 30,
    objectives: ['Former le conditionnel présent', 'Construire si + présent / si + imparfait', 'Exprimer un souhait poli avec le conditionnel'],
    sections: [
      {
        title: 'Le conditionnel présent',
        body: `**Radical du futur + terminaisons de l'imparfait** : -ais, -ais, -ait, -ions, -iez, -aient.
parler → je parler**ais** ; être → je **serais** ; avoir → j'**aurais** ; aller → j'**irais** ; faire → je **ferais** ; pouvoir → je **pourrais** ; vouloir → je **voudrais**.
Usages : la **politesse** (Je **voudrais** un café), le **conseil** (Tu **devrais** te reposer), le **souhait** (J'**aimerais** voyager), l'**hypothèse**.`,
        examples: [
          { fr: 'Pourriez-vous m\'aider, s\'il vous plaît ?', ko: '저를 좀 도와주실 수 있을까요?' },
          { fr: 'Tu devrais dormir plus.', ko: '너는 잠을 더 자는 게 좋겠어.' }
        ]
      },
      {
        title: 'Les phrases avec si',
        body: `**Si + présent → futur** (situation possible, réelle) : **Si** il **fait** beau demain, nous **irons** à la plage.
**Si + imparfait → conditionnel présent** (situation imaginaire ou peu probable) : **Si** j'**avais** de l'argent, j'**achèterais** une maison.
Attention : **jamais de conditionnel ni de futur après si** dans ces phrases.`,
        examples: [
          { fr: 'Si tu viens samedi, on cuisinera ensemble.', ko: '토요일에 오면 같이 요리하자.' },
          { fr: 'Si j\'étais toi, j\'accepterais ce poste.', ko: '내가 너라면 그 자리를 받아들일 거야.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Si j\'aurais le temps, je viendrais.', right: 'Si j\'avais le temps, je viendrais.', why: 'Après si : imparfait, pas conditionnel.', whyKo: 'si 뒤에는 조건법이 아니라 반과거.' },
      { wrong: 'Si il pleut…', right: 'S\'il pleut…', why: 'Si + il / ils → s\'il, s\'ils.', whyKo: 'si + il → s\'il.' },
      { wrong: 'Je voudrai un thé, s\'il vous plaît.', right: 'Je voudrais un thé, s\'il vous plaît.', why: 'Politesse → conditionnel (-ais).', whyKo: '공손한 요청 → 조건법 (-ais).' }
    ],
    glossary: [
      { fr: 'le conditionnel', ko: '조건법' },
      { fr: 'une hypothèse', ko: '가정' },
      { fr: 'un souhait', ko: '소망' },
      { fr: 'un conseil', ko: '조언' },
      { fr: 'devrais (devoir)', ko: '~하는 게 좋겠다' }
    ],
    check: [
      { id: 'b1hy-c1', type: 'qcm', prompt: 'Complétez :', sentence: 'Si j\'avais une voiture, je ___ à la campagne.', options: ['partirai', 'partirais', 'pars', 'partais'], answer: 1, explanation: 'Si + imparfait → conditionnel.' },
      { id: 'b1hy-c2', type: 'qcm', prompt: 'Complétez :', sentence: 'S\'il ___ demain, on restera à la maison.', options: ['pleuvrait', 'pleut', 'pleuvra', 'pleuvait'], answer: 1, explanation: 'Si + présent → futur.', explanationKo: '실제 가능성 → si + 현재, 주절은 미래.' },
      { id: 'b1hy-c3', type: 'input', prompt: 'Conditionnel de « vouloir » (je) :', answer: ['voudrais', 'je voudrais'], explanation: 'Je voudrais.' },
      { id: 'b1hy-c4', type: 'qcm', prompt: 'Quelle phrase donne un conseil ?', options: ['Tu devrais lire ce livre.', 'Tu lis ce livre.', 'Tu as lu ce livre.', 'Tu liras ce livre.'], answer: 0, explanation: 'Devoir au conditionnel = conseil.' }
    ],
    practice: {
      facile: [
        { id: 'b1hy-f1', type: 'qcm', prompt: 'Conditionnel de « aimer » (j\') :', options: ['j\'aimerai', 'j\'aimerais', 'j\'aimais', 'j\'aime'], answer: 1, explanation: 'J\'aimerais.' },
        { id: 'b1hy-f2', type: 'qcm', prompt: 'Complétez :', sentence: '___ -vous me passer le sel ?', options: ['Pouvez', 'Pourriez', 'Pourrez', 'Pouviez'], answer: 1, explanation: 'Politesse : pourriez-vous.' }
      ],
      moyen: [
        { id: 'b1hy-m1', type: 'input', prompt: 'Conditionnel :', sentence: 'Si j\'étais riche, je (voyager) partout.', answer: ['voyagerais', 'je voyagerais'], explanation: 'Si + imparfait → conditionnel.' },
        { id: 'b1hy-m2', type: 'qcm', prompt: 'Complétez :', sentence: 'Si tu ___ plus tôt, tu ne serais pas fatigué.', options: ['te coucherais', 'te couchais', 'te couches', 'te coucheras'], answer: 1, explanation: 'Si + imparfait.' }
      ],
      difficile: [
        { id: 'b1hy-d1', type: 'input', prompt: 'Conditionnel :', sentence: 'Si nous avions le temps, nous (faire) du sport.', answer: ['ferions', 'nous ferions'], explanation: 'Faire → fer- + -ions.' },
        { id: 'b1hy-d2', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['Si il vient, je serai content.', 'S\'il vient, je serai content.', 'S\'il viendra, je serai content.', 'Si il viendrait, je serais content.'], answer: 1, explanation: 'S\'il + présent → futur.' }
      ]
    }
  },

  // ───────────────────────────────── B2
  {
    id: 'b2-passif-gerondif',
    level: 'B2',
    title: 'La voix passive et le gérondif',
    titleKo: '수동태와 제롱디프',
    minutes: 30,
    objectives: ['Transformer une phrase active en phrase passive', 'Choisir par ou de après le passif', 'Former et utiliser le gérondif (en + -ant)'],
    sections: [
      {
        title: 'La voix passive',
        body: `**être** (au temps de la phrase active) + **participe passé** (accordé avec le sujet) + **par** + agent.
Actif : La mairie **a construit** le pont. → Passif : Le pont **a été construit par** la mairie.
L'agent est souvent **omis** quand il est inconnu ou évident : La loi **a été votée** hier.
Avec les verbes de sentiment ou d'état, on utilise souvent **de** : Il est **aimé de** tous. Le jardin est **entouré d'**arbres.`,
        examples: [
          { fr: 'Le musée sera fermé pendant les travaux.', ko: '공사 기간 동안 박물관은 문을 닫을 것이다.' },
          { fr: 'Ce roman a été traduit en coréen.', ko: '이 소설은 한국어로 번역되었다.' }
        ]
      },
      {
        title: 'Le gérondif',
        body: `**en + participe présent** (radical de **nous** au présent + **-ant**) : nous parlons → **en parlant** ; nous finissons → **en finissant**. Irréguliers : être → **en étant**, avoir → **en ayant**, savoir → **en sachant**.
Il exprime :
la **simultanéité** : Il chante **en cuisinant**.
la **manière / le moyen** : On apprend une langue **en pratiquant** tous les jours.
la **condition** : **En partant** maintenant, tu arriveras à l'heure.
Le sujet du gérondif est **toujours le même** que celui du verbe principal.`,
        examples: [
          { fr: 'J\'ai appris le français en regardant des séries.', ko: '나는 드라마를 보면서 프랑스어를 배웠다.' },
          { fr: 'En travaillant régulièrement, vous réussirez le DELF.', ko: '꾸준히 공부하면 DELF에 합격할 것이다.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'La lettre a été écrit par Marie.', right: 'La lettre a été écrite par Marie.', why: 'Au passif, le participe s\'accorde avec le sujet.', whyKo: '수동태의 과거분사는 주어와 일치.' },
      { wrong: 'En sortant du métro, la pluie a commencé.', right: 'En sortant du métro, j\'ai vu qu\'il pleuvait.', why: 'Le sujet du gérondif = le sujet de la phrase.', whyKo: '제롱디프의 주어는 주절의 주어와 같아야 합니다.' },
      { wrong: 'en faisant → en faisent', right: 'en faisant', why: 'Participe présent toujours en -ant.', whyKo: '현재분사는 항상 -ant.' }
    ],
    glossary: [
      { fr: 'la voix passive', ko: '수동태' },
      { fr: 'la voix active', ko: '능동태' },
      { fr: 'un agent', ko: '행위자' },
      { fr: 'le gérondif', ko: '제롱디프 (en + -ant)' },
      { fr: 'la simultanéité', ko: '동시성' }
    ],
    check: [
      { id: 'b2pg-c1', type: 'qcm', prompt: 'Mettez au passif : « Les étudiants préparent l\'examen. »', options: ['L\'examen est préparé par les étudiants.', 'L\'examen a préparé les étudiants.', 'L\'examen est préparant par les étudiants.', 'Les étudiants sont préparés par l\'examen.'], answer: 0, explanation: 'Présent → être au présent + participe.' },
      { id: 'b2pg-c2', type: 'qcm', prompt: 'Complétez :', sentence: 'Ce professeur est respecté ___ tous ses élèves.', options: ['de', 'à', 'pour', 'en'], answer: 0, explanation: 'Sentiment → de (par est aussi possible).' },
      { id: 'b2pg-c3', type: 'input', prompt: 'Gérondif de « prendre » :', answer: ['en prenant'], explanation: 'Nous prenons → en prenant.' },
      { id: 'b2pg-c4', type: 'qcm', prompt: 'Que marque le gérondif ici ?', sentence: 'En lisant chaque jour, elle a enrichi son vocabulaire.', options: ['le moyen', 'l\'opposition', 'le but', 'la cause passée lointaine'], answer: 0, explanation: 'Comment ? → en lisant (moyen).' }
    ],
    practice: {
      facile: [
        { id: 'b2pg-f1', type: 'qcm', prompt: 'Gérondif de « finir » :', options: ['en finant', 'en finissant', 'en finissent', 'en fini'], answer: 1, explanation: 'Nous finissons → en finissant.' },
        { id: 'b2pg-f2', type: 'qcm', prompt: 'Complétez (passif) :', sentence: 'La réunion ___ annulée hier.', options: ['est', 'a été', 'avait', 'sera'], answer: 1, explanation: 'Passé composé passif : a été + participe.' }
      ],
      moyen: [
        { id: 'b2pg-m1', type: 'input', prompt: 'Mettez au passif (futur) :', sentence: 'On publiera les résultats lundi. → Les résultats ___ publiés lundi.', answer: ['seront'], explanation: 'Futur → seront.' },
        { id: 'b2pg-m2', type: 'qcm', prompt: 'Gérondif de « savoir » :', options: ['en savant', 'en sachant', 'en sayant', 'en sachent'], answer: 1, explanation: 'Irrégulier : en sachant.' }
      ],
      difficile: [
        { id: 'b2pg-d1', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['En arrivant à la gare, le train était parti.', 'En arrivant à la gare, j\'ai vu que le train était parti.', 'En arrivant à la gare, il a fait froid.', 'En arrivant à la gare, la pluie tombait.'], answer: 1, explanation: 'Même sujet pour le gérondif et le verbe.' },
        { id: 'b2pg-d2', type: 'input', prompt: 'Accordez :', sentence: 'Les décisions ont été (prendre) par le conseil.', answer: ['prises'], explanation: 'Féminin pluriel : prises.' }
      ]
    }
  },

  // ───────────────────────────────── C1
  {
    id: 'c1-nuances',
    level: 'C1',
    title: 'Nuancer sa pensée : concession et opposition avancées',
    titleKo: '생각에 뉘앙스 주기: 고급 양보와 대립',
    minutes: 30,
    objectives: ['Utiliser quoique, encore que, si… que, avoir beau', 'Choisir le bon mode après chaque expression', 'Varier son style à l\'écrit soutenu'],
    sections: [
      {
        title: 'Des concessions plus élégantes',
        body: `**quoique** / **encore que** + **subjonctif** (soutenu, synonymes de bien que) : **Quoiqu'**il **soit** tard, la réunion continue.
**si / aussi + adjectif + que** + **subjonctif** : **Si** difficile **qu'**il **soit**, cet examen est accessible.
**avoir beau + infinitif** (même si on essaie, le résultat ne change pas) : J'**ai beau** répéter, il ne m'écoute pas.
**quel que soit** + nom (accordé) : **Quelles que soient** vos raisons, il faut prévenir.`,
        examples: [
          { fr: 'J\'ai beau chercher, je ne trouve pas la solution.', ko: '아무리 찾아도 해결책을 찾지 못한다.' },
          { fr: 'Si brillant qu\'il soit, il manque d\'expérience.', ko: '그가 아무리 뛰어나다 해도 경험이 부족하다.' }
        ]
      },
      {
        title: 'Opposer avec précision',
        body: `**alors que / tandis que** + indicatif : opposer deux faits.
**au lieu de** + infinitif : remplacer une action par une autre. **loin de** + infinitif : renforcer l'opposition (Loin de diminuer, le chômage augmente).
**il n'en demeure pas moins que** / **il n'empêche que** + indicatif : concéder puis maintenir sa position (registre soutenu).`,
        examples: [
          { fr: 'Loin de décourager les jeunes, cette réforme les a motivés.', ko: '이 개혁은 젊은이들을 낙담시키기는커녕 오히려 동기를 부여했다.' },
          { fr: 'Le projet est coûteux ; il n\'en demeure pas moins nécessaire.', ko: '그 계획은 비용이 많이 든다. 그렇다고 해서 필요하지 않은 것은 아니다.' }
        ]
      }
    ],
    mistakes: [
      { wrong: 'Quoiqu\'il est malade, il travaille.', right: 'Quoiqu\'il soit malade, il travaille.', why: 'Quoique + subjonctif.', whyKo: 'quoique + 접속법.' },
      { wrong: 'J\'ai beau que je travaille…', right: 'J\'ai beau travailler…', why: 'Avoir beau + infinitif.', whyKo: 'avoir beau + 동사원형.' },
      { wrong: 'quoi que (en deux mots) = bien que', right: 'quoique (un mot) = bien que ; quoi que (deux mots) = quelle que soit la chose que', why: 'Ne pas confondre.', whyKo: 'quoique(한 단어)와 quoi que(두 단어)는 뜻이 다릅니다.' }
    ],
    glossary: [
      { fr: 'quoique', ko: '비록 ~이지만' },
      { fr: 'avoir beau', ko: '아무리 ~해도' },
      { fr: 'loin de', ko: '~하기는커녕' },
      { fr: 'il n\'en demeure pas moins que', ko: '그럼에도 ~인 것은 변함없다' },
      { fr: 'quel que soit', ko: '~이 무엇이든' }
    ],
    check: [
      { id: 'c1nu-c1', type: 'qcm', prompt: 'Complétez :', sentence: 'Quoiqu\'elle ___ raison, personne ne l\'écoute.', options: ['a', 'ait', 'aura', 'avait'], answer: 1, explanation: 'Quoique + subjonctif : ait.' },
      { id: 'c1nu-c2', type: 'qcm', prompt: 'Complétez :', sentence: 'Il a beau ___, il n\'y arrive pas.', options: ['qu\'il essaie', 'essayer', 'essayant', 'il essaie'], answer: 1, explanation: 'Avoir beau + infinitif.', explanationKo: 'avoir beau + 동사원형.' },
      { id: 'c1nu-c3', type: 'input', prompt: 'Accordez « quel que soit » :', sentence: '___ que soient les difficultés, nous continuerons.', answer: ['quelles', 'Quelles'], explanation: 'Difficultés : féminin pluriel → quelles.' },
      { id: 'c1nu-c4', type: 'qcm', prompt: 'Quel connecteur signifie « bien au contraire » ?', options: ['loin de', 'au lieu de', 'grâce à', 'à condition de'], answer: 0, explanation: 'Loin de + infinitif renforce l\'opposition.' }
    ],
    practice: {
      facile: [
        { id: 'c1nu-f1', type: 'qcm', prompt: 'Quel mode après « encore que » ?', options: ['indicatif', 'subjonctif', 'infinitif', 'conditionnel'], answer: 1, explanation: 'Encore que + subjonctif.' },
        { id: 'c1nu-f2', type: 'qcm', prompt: 'Synonyme soutenu de « bien que » :', options: ['quoique', 'parce que', 'puisque', 'alors'], answer: 0, explanation: 'Quoique.' }
      ],
      moyen: [
        { id: 'c1nu-m1', type: 'qcm', prompt: 'Complétez :', sentence: 'Si compliqué que ce problème ___, nous le résoudrons.', options: ['est', 'soit', 'sera', 'serait'], answer: 1, explanation: 'Si + adjectif + que + subjonctif.' },
        { id: 'c1nu-m2', type: 'order', prompt: 'Remettez dans l\'ordre :', words: ['beau', 'J\'ai', 'courir,', 'le', 'rate', 'je', 'bus'], answer: 'J\'ai beau courir, je rate le bus', explanation: 'Avoir beau + infinitif, puis la conséquence inchangée.' }
      ],
      difficile: [
        { id: 'c1nu-d1', type: 'qcm', prompt: 'Quelle phrase est correcte ?', options: ['Quoi qu\'il soit fatigué, il continue.', 'Quoiqu\'il soit fatigué, il continue.', 'Quoiqu\'il est fatigué, il continue.', 'Quoi qu\'il est fatigué, il continue.'], answer: 1, explanation: 'Quoique (un mot) + subjonctif.' },
        { id: 'c1nu-d2', type: 'qcm', prompt: 'Complétez :', sentence: 'Ce choix est risqué ; il n\'en demeure pas moins ___.', options: ['courageux', 'que courageux', 'de courageux', 'courageusement'], answer: 0, explanation: 'Il n\'en demeure pas moins + adjectif / que + indicatif.' }
      ]
    }
  }
]

export const LESSONS_EXTRA_KO = {
  'a1-partitifs': {
    objectives: ['du, de la, de l\', des 사용하기', '부정문에서 « pas de » 쓰기', '수량 표현하기: beaucoup de, un peu de, un kilo de'],
    sections: [
      `셀 수 없는 양(물, 빵, 용기 등)을 말할 때는 부분관사를 씁니다. 한국어로는 따로 번역하지 않지만 "약간의, 어느 정도의"라는 의미가 들어 있습니다.
남성: du (du pain 빵), 여성: de la (de la soupe 수프), 모음 앞: de l' (de l'eau 물), 복수: des (des pâtes 파스타).
manger(먹다), boire(마시다), acheter(사다), prendre(먹다/마시다), il y a(~이 있다), faire du sport(운동하다) 같은 표현과 자주 씁니다.`,
      `부정문에서는 du, de la, de l', des, un, une가 모두 de(모음 앞에서는 d')로 바뀝니다.
Je bois du café → Je ne bois pas de café (커피를 마시지 않아요).
단, être 동사 뒤에서는 관사가 그대로 남습니다: Ce n'est pas du sucre, c'est du sel (설탕이 아니라 소금이에요).`,
      `양을 나타내는 말 뒤에는 관사 없이 de만 씁니다: beaucoup de(많은), un peu de(조금의), trop de(너무 많은), assez de(충분한), un kilo de(1킬로의), une bouteille de(한 병의).
beaucoup de travail(많은 일), une bouteille d'eau(물 한 병).`
    ],
    contrast: {
      fr: 'Le coréen n\'indique pas si une quantité est comptable ou non : « 빵을 먹어요 » suffit. En français, il faut choisir entre le pain (en général), du pain (une quantité) et un pain (une unité).',
      ko: '한국어는 "빵을 먹어요"처럼 셀 수 있는지 없는지를 표시하지 않습니다. 프랑스어에서는 le pain(빵 전반), du pain(어느 정도의 빵), un pain(빵 하나) 중에서 골라야 합니다.'
    }
  },
  'a1-questions-negation': {
    objectives: ['세 가지 방법으로 질문하기', '의문사 사용하기 (où, quand, comment…)', '부정문 만들기: ne… pas, ne… jamais, ne… plus'],
    sections: [
      `프랑스어로 질문하는 방법은 세 가지입니다.
1) 억양: Tu viens ? — 문장 끝을 올려 말합니다 (일상 회화).
2) Est-ce que: Est-ce que tu viens ? — 가장 무난한 방법입니다.
3) 도치: Viens-tu ? — 동사와 주어의 순서를 바꾸고 하이픈(-)을 넣습니다 (격식, 글).
의문사: où(어디), quand(언제), comment(어떻게), pourquoi(왜), combien(얼마나/몇), qui(누구), que/qu'est-ce que(무엇). 의문사는 보통 문장 맨 앞에 옵니다: Où est-ce que tu habites ?`,
      `부정은 두 부분이 동사를 감쌉니다: ne + 동사 + pas. 모음 앞에서 ne는 n'가 됩니다.
다른 부정 표현: ne… jamais(절대/한 번도 ~않다), ne… plus(더 이상 ~않다), ne… rien(아무것도 ~않다), ne… personne(아무도 ~않다).
일상 대화에서는 ne를 빼고 말하는 경우가 많지만(J'sais pas), 글이나 시험에서는 반드시 ne를 쓰세요.`
    ],
    contrast: {
      fr: 'En coréen, la question se marque par la terminaison (-요?, -까?) et la négation par 안 ou -지 않다 avant ou après le verbe. En français, la négation a deux mots autour du verbe, et le mot interrogatif se place au début.',
      ko: '한국어는 "-요?, -까?" 같은 어미로 질문하고, "안"이나 "-지 않다"로 부정합니다. 프랑스어에서는 부정어 두 개가 동사를 감싸고, 의문사는 문장 맨 앞에 옵니다.'
    }
  },
  'a2-futur': {
    objectives: ['근접미래 만들기 (aller + 동사원형)', '단순미래와 불규칙 동사 익히기', '두 가지 미래 구별하기'],
    sections: [
      `근접미래는 aller의 현재형 + 동사원형입니다: je vais partir(떠날 거야), nous allons voir(볼 거야).
가까운 미래나 이미 정한 일에 쓰며, 말할 때 특히 많이 씁니다. 한국어의 "-ㄹ 거예요"와 비슷합니다: Ce soir, je vais regarder un film.
부정: Je ne vais pas sortir (안 나갈 거야).`,
      `단순미래는 동사원형 + -ai, -as, -a, -ons, -ez, -ont입니다: je parlerai, tu finiras. -re 동사는 e를 빼고 붙입니다: prendre → je prendrai.
꼭 외울 불규칙 동사: être → je serai, avoir → j'aurai, aller → j'irai, faire → je ferai, venir → je viendrai, voir → je verrai, pouvoir → je pourrai, vouloir → je voudrai.
먼 미래, 예측(일기예보), 약속, 글에서 주로 씁니다. "-ㄹ게요"(약속)의 느낌도 단순미래로 표현합니다: Je t'appellerai demain.`,
      `미래의 일을 말할 때 quand(~할 때) 뒤에는 현재가 아니라 미래형을 씁니다. 한국어로는 "프랑스에 있을 때"라고 현재처럼 말하지만, 프랑스어는 Quand je serai en France…처럼 미래를 씁니다.
미래 표현: demain(내일), la semaine prochaine(다음 주), l'année prochaine(내년), dans deux jours(이틀 후), bientôt(곧), plus tard(나중에).`
    ],
    contrast: {
      fr: 'Le coréen utilise souvent -ㄹ 거예요 pour tout le futur, et le présent après « ~할 때 ». Le français distingue futur proche et futur simple, et exige le futur après « quand » quand on parle de l\'avenir.',
      ko: '한국어는 미래를 대부분 "-ㄹ 거예요"로 말하고, "~할 때" 앞에는 현재형을 씁니다. 프랑스어는 근접미래와 단순미래를 구별하고, 미래를 말할 때는 quand 뒤에도 미래형을 써야 합니다.'
    }
  },
  'a2-pronoms': {
    objectives: ['직접목적어 바꾸기 (le, la, les)', '사람을 가리키는 간접목적어 바꾸기 (lui, leur)', '대명사를 동사 앞에 놓기'],
    sections: [
      `직접목적어(COD)는 전치사 없이 동사 바로 뒤에 오는 말입니다: Je regarde la télé(텔레비전을 봐요).
같은 말을 반복하지 않도록 le(남성), la(여성), l'(모음 앞), les(복수)로 바꿉니다: Je la regarde(그것을 봐요).
대명사는 동사 "앞"에 옵니다. 목적어가 동사 앞에 오는 한국어 어순과 조금 비슷합니다.`,
      `간접목적어(COI)는 à + 사람입니다: Je parle à Sophie(소피에게 말해요). 이것을 lui(단수, 남녀 모두)와 leur(복수)로 바꿉니다.
Je téléphone à ma mère → Je lui téléphone(그녀에게 전화해요). J'écris à mes amis → Je leur écris(그들에게 편지를 써요).
à와 함께 쓰는 동사: parler à, téléphoner à, écrire à, répondre à, donner à, envoyer à, demander à, offrir à. 한국어의 "~에게"와 비슷하다고 생각하세요.`,
      `대명사는 항상 활용된 동사 앞에 옵니다: Je le vois. 부정문: Je ne le vois pas.
복합과거에서는 조동사 앞: Je l'ai vu, Je lui ai parlé.
동사원형이 있으면 동사원형 앞: Je vais le voir, Je veux lui parler.`
    ],
    contrast: {
      fr: 'En coréen, on omet souvent simplement le complément (« 봤어요 » suffit). En français, on ne peut pas l\'omettre : il faut le remplacer par un pronom placé avant le verbe.',
      ko: '한국어에서는 목적어를 그냥 생략하는 경우가 많습니다 ("봤어요"). 프랑스어에서는 생략할 수 없고, 동사 앞에 대명사를 넣어야 합니다: Je l\'ai vu.'
    }
  },
  'a2-comparaison': {
    objectives: ['plus, moins, aussi… que로 비교하기', 'meilleur와 mieux 사용하기', '최상급 만들기 (le plus, le moins)'],
    sections: [
      `형용사·부사 비교: plus(더)/moins(덜)/aussi(만큼) + 형용사 + que(~보다).
Séoul est plus grande que Paris(서울은 파리보다 크다). Le train est moins cher que l'avion(기차가 비행기보다 덜 비싸다).
명사 비교: plus de/moins de/autant de + 명사 + que. J'ai plus de temps que toi(나는 너보다 시간이 많아).
동사 비교: 동사 + plus/moins/autant que. Il travaille plus que moi.`,
      `bon(좋은, 형용사)의 비교급은 meilleur입니다. "plus bon"은 틀립니다: Ce gâteau est meilleur.
bien(잘, 부사)의 비교급은 mieux입니다. "plus bien"은 틀립니다: Elle chante mieux que moi.
팁: 명사를 꾸미면 meilleur, 동사를 꾸미면 mieux.`,
      `최상급: le/la/les + plus/moins + 형용사 (+ de). C'est la plus belle ville de France(프랑스에서 가장 아름다운 도시).
bon → le meilleur(최고의), bien → le mieux(가장 잘). 최상급 뒤의 "~에서"는 que가 아니라 de입니다.`
    ],
    contrast: {
      fr: 'Le coréen marque la comparaison avec -보다 placé après l\'élément comparé et 더/덜 devant l\'adjectif. Le français place plus/moins devant l\'adjectif et que avant le deuxième élément : l\'ordre est inversé.',
      ko: '한국어는 비교 대상 뒤에 "-보다"를 붙이고 형용사 앞에 "더/덜"을 씁니다. 프랑스어는 형용사 앞에 plus/moins, 두 번째 대상 앞에 que를 놓으므로 순서가 반대입니다: 파리보다 더 크다 → plus grande que Paris.'
    }
  },
  'a2-prepositions': {
    objectives: ['장소 말하기: à, en, au, aux, chez', '시간 말하기: depuis, pendant, il y a, dans', '축약형 au, aux, du, des 쓰기'],
    sections: [
      `도시 앞: à (à Paris, à Séoul).
여성 나라(대부분 -e로 끝남) 앞: en (en France, en Corée).
남성 나라 앞: au (au Japon, au Canada).
복수 나라 앞: aux (aux États-Unis).
출신: de Paris, de France, du Japon, des États-Unis.`,
      `à + le = au (au cinéma 영화관에), à + les = aux. à la, à l'은 그대로입니다 (à la gare, à l'école).
사람(의 집, 가게)에 갈 때는 chez를 씁니다: chez moi(우리 집에), chez le médecin(병원에), chez Marie(마리네 집에).`,
      `il y a + 기간 = ~전에 (끝난 일): Je suis arrivé il y a deux ans(2년 전에 도착했다).
depuis + 기간 = ~째, ~부터 (지금도 계속): J'apprends le français depuis six mois(6개월째 프랑스어를 배우고 있다).
pendant + 기간 = ~동안: J'ai dormi pendant dix heures(10시간 동안 잤다).
dans + 기간 = ~후에 (미래): dans cinq minutes(5분 후에).
월, 연도, 계절 앞: en mai, en 2026, en été (단, 봄은 au printemps).`
    ],
    contrast: {
      fr: 'Le coréen utilise une seule particule de lieu (-에 / -에서) quel que soit le lieu. Le français choisit la préposition selon le type de lieu (ville, pays féminin ou masculin, personne). Et « 2년째 » se dit avec depuis + présent, pas avec un passé.',
      ko: '한국어는 장소가 무엇이든 "-에/-에서"를 씁니다. 프랑스어는 장소의 종류(도시, 여성·남성 나라, 사람)에 따라 전치사를 바꿉니다. 또 "2년째 배우고 있다"는 과거형이 아니라 depuis + 현재형으로 말합니다.'
    }
  },
  'b1-hypothese': {
    objectives: ['조건법 현재 만들기', 'si + 현재 / si + 반과거 문장 만들기', '조건법으로 공손한 소망 표현하기'],
    sections: [
      `조건법 현재 = 미래형의 어간 + 반과거 어미(-ais, -ais, -ait, -ions, -iez, -aient).
parler → je parlerais, être → je serais, avoir → j'aurais, aller → j'irais, faire → je ferais, pouvoir → je pourrais, vouloir → je voudrais.
쓰임: 공손함(Je voudrais un café 커피 한 잔 주세요), 조언(Tu devrais te reposer 쉬는 게 좋겠어), 소망(J'aimerais voyager 여행하고 싶어요), 가정.`,
      `si + 현재 → 미래: 실제로 일어날 수 있는 일. Si il fait beau demain, nous irons à la plage(내일 날씨가 좋으면 해변에 갈 거야).
si + 반과거 → 조건법: 상상이나 가능성이 낮은 일. Si j'avais de l'argent, j'achèterais une maison(돈이 있다면 집을 살 텐데).
주의: 이런 문장에서 si 바로 뒤에는 절대 미래형이나 조건법을 쓰지 않습니다.`
    ],
    contrast: {
      fr: 'Le coréen exprime l\'hypothèse avec -면 et -ㄹ 텐데 sans changer le temps du premier verbe. Le français choisit le temps après si (présent ou imparfait) selon que la situation est réelle ou imaginaire.',
      ko: '한국어는 "-면", "-ㄹ 텐데"로 가정을 표현합니다. 프랑스어는 상황이 실제인지 상상인지에 따라 si 뒤의 시제(현재 또는 반과거)와 주절의 시제(미래 또는 조건법)를 바꿉니다.'
    }
  },
  'b2-passif-gerondif': {
    objectives: ['능동문을 수동문으로 바꾸기', '수동태 뒤에 par와 de 고르기', '제롱디프(en + -ant) 만들고 쓰기'],
    sections: [
      `수동태 = être(능동문과 같은 시제) + 과거분사(주어에 일치) + par + 행위자.
능동: La mairie a construit le pont(시청이 다리를 지었다). → 수동: Le pont a été construit par la mairie(다리는 시청에 의해 지어졌다).
행위자를 모르거나 분명할 때는 생략합니다: La loi a été votée hier(법이 어제 통과되었다).
감정이나 상태를 나타내는 동사는 de를 자주 씁니다: Il est aimé de tous(그는 모두에게 사랑받는다).`,
      `제롱디프 = en + 현재분사(nous 현재형의 어간 + -ant). nous parlons → en parlant, nous finissons → en finissant. 불규칙: en étant, en ayant, en sachant.
의미: 동시에 하는 일(~하면서): Il chante en cuisinant. 방법(~함으로써): On apprend une langue en pratiquant. 조건(~하면): En partant maintenant, tu arriveras à l'heure.
제롱디프의 주어는 항상 주절의 주어와 같아야 합니다. 한국어의 "-면서", "-아서/어서"와 비슷합니다.`
    ],
    contrast: {
      fr: 'Le coréen forme le passif avec des suffixes (-이/히/리/기-) ou -어지다 et l\'utilise moins. Le français l\'emploie souvent à l\'écrit (presse, rapports). Le gérondif correspond souvent à -면서 ou -아서, mais exige le même sujet.',
      ko: '한국어는 "-이/히/리/기-"나 "-어지다"로 피동을 만들고 상대적으로 덜 씁니다. 프랑스어는 신문이나 보고서 같은 글에서 수동태를 자주 씁니다. 제롱디프는 "-면서", "-아서"와 비슷하지만 반드시 주어가 같아야 합니다.'
    }
  },
  'c1-nuances': {
    objectives: ['quoique, encore que, si… que, avoir beau 사용하기', '각 표현 뒤의 법(mode) 고르기', '격식 있는 글에서 문체 다양화하기'],
    sections: [
      `quoique / encore que + 접속법: bien que의 격식 있는 동의어입니다. Quoiqu'il soit tard, la réunion continue(늦었지만 회의는 계속된다).
si/aussi + 형용사 + que + 접속법: "아무리 ~해도". Si difficile qu'il soit, cet examen est accessible.
avoir beau + 동사원형: "아무리 ~해도 (결과는 변하지 않는다)". J'ai beau répéter, il ne m'écoute pas(아무리 반복해도 그는 듣지 않는다).
quel que soit + 명사(성·수 일치): "~이 무엇이든". Quelles que soient vos raisons…`,
      `alors que / tandis que + 직설법: 두 사실을 대조합니다.
au lieu de + 동사원형: "~하는 대신". loin de + 동사원형: "~하기는커녕" (Loin de diminuer, le chômage augmente 실업은 줄기는커녕 늘고 있다).
il n'en demeure pas moins que / il n'empêche que + 직설법: 상대 의견을 인정한 뒤 자기 입장을 유지할 때 쓰는 격식체 표현입니다.`
    ],
    contrast: {
      fr: 'Le coréen dispose de terminaisons très riches pour la concession (-더라도, -ㄴ들, 아무리 -아도). Le français utilise des expressions séparées, chacune avec un mode imposé : c\'est ce mode qu\'il faut mémoriser avec l\'expression.',
      ko: '한국어는 "-더라도, -ㄴ들, 아무리 -아도"처럼 양보를 나타내는 어미가 풍부합니다. 프랑스어는 독립된 표현을 쓰고, 표현마다 뒤에 오는 법(직설법·접속법·동사원형)이 정해져 있습니다. 표현과 법을 함께 외우세요.'
    }
  }
}
