# 🛍️ Chackor Shop - Boutique en Ligne

Bienvenue sur le code source de **Chackor Shop**, la boutique en ligne officielle de **Chackor Organisation**, une initiative communautaire basée à Thiès, au Sénégal. Ce projet a été conçu pour offrir une expérience d'achat moderne, rapide et intuitive, tout en mettant en valeur les produits artisanaux et les services de l'organisation.

---

## ✨ Fonctionnalités Principales

-   **🏠 Page d'Accueil Dynamique** : Une section "Héros" accueillante, une grille de produits "Café Touba", et une section dédiée à la commande de services événementiels.
-   **☕ Catalogue de Produits** : Présentation claire des produits "Achakourou Café Touba" avec des pages de détail dédiées.
-   **🛒 Panier d'Achat Interactif & Persistant** : Gestion des quantités, mise à jour instantanée du total, et persistance du panier même après rechargement de la page grâce au `localStorage`.
-   **✅ Processus de Commande Simplifié** : Un formulaire de paiement épuré qui finalise la commande via une notification WhatsApp pour un contact direct et efficace.
-   **📱 Conception Entièrement Responsive** : Une interface optimisée pour une expérience utilisateur fluide sur mobile, tablette et ordinateur.
-   **🚀 Performance Optimisée** : Construit avec les meilleures pratiques de Next.js, incluant le rendu côté serveur (SSR) et l'utilisation de données statiques pour des performances maximales.

---

## 🛠️ Technologies Utilisées

Ce projet est construit avec une stack technologique moderne et performante :

-   **Framework** : [Next.js](https://nextjs.org/) (App Router)
-   **Langage** : [TypeScript](https://www.typescriptlang.org/)
-   **Styling** : [Tailwind CSS](https://tailwindcss.com/)
-   **Composants UI** : [Shadcn/ui](https://ui.shadcn.com/)
-   **Gestion de Formulaires** : [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **Gestion d'État (Panier)** : React Context API, `useReducer` & `localStorage` pour la persistance.
-   **Déploiement** : Prêt pour [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/)

---

## 🚀 Démarrage Rapide

Suivez ces étapes pour lancer le projet en local.

### Prérequis

-   [Node.js](https://nodejs.org/) (version 18 ou supérieure)
-   `npm` ou `pnpm`

### Installation

1.  **Clonez le dépôt** :
    ```bash
    git clone https://github.com/IssaKamara958/chackor-shop.git
    cd chackor-shop
    ```

2.  **Installez les dépendances** :
    ```bash
    npm install
    ```

### Lancement du projet

Exécutez la commande suivante pour démarrer le serveur de développement :

```bash
npm run dev
```

L'application sera alors disponible à l'adresse `http://localhost:9002`.

---

## 💾 Mettre à jour le dépôt GitHub

Après avoir fait des modifications, utilisez les commandes suivantes pour les envoyer sur votre dépôt GitHub :

1.  **Ajoutez tous les fichiers modifiés** :
    ```bash
    git add .
    ```

2.  **Créez un "commit"** (un instantané de vos changements) avec un message descriptif :
    ```bash
    git commit -m "Décrivez brièvement vos changements ici"
    ```

3.  **Poussez les changements** vers GitHub (en supposant que votre branche principale s'appelle `main`) :
    ```bash
    git push origin main
    ```

---

## 📂 Structure du Projet

Le projet suit la convention `App Router` de Next.js pour une organisation claire et basée sur les routes.

```
chackor-shop/
├── public/               # Fichiers statiques (images, logos)
│   └── images/
│       └── logo/
│           └── chackor_logo.jpg
├── src/
│   ├── app/                  # Routes de l'application (pages)
│   ├── components/           # Composants React réutilisables
│   ├── context/              # Contexte React (ex: CartProvider)
│   ├── lib/                  # Utilitaires, gestion des données produits
│   └── types/                # Définitions TypeScript
│
├── .gitignore                # Fichiers à ignorer par Git
├── package.json              # Dépendances et scripts
└── tailwind.config.ts        # Configuration de Tailwind CSS
```

---

## 🌐 Déploiement

Le moyen le plus simple de déployer cette application est d'utiliser la [plateforme Vercel](https://vercel.com/new) ou Netlify. Le projet est configuré pour un déploiement "plug-and-play" sans configuration supplémentaire.

---

## À Propos de Chackor Organisation

**Chackor Organisation** est un hub d'initiatives visant à promouvoir l'innovation locale, le développement des compétences et l'autonomisation économique à Thiès, Sénégal.

### Contact
-   **Fondateur**: Issa Kamara
-   **Téléphone**: +221 77 682 84 41
-   **Email**: [issakamara958@gmail.com](mailto:issakamara958@gmail.com)
-   **Portfolio**: [issa-portfeuil.netlify.app](https://issa-portfeuil.netlify.app/)

---

## Licence

Ce projet est sous licence **MIT**.
