# General informations

This project is a website for the Deities of Death clan of the game Age Of Mythology.
Note that every modification to the website needs to be validated by the creator of the repository (Looki) and by the boss of the clan.

## Technologies

This project uses Vite & React, and utilize the Framer librairy.

Looki : Tailwind is configured but I had problems with it so I didn't use it after all.

## How to Install librairies

```bash
npm i
```

## How to run in local 

```bash
npm run dev
```


# How to deploy

## 🛠️ 1. Build the project

```bash
npm run build
```

## 🌍 2. Deploy

Doing npm run deploy caused some issues so it's better to it manually

> 💡 To do in **Git Bash** (NOT PowerShell)

```bash
git add dist -f
git commit -m "Deploy"
git push origin `git subtree split --prefix dist main`:gh-pages --force
```

## 3. GitHub Settings

👉 https://github.com/DoDLooki/DeitiesOfDeath/settings/pages

    In the Custom Domain section, put :

```thedodclan.com```

    Click Save

    Click "Enforce HTTPS" if available