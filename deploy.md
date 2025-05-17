# 🚀 Guide de Déploiement - DeitiesOfDeath (Vite + GitHub Pages)

Ce guide explique comment builder et déployer manuellement le site Vite sur GitHub Pages avec branche `gh-pages`.

---

## ⚙️ 1. Configuration requise

### vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/DeitiesOfDeath/',
  plugins: [react()],
})
```

### Extrait du package.json
```json
"homepage": "https://DoDLooki.github.io/DeitiesOfDeath",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
}
```

---

## 🛠️ 2. Builder le projet

```bash
npm run build
```

---

## 🌍 3. Déployer manuellement via Git

> 💡 À faire depuis **Git Bash** (PAS PowerShell)

```bash
git add dist -f
git commit -m "Deploy"
git push origin `git subtree split --prefix dist main`:gh-pages --force
```

---

2. Va dans les paramètres GitHub Pages

👉 https://github.com/DoDLooki/DeitiesOfDeath/settings/pages

    Dans la section Custom domain, mets :

thedodclan.com

Clique Save

Coche "Enforce HTTPS" si elle est disponible

## 🔧 4. Paramétrer GitHub Pages

1. Aller sur **https://github.com/DoDLooki/DeitiesOfDeath**
2. Cliquer sur **Settings**
3. Aller dans **Pages** (menu de gauche)
4. Section **Build and deployment** :
   - **Source** : `Deploy from a branch`
   - **Branch** : `gh-pages`
   - **Dossier** : `/ (root)`
5. Cliquer sur **Save** si nécessaire

---

## 🌐 5. Accéder au site

🔗 https://dodlooki.github.io/DeitiesOfDeath/

---

## 🧼 6. Vider le cache navigateur

GitHub Pages met parfois du temps à se mettre à jour. Si tu vois une 404 ou un vieux contenu :

- **Ctrl + F5** pour recharger sans cache
- Ouvre l’URL avec un paramètre :
  ```
  https://dodlooki.github.io/DeitiesOfDeath/?nocache=1
  ```
- Essaie en **navigation privée**
- Supprime le cache via le cadenas dans l’URL (paramètres du site)

---

## ✅ Résumé rapide

```bash
npm run build
git add dist -f
git commit -m "Deploy"
git push origin `git subtree split --prefix dist main`:gh-pages --force`
```

Et vérifie bien la config GitHub Pages dans l'onglet Settings > Pages.
