# 🛍️ Chackor Shop - Boutique en Ligne

Bienvenue sur le code source de **Chackor Shop**, la boutique en ligne officielle de **Chackor Organisation**, une initiative communautaire basée à Thiès, au Sénégal. Ce projet a été conçu pour offrir une expérience d'achat moderne, rapide et intuitive, tout en mettant en valeur les produits artisanaux et les services de l'organisation.

---

## ✨ Fonctionnalités Principales

-   **🏠 Page d'Accueil Dynamique** : Une section "Héros" accueillante, une grille de produits "Café Touba", et une section dédiée à la commande de services événementiels.
-   **☕ Catalogue de Produits** : Présentation claire des produits "Achakourou Café Touba" avec des pages de détail dédiées.
-   **🛒 Panier d'Achat Interactif** : Gestion des quantités, mise à jour instantanée du sous-total, et calcul des frais de livraison en fonction de la région.
-   **✅ Processus de Commande Simplifié** : Un formulaire de paiement épuré qui finalise la commande via une notification WhatsApp pour un contact direct et efficace.
-   **🤖 Assistant Virtuel 3D** : "Ablaye Sène", un guide animé qui accueille les visiteurs et les aide à naviguer sur le site.
-   **ℹ️ Page "À Propos"** : Présentation détaillée de la mission, de la vision et des quatre pôles d'activités de Chackor Organisation.
-   **📱 Conception Entièrement Responsive** : Une interface optimisée pour une expérience utilisateur fluide sur mobile, tablette et ordinateur.
-   **🚀 Performance Optimisée** : Construite avec les meilleures pratiques de Next.js, incluant le rendu côté serveur (SSR) et le chargement différé (lazy loading) des composants lourds.

---

## 🛠️ Technologies Utilisées

Ce projet est construit avec une stack technologique moderne et performante :

-   **Framework** : [Next.js](https://nextjs.org/) (App Router)
-   **Langage** : [TypeScript](https://www.typescriptlang.org/)
-   **Styling** : [Tailwind CSS](https://tailwindcss.com/)
-   **Composants UI** : [Shadcn/ui](https://ui.shadcn.com/)
-   **Rendu 3D** : [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [Drei](https://github.com/pmndrs/drei)
-   **Gestion de Formulaires** : [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **Gestion d'État (Panier)** : React Context API & `useReducer`
-   **Déploiement** : Prêt pour [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/)

---

## 🚀 Démarrage Rapide

Suivez ces étapes pour lancer le projet en local.

### Prérequis

-   [Node.js](https://nodejs.org/) (version 18 ou supérieure)
-   `pnpm` (recommandé), `npm` ou `yarn`

### Installation

1.  **Clonez le dépôt** :
    ```bash
    git clone https://github.com/IssaKamara958/chackor-shop.git
    cd chackor-shop
    ```

2.  **Installez les dépendances** :
    ```bash
    npm install
    # ou avec pnpm
    pnpm install
    ```

### Lancement du projet

Exécutez la commande suivante pour démarrer le serveur de développement :

```bash
npm run dev
# ou avec pnpm
pnpm dev
```

L'application sera alors disponible à l'adresse `http://localhost:9002`.

---

## 📂 Structure du Projet

Le projet suit la convention `App Router` de Next.js pour une organisation claire et basée sur les routes.

```
chackor-shop/
├── src/
│   ├── app/                  # Routes de l'application (pages)
│   │   ├── (default)/        # Layout principal et pages
│   │   ├── api/              # (Optionnel) Routes API
│   │   └── layout.tsx        # Layout racine
│   │
│   ├── components/           # Composants React réutilisables
│   │   ├── home/             # Composants spécifiques à la page d'accueil
│   │   ├── layout/           # Composants de mise en page (Navbar, Footer...)
│   │   ├── products/         # Composants liés aux produits
│   │   └── ui/               # Composants Shadcn/ui
│   │
│   ├── context/              # Contexte React (ex: CartProvider)
│   │
│   ├── hooks/                # Hooks personnalisés (ex: use-toast)
│   │
│   ├── lib/                  # Utilitaires, définitions de types, données
│   │   ├── products.ts       # Données statiques des produits
│   │   ├── types.ts          # Définitions TypeScript
│   │   └── utils.ts          # Fonctions utilitaires
│   │
│   └── public/               # Fichiers statiques (images, polices, etc.)
│       └── images/
│
├── package.json              # Dépendances et scripts
└── tailwind.config.ts        # Configuration de Tailwind CSS
```

---

## 🌐 Déploiement

Le moyen le plus simple de déployer cette application Next.js est d'utiliser la [plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

---

## À Propos de Chackor Organisation

**Chackor Organisation** est un hub d'initiatives visant à promouvoir l'innovation locale, le développement des compétences et l'autonomisation économique à Thiès, Sénégal.

### Nos Pôles d'Activités :
-   **Achakourou Café Touba**: Café artisanal torréfié localement.
-   **Achakourou Digital Services**: Création de sites web, développement et prototypage UX/UI.
-   **Achakourou Bana Bana**: Commerce agricole pour connecter producteurs et marchés.
-   **Achakourou Consulting**: Conseil en gestion, digitalisation et stratégie.

### Contact
-   **Fondateur**: Issa Kamara
-   **Téléphone**: +221 77 682 84 41
-   **Email**: [issakamara958@gmail.com](mailto:issakamara958@gmail.com)
-   **Portfolio**: [issa-portfeuil.netlify.app](https://issa-portfeuil.netlify.app/)

---

## Licence

Ce projet est sous licence **MIT**.
