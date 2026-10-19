# Bon courage ! 화이팅 — Français FLE, du A1 au C1

Le nom réunit deux façons d'encourager : « Bon courage ! » en français, « 화이팅 » en coréen.

Application web **gratuite**, installable sur téléphone et tablette, pour apprendre le français depuis le coréen.
Aucun compte, aucun serveur, aucun abonnement : la progression est enregistrée dans le navigateur.

## Ce que contient l'application

| Module | Contenu |
|---|---|
| **Interface FR / 한국어** | Bouton « FR / 한 » en haut de l'écran : menus, consignes et explications en coréen ; le contenu à apprendre reste en français |
| **Leçons** (A1 → C1) | 19 leçons (4 en A1, 5 en A2, 3 en B1, 5 en B2, 2 en C1), dont une leçon de **prononciation pour coréanophones**. Chaque leçon : explication complète en coréen, « Différence avec le coréen », erreurs fréquentes, glossaire, vérification (75 % pour valider), exercices en 3 niveaux |
| **Mon niveau** | L'étudiante choisit son niveau : l'accueil, le défi du jour, les tests et les jeux s'adaptent |
| **Défi du jour** | 5 questions de son niveau, différentes chaque jour |
| **Mon Espace Cours** | Import des cours du professeur (copier-coller, PDF, .txt) → exercices tirés **uniquement** de ce cours : sens des mots, textes à trous, phrases à remettre dans l'ordre, cartes mémoire |
| **Dictionnaire FR ↔ KO** | 120 fiches vérifiées (prononciation API, romanisation, nature, exemple FR + KO), recherche dans les deux sens, mot cliquable partout dans l'app ; mots coréens via le dictionnaire officiel **KRDict** (facultatif), repli en ligne |
| **Tests de compétences** | Grammaire, vocabulaire, compréhension, par niveau, 10 questions tirées au hasard |
| **Examens blancs A1 → C1** | Générés automatiquement : chaque examen pioche au hasard dans une banque de documents (oral, écrit, sujets de production) ; sujet entièrement nouveau possible avec l'IA. 4 épreuves chronométrées, note sur 100, règle des 5/25 |
| **Ludification** | Points, niveaux, série de jours, 13 badges, cartes mémoire à répétition espacée, textes à trous, quiz de rapidité |
| **Thèmes** | Clair, Sombre, Bande dessinée, Cyberpunk Paris |

## Ce qu'il faut savoir sur la traduction et l'IA

- Le **dictionnaire intégré** fonctionne hors ligne et ses fiches sont relues (badge « ✅ Vérifié »).
- **KRDict** (한국어기초사전, 국립국어원) : pour un mot tapé en coréen, traduction française de chaque sens, homonymes séparés. Il passe par la fonction Supabase `krdict-lookup` (voir ci-dessous). Il ne fonctionne que dans le sens coréen → français.
- Pour un mot absent, l'application utilise **MyMemory** (gratuit, sans inscription, environ 5 000 caractères/jour) : traduction seule, parfois approximative.
- **IA facultative** : avec une clé gratuite Google AI Studio collée dans *Profil*, on obtient des fiches complètes pour n'importe quel mot, des exercices de grammaire/compréhension à partir des cours et un commentaire de la production écrite. Sans clé, tout le reste fonctionne.
- Aucune traduction automatique n'est parfaite : chaque fiche affiche sa source et un lien vers le dictionnaire Naver pour vérifier.

## Activer KRDict (facultatif)

L'application réutilise la fonction Supabase `krdict-lookup` déjà déployée pour l'outil de coréen (même clé KRDict, aucun nouveau déploiement).

1. Dans Supabase : **Edge Functions › krdict-lookup** → copiez l'**URL** de la fonction.
2. **Project Settings › API** → copiez la clé **anon public** (clé publique, prévue pour être visible dans une page web).
3. Collez les deux valeurs dans `src/config.js` avant de pousser sur GitHub — ou directement dans l'application, *Profil › Dictionnaire officiel coréen*, puis « Enregistrer et tester ».

À savoir : l'adresse de la fonction devient visible dans le dépôt public. Quelqu'un pourrait l'appeler et consommer le quota KRDict (largement suffisant pour un usage normal). Pour l'éviter, laissez `config.js` vide et saisissez les valeurs seulement dans *Profil* sur l'appareil de l'étudiante.

## Structure du projet

