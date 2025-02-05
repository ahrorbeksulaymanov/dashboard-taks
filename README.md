# 🏗️ Dashboard Tasks - React + Vite

Bu loyiha **React** va **Vite** yordamida yaratilgan **Dashboard Task Management** ilovasidir. U **Tailwind CSS** bilan stillangan va **GitHub Pages** orqali deploy qilingan.

![GitHub Pages Status](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)
![Vite](https://img.shields.io/badge/Vite-React-blueviolet?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)

---

## 🚀 Loyihani O‘rnatish

```sh
# 1. Loyihani klon qilish
git clone https://github.com/ahrorbeksulaymanov/dashboard-taks.git

# 2. Loyihaga kiring
cd dashboard-taks

# 3. Bog‘liqliklarni (`node_modules`) o‘rnatish
npm install
```

---

## 🛠 Loyihani Ishga Tushirish

```sh
# Development rejimda (`localhost`) ishga tushirish
npm run dev
```
📌 **Default port:** [`http://localhost:5173/`](http://localhost:5173/)

```sh
# Production build yaratish
npm run build
```
📌 **Barcha tayyor fayllar `dist/` papkasiga yaratiladi.**

---

## 📦 GitHub Pages-ga Deploy Qilish

```sh
# 1. GitHub repositoryga masofaviy (`remote`) ulanish
git remote add origin https://github.com/ahrorbeksulaymanov/dashboard-taks.git

# 2. Loyihani GitHub Pages uchun tayyorlash
npm run build

# 3. GitHub Pages-ga yuklash
npm run deploy
```
📌 Bu buyruq `gh-pages` branchga yuklaydi.

GitHub repository-da **Settings → Pages** ga kiring.  
**Source** qismida **`gh-pages` branch** ni tanlang va **"Save"** bosing.

🔗 **Sayt manzili**:  
[`https://ahrorbeksulaymanov.github.io/dashboard-taks/`](https://ahrorbeksulaymanov.github.io/dashboard-taks/)

---

## 🛠 Texnologiyalar

| Texnologiya      | Tavsif |
|------------------|--------|
| **React**       | UI yaratish uchun |
| **Vite**        | Yengil va tezkor frontend bundler |
| **Tailwind CSS**| Stil va dizayn |
| **React DnD**   | Drag-and-Drop qo‘llab-quvvatlashi |
| **React Grid Layout** | Drag va resize uchun grid tizimi |
| **GitHub Pages** | Deploy qilish uchun |

---

## 📌 Muhim Sozlamalar

Agar deploy qilganingizda **404 xatosi yoki fayllar yuklanmasa**, `vite.config.ts` faylini tekshiring va **`base` to‘g‘ri yozilganligiga ishonch hosil qiling**:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // ✅ GitHub Pages uchun to‘g‘ri sozlama
})
```

✅ **Agar deploy ishlamasa**, quyidagi buyruqlar bilan qayta yuklang:
```sh
rm -rf dist
npm run build
npm run deploy
```

---

## 📞 Aloqa

Agar sizda savollar bo‘lsa yoki muammolarga duch kelsangiz, quyidagi kanallar orqali bog‘laning:

📧 **Email:** `ahrorsulaymanov2@gmail.com`  
🐙 **GitHub:** [`ahrorbeksulaymanov`](https://github.com/ahrorbeksulaymanov)  
🌎 **Website:** [`https://ahrorbeksulaymanov.github.io/my-portfolio`](https://ahrorbeksulaymanov.github.io/my-portfolio)

🚀 **Dashboard Tasks loyihasiga qo‘shilganingiz uchun rahmat!** 😊
