
# 🛍️ Chackor Shop - Boutique en Ligne

Bienvenue sur le code source de **Chackor Shop**, la boutique en ligne officielle de **Chackor Organisation**, une initiative communautaire basée à Thiès, au Sénégal. Ce projet a été conçu pour offrir une expérience d'achat moderne, rapide et intuitive, tout en mettant en valeur les produits artisanaux et les services de l'organisation.

---

## ✨ Fonctionnalités Principales

-   **🏠 Page d'Accueil Dynamique** : Une section "Héros" accueillante, une grille de produits "Café Touba", et une section dédiée à la commande de services événementiels.
-   **☕ Catalogue de Produits** : Présentation claire des produits "Achakourou Café Touba" avec des pages de détail dédiées.
-   **🛒 Panier d'Achat Interactif** : Gestion des quantités, mise à jour instantanée du sous-total, et calcul des frais de livraison en fonction de la région.
-   **✅ Processus de Commande Simplifié** : Un formulaire de paiement épuré qui finalise la commande via une notification WhatsApp pour un contact direct et efficace.
-   **📱 Conception Entièrement Responsive** : Une interface optimisée pour une expérience utilisateur fluide sur mobile, tablette et ordinateur.
-   **🚀 Performance Optimisée** : Construite avec les meilleures pratiques de Next.js, incluant le rendu côté serveur (SSR) et la connexion directe à la base de données via Prisma.

---

## 🛠️ Technologies Utilisées

Ce projet est construit avec une stack technologique moderne et performante :

-   **Framework** : [Next.js](https://nextjs.org/) (App Router)
-   **Langage** : [TypeScript](https://www.typescriptlang.org/)
-   **Styling** : [Tailwind CSS](https://tailwindcss.com/)
-   **Composants UI** : [Shadcn/ui](https://ui.shadcn.com/)
-   **Base de Données** : [MySQL](https://www.mysql.com/) avec l'ORM [Prisma](https://www.prisma.io/) pour des requêtes sécurisées et typées.
-   **Gestion de Formulaires** : [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **Gestion d'État (Panier)** : React Context API, `useReducer` & `localStorage` pour la persistance.
-   **Déploiement** : Prêt pour [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/)

---

## 🚀 Démarrage Rapide

Suivez ces étapes pour lancer le projet en local.

### Prérequis

-   [Node.js](https://nodejs.org/) (version 18 ou supérieure)
-   `npm` ou `pnpm`
-   Un serveur MySQL fonctionnel (local ou distant)

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

3.  **Configuration de la base de données** :
    -   Créez un fichier `.env.local` à la racine du projet en copiant `.env.example`.
        ```bash
        cp .env.example .env.local
        ```
    -   Modifiez le fichier `.env.local` pour y mettre votre chaîne de connexion MySQL.
        ```
        # Exemple: mysql://USER:PASSWORD@HOST:PORT/DATABASE
        DATABASE_URL="mysql://..."
        ```
    -   Synchronisez le schéma Prisma avec votre base de données. Cela créera les tables si elles n'existent pas.
        ```bash
        npx prisma db push
        ```

4.  **(Optionnel) Ajouter des données de test** :
    Vous pouvez utiliser un client MySQL comme TablePlus ou DBeaver pour ajouter des produits à votre table `Product`.

### Lancement du projet

Exécutez la commande suivante pour démarrer le serveur de développement :

```bash
npm run dev
```

L'application sera alors disponible à l'adresse `http://localhost:9002`.

---

## 📂 Structure du Projet

Le projet suit la convention `App Router` de Next.js pour une organisation claire et basée sur les routes.

```
chackor-shop/
├── prisma/                 # Schéma et migrations de la base de données
│   └── schema.prisma
├── src/
│   ├── app/                  # Routes de l'application (pages)
│   ├── components/           # Composants React réutilisables
│   ├── context/              # Contexte React (ex: CartProvider)
│   ├── lib/                  # Utilitaires, connexion DB (Prisma)
│   └── types/                # Définitions TypeScript
│
├── .env.local                # Fichier pour les secrets (ignoré par Git)
├── .env.example              # Fichier d'exemple pour les variables d'environnement
├── package.json              # Dépendances et scripts
└── tailwind.config.ts        # Configuration de Tailwind CSS
```

---

## 🌐 Déploiement

Le moyen le plus simple de déployer cette application est d'utiliser la [plateforme Vercel](https://vercel.com/new).

**Instructions importantes pour Vercel :**

1.  **Variables d'environnement** : Assurez-vous de configurer la variable d'environnement `DATABASE_URL` dans les paramètres de votre projet sur Vercel.
2.  **Commande de Build** : La commande `npm run build` inclut maintenant `prisma generate` pour s'assurer que le client Prisma est bien généré pour l'environnement de production.
3.  **Migrations** : Avant de déployer, assurez-vous d'avoir exécuté `npx prisma db push` sur votre base de données de production.

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
