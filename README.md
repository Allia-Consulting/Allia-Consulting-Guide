# Allia Consulting — Site web

Site statique du cabinet Allia Consulting.
Stack : **HTML + CSS + JS vanilla**. Aucun build, aucun framework, aucune dépendance externe.

Direction visuelle **v2 (juillet 2026)** : premium **sombre**, un seul accent **teal**,
la **lentille** (intersection de deux cercles) comme signature géométrique. Site **one-page**
avec navigation par ancres. Le thème clair reste disponible via le bouton de bascule.

## Structure

```
.
├── index.html               Site one-page (Hero · Cabinet · Expertises · Références ·
│                             Diagnostic · Carrières · Contact · Footer)
├── _site.css                Styles composants & mise en page
├── _site.js                 Script (nav, scrollspy, reveals, compteurs, index interactif,
│                             écosystème, fond canvas, formulaire mailto, thème)
├── colors_and_type.css      Tokens design system (couleurs, typo, espacements) — --allia-*
├── assets/
│   ├── symbol.svg           Symbole lentille (favicon)
│   ├── symbol-light.svg     (backup — direction précédente)
│   ├── symbol-mono.svg      (backup)
│   └── lens-glyph.svg       (backup)
├── fonts/
│   └── Inter-VariableFont_opsz_wght.ttf
└── _old/                    Archive : ancienne version multi-pages (bleu/ambre)
```

> **Logos** : la lentille est **inlinée dans le HTML** via un sprite `<symbol id="allia-symbol-*">`
> référencé par `<svg><use href="#allia-symbol-*"></use></svg>` (nav, contact, footer).
> Les fichiers de `assets/` ne servent qu'au **favicon** et restent en backup.

## Typographie

- **Inter** — corps de texte, **auto-hébergée** (`fonts/`, fichier variable, via `@font-face`).
- **Bricolage Grotesque** — titres / display, chargée depuis Google Fonts.
- **IBM Plex Mono** — étiquettes, eyebrows, boutons, meta, chargée depuis Google Fonts.

## Déploiement

Site 100 % statique, **tous les chemins sont relatifs** — pas de configuration serveur.
La page d'entrée est `index.html`. Déposer le contenu du dossier à la racine du domaine
(OVH, Netlify, Vercel, GitHub Pages, Azure Static Web Apps…).

En local :

```bash
python3 -m http.server 4321
# puis http://localhost:4321
```

## Maintenance

- Tous les contenus textuels sont dans `index.html` (pas de CMS).
- Les couleurs, typos et espacements se règlent dans `colors_and_type.css` (variables `--allia-*`
  pour la palette de marque, puis variables sémantiques `--paper`, `--ink`, `--accent`, `--disp`…).
- Le site étant one-page, la nav et le footer n'existent qu'une fois (dans `index.html`).
  Pour toute nouvelle page éventuelle : dupliquer manuellement la nav et le footer.

## Crédits

- Typo : Inter, Bricolage Grotesque, IBM Plex Mono (OFL)
- Aucune photo — l'iconographie est géométrique (lentille) + icônes monoline.

© 2026 Allia Consulting
