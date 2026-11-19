# Stillwell

A minimalist, responsive cartomancy app for reflective Tarot, Oracle, and Lenormand readings. Built with React, Vite, and Tailwind CSS (with a small custom CSS layer for the visual system).

## Features

- 78-card Tarot, 36-card Lenormand, and 24-card Oracle datasets, including categories, keywords, upright and reversed meanings, and interpretive notes.
- One-card, three-card, five-card, Celtic Cross, and configurable open-draw spreads.
- Shuffle-and-draw or manual card selection, without replacement within a reading.
- Interactive card details, reversed orientations, keyboard-dismissable modal, and responsive layouts.
- No account, backend, or tracking: readings happen locally in your browser.

## Requirements

- Node.js 18+ (compatible with the Vite 6 toolchain)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```bash
npm run build
npm run preview
```

## Initialize Git and push to GitHub

Create an **empty** repository on GitHub first (do not initialize it with a README or license). Then, from this project directory, replace `YOUR-USERNAME` and `YOUR-REPOSITORY` below with your GitHub account and repository name:

```bash
git init
git add .
git commit -m "Initial Stillwell cartomancy app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

GitHub may prompt you to authenticate. Use GitHub CLI (`gh auth login`) or a configured SSH remote if preferred. Never put an access token in the remote URL or commit secrets; `.gitignore` excludes common local environment files.

## Notes

Card meanings are reflective prompts, not guarantees or professional advice. The visual card faces use original typography and symbolic glyphs rather than reproductions of copyrighted deck artwork.
