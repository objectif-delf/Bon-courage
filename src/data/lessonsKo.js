/**
 * EXPLICATIONS COMPLÈTES EN CORÉEN + ENCADRÉ « DIFFÉRENCE AVEC LE CORÉEN ».
 * Clé = id de la leçon (voir lessons.js).
 *   objectives : objectifs traduits
 *   sections   : une explication complète par section, dans le même ordre que lessons.js
 *   contrast   : { fr, ko } — ce qui change par rapport au coréen
 * Affichage : ouvert par défaut en A1-A2 ou si l'interface est en coréen,
 * repliable (« 한국어 설명 ») à partir du B1.
 */

export const LESSONS_KO = {
  'a1-presenter': {
    objectives: ['être와 avoir 동사의 현재형 활용하기', '알맞은 관사 고르기 (un, une, le, la, l\', les)', '나이와 직업을 틀리지 않고 말하기'],
    sections: [
      `프랑스어 동사는 주어(je, tu, il…)에 따라 형태가 바뀝니다. 한국어에서는 "학생이에요"가 누구에게나 똑같지만, 프랑스어에서는 je suis, tu es, il est처럼 모두 다릅니다.
가장 중요한 두 동사는 être(~이다, 있다)와 avoir(가지다, 있다)입니다. 다른 많은 문법(복합과거 등)에도 쓰이므로 여섯 가지 형태를 반드시 외워야 합니다.
je 다음에 모음으로 시작하는 단어가 오면 e가 빠지고 j'가 됩니다: j'ai, j'habite.`,
      `프랑스어의 모든 명사는 남성 또는 여성입니다. 사람이 아닌 물건도 마찬가지입니다 (le livre 책 = 남성, la table 탁자 = 여성). 성별에는 논리적인 이유가 없는 경우가 많으므로 단어를 외울 때 항상 관사와 함께 외우세요.
부정관사 un/une/des는 처음 말하는 것, 정해지지 않은 것에 씁니다 (한국어의 "어떤, 하나의"와 비슷). 정관사 le/la/les는 이미 알고 있는 것이나 일반적인 것에 씁니다 (J'aime le café = 나는 커피(라는 것)를 좋아한다).
le와 la는 모음이나 무음 h 앞에서 l'가 됩니다: l'école, l'hôtel.`,
      `나이는 être가 아니라 avoir로 말합니다. 직역하면 "나는 25년을 가지고 있다"입니다: J'ai 25 ans. "Je suis 25 ans"는 틀린 문장입니다.
직업이나 신분을 être 뒤에 말할 때는 관사를 쓰지 않습니다: Je suis infirmière (저는 간호사예요). 하지만 형용사로 꾸밀 때는 c'est + 관사를 씁니다: C'est un ingénieur très compétent.`
    ],
    contrast: {
      fr: 'Le coréen n\'a ni article, ni genre, ni conjugaison selon la personne. En français, ces trois éléments sont obligatoires dans presque chaque phrase : prenez l\'habitude de toujours vous demander « masculin ou féminin ? » et « quel sujet ? ».',
      ko: '한국어에는 관사, 명사의 성, 인칭에 따른 동사 변화가 없습니다. 프랑스어에서는 거의 모든 문장에 이 세 가지가 필요합니다. "남성인가 여성인가?", "주어가 무엇인가?"를 항상 스스로 물어보는 습관을 들이세요.'
    }
  },

  'a2-passe-compose': {
    objectives: ['복합과거 만들기', 'avoir와 être 중 알맞은 조동사 고르기', 'être와 함께 쓰는 과거분사의 일치'],
    sections: [
      `복합과거(passé composé)는 과거에 끝난 행동을 말할 때 씁니다. 한국어의 "-았/었-"과 비슷합니다.
만드는 법: 조동사 avoir 또는 être의 현재형 + 과거분사. 예) j'ai parlé (말했다), il a fini (끝냈다).
규칙 동사의 과거분사: -er → -é (parler → parlé), -ir → -i (finir → fini), -re → -u (vendre → vendu).
자주 쓰는 불규칙 과거분사는 따로 외워야 합니다: faire → fait, prendre → pris, voir → vu, avoir → eu, être → été, mettre → mis, lire → lu, écrire → écrit, venir → venu, boire → bu.`,
      `대부분의 동사는 avoir를 씁니다. 하지만 "이동"이나 "상태 변화"를 나타내는 약 15개의 동사는 être를 씁니다: aller(가다), venir(오다), arriver(도착하다), partir(떠나다), entrer(들어가다), sortir(나가다), monter(올라가다), descendre(내려가다), naître(태어나다), mourir(죽다), rester(머무르다), tomber(넘어지다), retourner(돌아가다), devenir(되다), revenir(돌아오다).
또한 se lever(일어나다)처럼 se가 붙는 대명동사는 모두 être를 씁니다: je me suis levé(e).`,
      `être를 쓰는 경우, 과거분사는 형용사처럼 주어의 성과 수에 맞춰 바뀝니다. 여성이면 -e, 복수면 -s, 여성 복수면 -es를 붙입니다.
Elle est partie (그녀는 떠났다), Ils sont arrivés (그들은 도착했다), Mes sœurs sont venues (내 여자 형제들이 왔다).
avoir를 쓰는 경우에는 보통 일치시키지 않습니다: Elle a mangé. 대부분 발음은 같으므로 글을 쓸 때 특히 주의하세요.`
    ],
    contrast: {
      fr: 'En coréen, le passé se marque avec un seul suffixe (-았/었-) sur le verbe. En français, il faut choisir l\'auxiliaire (avoir ou être) et parfois accorder le participe : le passé dépend donc du verbe et du sujet.',
      ko: '한국어에서는 동사에 "-았/었-"만 붙이면 과거가 됩니다. 프랑스어에서는 조동사(avoir 또는 être)를 골라야 하고, 경우에 따라 과거분사를 주어에 일치시켜야 합니다. 즉 과거형이 동사와 주어에 따라 달라집니다.'
    }
  },

  'b1-imparfait-pc': {
    objectives: ['반과거 만들기', '배경(반과거)과 사건(복합과거) 구별하기', '추억 이야기하기'],
    sections: [
      `반과거(imparfait)는 nous의 현재형에서 -ons를 빼고 어미 -ais, -ais, -ait, -ions, -iez, -aient를 붙여 만듭니다.
nous finissons → je finissais, nous prenons → je prenais, nous faisons → je faisais.
예외는 être 하나뿐입니다: j'étais, tu étais, il était…`,
      `영화를 생각해 보세요. 반과거는 "배경"입니다: 날씨, 상황, 묘사, 과거의 습관, 진행 중이던 행동 (il faisait beau 날씨가 좋았다, je dormais 자고 있었다, je lisais tous les soirs 매일 저녁 책을 읽곤 했다).
복합과거는 "이야기를 앞으로 진행시키는 사건"입니다: 한 번 일어난 일, 끝난 행동 (le téléphone a sonné 전화가 울렸다, je suis sorti 나갔다).
기간이 정해져 끝난 행동도 복합과거입니다: j'ai vécu deux ans à Lyon (리옹에서 2년 살았다).`,
      `시간 표현이 큰 힌트가 됩니다.
반과거와 자주 쓰는 표현: autrefois(예전에), d'habitude(보통), chaque jour(매일), tous les étés(매년 여름), souvent(자주), quand j'étais petit(어렸을 때).
복합과거와 자주 쓰는 표현: soudain / tout à coup(갑자기), un jour(어느 날), ce matin-là(그날 아침), pendant deux heures(두 시간 동안), trois fois(세 번).`
    ],
    contrast: {
      fr: 'Le coréen exprime l\'habitude ou l\'action en cours avec -곤 했다 ou -고 있었다, mais on peut souvent simplement dire -었다. En français, le choix entre imparfait et passé composé est obligatoire : il change le sens de la phrase.',
      ko: '한국어는 습관이나 진행을 "-곤 했다", "-고 있었다"로 나타내지만, 그냥 "-었다"라고 해도 자연스러운 경우가 많습니다. 프랑스어에서는 반과거와 복합과거 중 하나를 반드시 골라야 하며, 선택에 따라 문장의 뜻이 달라집니다.'
    }
  },

  'b1-relatifs': {
    objectives: ['관계대명사로 두 문장 연결하기', 'qui, que, où, dont 중 알맞은 것 고르기'],
    sections: [
      `관계대명사는 두 문장을 연결해서 같은 명사를 반복하지 않게 해 줍니다. 한국어에서는 꾸며 주는 말이 명사 "앞"에 오지만 (내가 읽은 책), 프랑스어에서는 명사 "뒤"에 옵니다 (le livre que j'ai lu).
qui는 뒤에 오는 동사의 "주어" 역할을 할 때 씁니다: L'homme qui parle (말하는 남자 — 남자가 말한다).
que는 뒤에 오는 동사의 "목적어" 역할을 할 때 씁니다: Le film que j'ai vu (내가 본 영화 — 나는 영화를 봤다). 모음 앞에서는 qu'가 됩니다.`,
      `où는 "장소"나 "시간"을 나타냅니다: la ville où je suis né (내가 태어난 도시), le jour où nous nous sommes rencontrés (우리가 만난 날). 시간에도 où를 쓰는 점에 주의하세요.
dont은 "de"가 필요한 표현을 대신합니다: avoir besoin de(~이 필요하다), parler de(~에 대해 말하다), se souvenir de(~을 기억하다), être fier de(~을 자랑스러워하다), 그리고 명사의 보어(~의).
J'ai besoin de ce livre → C'est le livre dont j'ai besoin (내가 필요한 책이다).`
    ],
    contrast: {
      fr: 'En coréen, la proposition qui décrit le nom vient avant lui et se termine par -는/-ㄴ/-ㄹ ; il n\'y a pas de mot comme qui ou que. En français, elle vient après le nom, et le pronom change selon le rôle du nom dans la proposition.',
      ko: '한국어에서는 명사를 꾸미는 절이 명사 앞에 오고 "-는/-ㄴ/-ㄹ"로 끝나며, qui나 que 같은 단어가 없습니다. 프랑스어에서는 명사 뒤에 오고, 그 명사가 절 안에서 하는 역할(주어, 목적어, 장소, de의 보어)에 따라 대명사가 달라집니다.'
    }
  },

  'b2-subjonctif': {
    objectives: ['접속법 현재 만들기 (규칙·불규칙)', '접속법을 반드시 써야 하는 경우 알기', '함정 피하기: espérer, après que, 같은 주어'],
    sections: [
      `접속법은 ils의 현재형에서 -ent를 빼고 -e, -es, -e, -ions, -iez, -ent를 붙여 만듭니다.
ils finissent → que je finisse, ils prennent → que je prenne, ils partent → que je parte.
nous와 vous의 형태는 반과거와 비슷합니다: que nous prenions, que vous preniez.
꼭 외워야 할 불규칙 동사: être → que je sois, qu'il soit, que nous soyons / avoir → que j'aie, qu'il ait, que nous ayons / faire → que je fasse / aller → que j'aille, que nous allions / pouvoir → que je puisse / savoir → que je sache / vouloir → que je veuille.`,
      `접속법은 사실 그 자체보다 말하는 사람의 "주관"을 나타냅니다: 원하는 것, 느끼는 것, 의심하는 것, 필요한 것. 한국어에는 이런 동사 형태가 없으므로 접속법을 부르는 "신호 표현"을 외우는 것이 가장 좋은 방법입니다.
필요: il faut que, il est important que. 의지: je veux que, je souhaite que, je préfère que. 감정: je suis content que, je regrette que, j'ai peur que. 의심: je doute que, je ne pense pas que. 접속사: bien que(~이지만), pour que(~하도록), avant que(~하기 전에), à condition que(~라는 조건으로), sans que(~하지 않고).`,
      `espérer que(~하기를 바라다)는 의미와 달리 직설법을 씁니다: J'espère qu'il viendra.
penser / croire que는 긍정문에서는 직설법(Je pense qu'il a raison), 부정문이나 의문문에서는 접속법(Je ne pense pas qu'il ait raison)을 씁니다.
après que(~한 후에)는 직설법, avant que(~하기 전에)는 접속법입니다.
주절과 종속절의 주어가 같으면 que를 쓰지 않고 부정사를 씁니다: Je veux partir (O) / Je veux que je parte (X).`
    ],
    contrast: {
      fr: 'Le coréen exprime la volonté, le doute ou le sentiment avec des terminaisons (-기를 바라다, -ㄹ까 봐, -는지 모르겠다), sans changer la forme du verbe de la proposition. Le français, lui, change le mode du verbe : c\'est le mot déclencheur qui décide.',
      ko: '한국어는 의지·의심·감정을 "-기를 바라다", "-ㄹ까 봐", "-는지 모르겠다" 같은 어미로 표현합니다. 프랑스어는 종속절 동사의 "법(mode)" 자체를 바꿉니다. 무엇을 쓸지는 앞에 오는 신호 표현이 결정합니다.'
    }
  },

  'b2-connecteurs': {
    objectives: ['논거 정리하기 (추가, 대조, 원인, 결과, 목적)', '양보로 의견에 뉘앙스 주기', '연결어마다 올바른 구조 쓰기'],
    sections: [
      `DELF B2에서는 글과 말의 "일관성(cohérence)"을 평가합니다. 연결어는 생각이 어떻게 이어지는지 보여 주는 길잡이입니다.
나열: tout d'abord(우선), ensuite(그다음), par ailleurs(한편), enfin(마지막으로).
추가: de plus(게다가), en outre(더욱이), d'ailleurs(게다가, 사실).
결론: en somme(요컨대), en définitive(결국), pour conclure(결론적으로).`,
      `두 사실 대조: en revanche(반면에), au contraire(반대로), alors que / tandis que(~인 반면).
양보(상대 의견을 인정한 뒤 제한하기): certes… mais(물론 ~이지만), cependant / toutefois(그러나), néanmoins(그럼에도 불구하고), pourtant(그런데도).
구조에 주의하세요: bien que + 접속법 (Bien qu'il pleuve), même si + 직설법 (Même s'il pleut), malgré + 명사 (Malgré la pluie).`,
      `원인: car(왜냐하면), puisque(~이니까, 이미 아는 원인), étant donné que(~을 고려하면), grâce à + 명사(~덕분에, 좋은 결과), à cause de + 명사(~때문에, 나쁜 결과), en raison de + 명사(~으로 인해).
결과: donc(그러므로), par conséquent(따라서), c'est pourquoi(그래서), si bien que / de sorte que(그 결과 ~하다).
목적: 주어가 같으면 pour / afin de + 부정사, 주어가 다르면 pour que / afin que + 접속법.
en effet는 "실제로, 왜냐하면"이라는 뜻으로 앞의 말을 확인하거나 설명합니다. 대조에는 절대 쓰지 않습니다.`
    ],
    contrast: {
      fr: 'En coréen, la logique passe souvent par les terminaisons verbales (-지만, -아서, -기 때문에, -도록) collées au verbe. En français, ce sont des mots séparés en début de phrase ou de proposition, souvent suivis d\'une virgule — et chacun impose sa construction (nom, infinitif, indicatif ou subjonctif).',
      ko: '한국어에서는 논리 관계를 "-지만, -아서, -기 때문에, -도록"처럼 동사에 붙는 어미로 나타내는 경우가 많습니다. 프랑스어에서는 문장이나 절 앞에 오는 독립된 단어로 나타내며, 뒤에 쉼표가 오는 경우가 많습니다. 그리고 연결어마다 뒤에 오는 형태(명사, 부정사, 직설법, 접속법)가 정해져 있습니다.'
    }
  },

  'b2-discours-rapporte': {
    objectives: ['직접화법을 간접화법으로 바꾸기', '시제 일치 적용하기', '의문문과 시간 표현 바꾸기'],
    sections: [
      `간접화법은 다른 사람의 말을 따옴표 없이 종속절로 전하는 방법입니다. 한국어의 "-다고 했다", "-냐고 물었다"에 해당합니다. 말하는 사람이 바뀌므로 인칭 대명사도 바뀝니다.
Il dit : « Je suis fatigué. » → Il dit qu'il est fatigué (그는 피곤하다고 말한다).
B2에서 유용한 전달 동사: affirmer(단언하다), expliquer(설명하다), annoncer(발표하다), préciser(명확히 하다), ajouter(덧붙이다), reconnaître(인정하다), nier(부인하다), demander(묻다), répondre(대답하다).`,
      `전달 동사가 과거형이면(il a dit, il expliquait…) 종속절의 시제가 한 단계씩 뒤로 갑니다.
현재 → 반과거: « Je travaille » → il a dit qu'il travaillait.
복합과거 → 대과거: « J'ai fini » → il a dit qu'il avait fini.
미래 → 조건법 현재: « Je viendrai » → il a dit qu'il viendrait.
반과거, 조건법, 대과거는 바뀌지 않습니다. 한국어는 "-다고 했다"에서 원래 시제를 그대로 두므로 프랑스어에서 특히 주의해야 합니다.`,
      `의문문: est-ce que / 예·아니오 질문 → si, qu'est-ce que → ce que, qu'est-ce qui → ce qui. où, quand, comment, pourquoi는 그대로입니다.
명령문: 명령형 → de + 부정사. « Asseyez-vous » → il nous a demandé de nous asseoir.
과거 이야기 속 시간 표현: aujourd'hui → ce jour-là, hier → la veille(전날), demain → le lendemain(다음 날), la semaine prochaine → la semaine suivante, ici → là.`
    ],
    contrast: {
      fr: 'En coréen, le discours indirect garde en général le temps d\'origine (« 내일 온다고 했다 »). En français, si l\'introducteur est au passé, le temps recule obligatoirement : « il a dit qu\'il viendrait le lendemain ».',
      ko: '한국어 간접화법은 보통 원래 시제를 그대로 둡니다 ("내일 온다고 했다"). 프랑스어에서는 전달 동사가 과거이면 종속절의 시제를 반드시 뒤로 옮겨야 합니다: « il a dit qu\'il viendrait le lendemain ».'
    }
  },

  'b2-essai': {
    objectives: ['과제 지시문 분석하기', '논증 구성(개요) 짜기', '격식체와 알맞은 표현 사용하기'],
    sections: [
      `시험에서는 논증하는 글을 씁니다. 보통 250단어 이상이며, 포럼 기고문, 공식 편지, 의견 기사 등의 형식입니다.
쓰기 전에 지시문에서 다음을 확인하고 밑줄을 그으세요: 나의 역할(누가 쓰는가), 수신자(누구에게), 글의 종류, 제기된 문제, 요구되는 입장.
형식을 지키는 것도 점수에 들어갑니다. 공식 편지에는 제목(Objet), 호칭(Madame, Monsieur), 맺음말이 있어야 하고, 기사에는 제목이 있어야 합니다.`,
      `서론: 관심을 끄는 도입(사실, 숫자, 질문), 문제 제기(problématique), 글의 구성 소개.
본론: 2~3개 문단. 한 문단에 논거 하나, 그리고 구체적인 예시 하나. 반대 의견을 먼저 인정하고 반박하는 양보 구조(« Certes… ; toutefois… »)를 넣으면 좋습니다.
결론: 자신의 입장을 정리하고, 제안이나 질문으로 마무리합니다(ouverture).
문단 사이에 한 줄을 띄우면 채점자가 구조를 쉽게 볼 수 있습니다.`,
      `의견 표현: il me semble que, j'estime que, je suis convaincu(e) que, à mon sens.
사실 제시: force est de constater que(~을 인정하지 않을 수 없다), il est indéniable que(~은 부인할 수 없다).
반박: on pourrait objecter que… ; or, …(~라고 반론할 수 있다. 그러나 …).
공식 편지 맺음말: Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
« je pense que »를 반복하지 말고 표현을 다양하게 쓰세요. 공식 편지에서는 반드시 vous를 씁니다.`
    ],
    contrast: {
      fr: 'Dans un écrit coréen, on peut annoncer sa position à la fin, après avoir exposé les faits (structure 기승전결). L\'essai français attend la problématique dès l\'introduction, un plan annoncé et une position claire dans chaque partie.',
      ko: '한국어 글에서는 사실을 먼저 늘어놓고 마지막에 입장을 밝히는 기승전결 구조도 자연스럽습니다. 프랑스어 논술에서는 서론에서 바로 문제를 제기하고 구성을 예고하며, 각 부분마다 입장을 분명히 밝혀야 합니다.'
    }
  },

  'c1-nominalisation': {
    objectives: ['동사나 형용사를 명사로 바꾸기', '접미사와 명사의 성 알기', '간결한 문체로 쓰기 (제목, 메모, 요약)'],
    sections: [
      `명사화는 동사나 형용사를 명사로 바꾸는 것입니다. 신문 제목, 메모, 문서 요약(DALF C1 시험)처럼 짧고 간결한 글에 많이 쓰입니다.
« Le gouvernement a décidé d'augmenter les impôts » (정부가 세금을 올리기로 결정했다) → « L'augmentation des impôts décidée par le gouvernement » (정부가 결정한 세금 인상).
한국어도 "-기, -음"이나 "증가, 감소, 인상" 같은 한자어 명사로 같은 일을 합니다.`,
      `동사 → 명사:
-tion / -sion (여성): réduire → la réduction(감소), décider → la décision(결정).
-ment (남성): développer → le développement(발전), licencier → le licenciement(해고).
-age (남성): nettoyer → le nettoyage(청소). -ure (여성): ouvrir → l'ouverture(개장, 열림).
-ance / -ence (여성): croître → la croissance(성장), préférer → la préférence(선호).
짧은 형태: choisir → le choix, partir → le départ, refuser → le refus, analyser → l'analyse(여성).
형용사 → 명사: -ité (여성) efficace → l'efficacité, -esse (여성) faible → la faiblesse, -eur (여성) lent → la lenteur, -ise (여성) franc → la franchise.`
    ],
    contrast: {
      fr: 'Le coréen nominalise très facilement avec des mots sino-coréens (인상, 감소, 결정) qui n\'ont pas de genre. En français, chaque nom obtenu a un genre fixe, souvent indiqué par le suffixe : retenez les suffixes avec leur genre.',
      ko: '한국어는 성(性)이 없는 한자어(인상, 감소, 결정)로 쉽게 명사화합니다. 프랑스어에서는 만들어진 명사마다 성이 정해져 있고, 접미사가 성을 알려 주는 경우가 많습니다. 접미사를 성과 함께 외우세요.'
    }
  },

  'a1-prononciation': {
    objectives: ['비모음(an, on, in) 구별하기', 'u와 ou, f/v와 p/b 구별하기', '프랑스어 r과 연음(liaison) 이해하기'],
    sections: [
      `프랑스어에는 공기가 코로도 나가는 "비모음"이 세 가지 있습니다: an/en [ɑ̃], on [ɔ̃], in/un [ɛ̃].
한국어의 "안, 온, 인"과 다릅니다. 끝에 ㄴ 받침을 발음하지 마세요! 혀끝은 입천장에 닿지 않고, 모음을 코로 울리게 하며 끝냅니다.
lent(느린) / long(긴) / lin(아마) 는 모두 다른 단어입니다.`,
      `u [y]: 입술을 "우"처럼 동그랗게 내밀고, 혀는 "이" 자리에 두고 소리 냅니다. 한국어의 "위"를 짧게, 입 모양을 바꾸지 않고 하는 느낌입니다.
ou [u]: 한국어의 "우"와 비슷합니다.
tu(너) / tout(모두), vu(본) / vous(당신), rue(거리) / roue(바퀴) 는 뜻이 완전히 다릅니다.`,
      `한국어에는 f와 v 소리가 없어서 "파"나 "바"로 발음하기 쉽습니다.
f: 윗니를 아랫입술에 가볍게 대고 바람을 내보냅니다. v: 같은 위치에서 목을 울립니다.
p와 b는 두 입술을 붙였다 떼는 소리입니다. fou(미친) / pou(이), vin(와인) / bain(목욕) 을 구별하세요.
b는 한국어 "ㅂ"보다 목을 더 울립니다(유성음). 단어 처음의 b를 "ㅃ"이나 "ㅍ"처럼 하지 않도록 주의하세요.`,
      `프랑스어 r은 한국어 ㄹ과 전혀 다릅니다. 혀끝은 아래 앞니 뒤에 두고, 목 안쪽(목젖 근처)에서 가볍게 긁는 소리를 냅니다. 가글할 때의 위치와 비슷합니다.
ㄹ로 발음하면 l처럼 들립니다: riz(쌀)와 lit(침대)가 같은 소리가 되지 않도록 연습하세요.`,
      `단어 끝의 자음은 대부분 발음하지 않습니다: petit [pəti], vous [vu], grand [ɡʁɑ̃].
하지만 뒤에 모음으로 시작하는 단어가 오면 그 자음을 이어서 발음합니다. 이것이 연음(liaison)입니다: les amis [le‿zami], vous avez [vu‿zave], un enfant [œ̃‿nɑ̃fɑ̃].
한국어의 연음 법칙(꽃이 → [꼬치])과 비슷한 원리이므로 이해하기 쉽습니다. 단, et(그리고) 뒤에서는 연음하지 않습니다.`
    ],
    contrast: {
      fr: 'Le coréen n\'a ni voyelles nasales, ni [y], ni f/v, ni r uvulaire, et ses syllabes finissent souvent par une consonne prononcée (받침). En français, beaucoup de consonnes finales sont muettes, mais elles « reviennent » devant une voyelle (liaison) — un peu comme le 연음 coréen.',
      ko: '한국어에는 비모음, [y] 소리, f/v, 목젖에서 나는 r이 없고, 음절이 받침으로 끝나는 경우가 많습니다. 프랑스어에서는 단어 끝 자음 대부분을 발음하지 않지만, 모음 앞에서는 다시 살아납니다(연음). 한국어의 연음 법칙과 비슷합니다.'
    }
  }
}
