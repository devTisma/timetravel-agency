# ⏳ TimeTravel Agency - Webapp Interactive ![Version](https://img.shields.io/badge/version-0.1.0-0ea5e9) ![Vercel](https://img.shields.io/badge/vercel-deploy-black)

Interface **immersive, premium et interactive** pour explorer et réserver des voyages temporels de luxe.

## 🛠️ Stack Technique

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **Framer Motion**

## ✨ Features

- **Hero Section vidéo** (autoplay/loop/muted/playsInline) avec overlay pour une lisibilité parfaite
- **Galerie de destinations interactives** :
  - Paris 1889 (Belle Époque)
  - Crétacé -65M (Dinosaures)
  - Florence 1504 (Renaissance)
- **Chatbot IA** connecté à **Mistral** via une route API Next.js (`/api/chat`)
- **Quiz de recommandation dynamique** (transitions Framer Motion + résultat enrichi via l’IA)

## 🤖 Transparence IA

- **Génération** : ce projet a été produit avec **Cursor IDE (Composer / AI Vibe Coding)**.
- **Chatbot** : utilise **Mistral AI API** (modèle **`mistral-small-latest`**).
- **Assets visuels** : images issues du **Projet 1 (Midjourney/Runway)**.

## 🚀 Installation locale

```bash
git clone <URL_DU_REPO> timetravel-agency
cd timetravel-agency
npm install
```

Crée un fichier `./.env.local` :

```env
MISTRAL_API_KEY=your_mistral_api_key_here
```

Lance le serveur de dev :

```bash
npm run dev
```

Puis ouvre `http://localhost:3000`.

## 📄 Licence

Projet pédagogique — **M1/M2 Digital & IA**.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
