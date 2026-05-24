# Allia Consulting — Site web

Site statique du cabinet Allia Consulting.
Stack : **HTML + CSS + JS vanilla**. Aucun build, aucun framework, aucune dépendance externe.

## Structure

```
.
├── index.html               Accueil
├── notre-cabinet.html       Notre cabinet
├── nos-expertises.html      Nos expertises
├── cas-clients.html         Cas clients
├── insights.html            Insights
├── nous-contacter.html      Formulaire de contact
├── _site.css                Stylesheet principale
├── _site.js                 Script (slideshow hero, nav, etc.)
├── colors_and_type.css      Tokens design system (couleurs, typo, espacements)
├── assets/
│   ├── symbol.svg           Symbole Allia (bleu, fond clair)
│   ├── symbol-light.svg     Symbole (bleu pâle, fond sombre)
│   └── symbol-mono.svg      Symbole monochrome blanc (footer)
└── fonts/
    └── Inter-VariableFont_opsz_wght.ttf
```

> **Note** : les SVG des logos sont désormais **inlinés dans le HTML** via `<svg><use href="#allia-symbol-*">`. Les fichiers du dossier `assets/` ne servent plus qu'au **favicon** et restent en backup. Le site fonctionne donc même si `assets/` ne devait pas être servi par le serveur.

## Déploiement

### Hébergement statique simple (OVH, Netlify, Vercel, GitHub Pages…)

1. Uploade le contenu de ce dossier à la racine du domaine.
2. La page d'entrée est `index.html`.
3. Tous les chemins sont **relatifs** — pas de configuration serveur à prévoir.

### GitHub Pages

```bash
git init
git add .
git commit -m "Allia Consulting — site v1"
git branch -M main
git remote add origin git@github.com:<org>/<repo>.git
git push -u origin main
```

Puis dans **Settings → Pages** :
- Source : `Deploy from a branch`
- Branch : `main` / `(root)`

## Maintenance

- Tous les contenus textuels sont dans les fichiers `.html` (pas de CMS).
- Les couleurs, typos et espacements se règlent dans `colors_and_type.css` (variables CSS `--allia-*`).
- Pour ajouter une nouvelle page : copie un fichier existant, change `<title>`, `<meta description>` et le contenu principal. La nav et le footer sont à dupliquer manuellement.

## Crédits

- Typo : Inter (Google Fonts, OFL)
- Photos hero : Unsplash (libres de droits, à remplacer par tes propres visuels à terme)

© 2026 Allia Consulting