```
bon-courage/
├── .github/workflows/deploy.yml   # déploiement automatique sur GitHub Pages
├── public/                        # icônes, manifeste (installation), service worker (hors ligne)
├── src/
│   ├── data/                      # TOUT LE CONTENU : modifiable sans toucher au code
│   │   ├── lessons.js             # leçons A1→C1 (+ prononciation)
│   │   ├── lessonsKo.js           # explications complètes en coréen + « Différence avec le coréen »
│   │   ├── questions.js           # banque des tests de compétences
│   │   ├── dictionary.js          # dictionnaire FR↔KO
│   │   ├── lessonsExtra.js        # leçons supplémentaires (A1 → C1)
│   │   ├── examBank.js            # banque d'examens A1 → C1, formats, grilles, générateur
│   │   ├── delfB2.js              # sujets B2 (utilisés par la banque)
│   │   └── badges.js
│   ├── lib/                       # logique : génération d'exercices, traduction, IA, PDF, voix, thèmes
│   ├── store/progress.jsx         # progression (points, badges, erreurs…) dans le navigateur
│   ├── components/                # éléments réutilisables (question, cartes mémoire, dictionnaire au toucher…)
│   └── pages/                     # un fichier par écran
│   ├── lib/i18n.js                # langue de l'interface : tr('texte FR', '텍스트 KO')
│   └── config.js                  # réglages KRDict (facultatif)
├── index.html
└── package.json
```

Ajouter du contenu : ouvrez le fichier de `src/data/`, copiez un élément existant, modifiez-le. Le format est décrit en tête de chaque fichier.

## Déployer gratuitement sur GitHub Pages (pas à pas)

1. **Créer un compte** sur [github.com](https://github.com) (gratuit). Pour ne pas avoir votre pseudo dans l'adresse, vous pouvez créer une *organisation* gratuite au nom neutre.
2. **Créer un dépôt** : bouton **New** → nom `bon-courage` → *Public* → **Create repository**.
3. **Envoyer les fichiers** : sur la page du dépôt, **uploading an existing file** → glissez **le contenu** du dossier `allons-y` (pas le dossier lui-même, ni `node_modules`) → **Commit changes**.
   ⚠️ Le dossier `.github` est caché sur Mac/Windows. S'il n'est pas envoyé : **Add file › Create new file**, nommez-le `.github/workflows/deploy.yml` et collez le contenu du fichier.
4. **Activer Pages** : **Settings › Pages › Source : GitHub Actions**.
5. **Attendre 1 à 2 minutes** : onglet **Actions**, la ligne « Déployer sur GitHub Pages » passe au vert ✔.
6. **Ouvrir le site** : `https://VOTRE-NOM.github.io/bon-courage/` (le lien exact s'affiche dans Settings › Pages).
7. **Installer sur téléphone** : ouvrez ce lien → iPhone : *Partager › Sur l'écran d'accueil* ; Android : *⋮ › Installer l'application*.

**Mettre à jour** : modifiez un fichier sur GitHub (icône crayon) ou renvoyez-le → le site se redéploie tout seul.

### Alternative : Vercel
[vercel.com](https://vercel.com) → *Sign up with GitHub* → *Add New › Project* → choisissez le dépôt → *Deploy* (Vite est détecté automatiquement).

## Travailler sur le code (facultatif)

Nécessite [Node.js](https://nodejs.org) 18 ou plus.

```bash
npm install      # une seule fois
npm run dev      # aperçu local sur http://localhost:5173
npm run build    # version finale dans dist/
```

## Limites honnêtes

- Les traductions et explications coréennes ont été rédigées avec soin mais **méritent une relecture par une locutrice native** avant usage.
- La leçon de prononciation et les écoutes utilisent la **voix de synthèse** de l'appareil : utile pour distinguer les sons, mais moins fidèle qu'une vraie voix.
- La synthèse vocale dépend de l'appareil : sans voix française installée, les documents audio de l'examen ne sont pas lus (un avertissement s'affiche).
- La production écrite et orale sont **auto-évaluées** avec la grille ; l'IA donne une estimation, pas une note officielle.
- Les sujets d'examen sont originaux et inspirés du format ; vérifiez les durées sur votre convocation.
- La progression est liée au navigateur : utilisez *Profil › Exporter* pour changer d'appareil.

Licence : MIT — libre d'utilisation et de modification.
