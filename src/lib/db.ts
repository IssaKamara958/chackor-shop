// /src/lib/db.ts
import { PrismaClient } from '@prisma/client';

// Déclare une variable globale pour stocker le client Prisma.
// C'est nécessaire pour éviter de créer de nouvelles connexions à chaque rechargement à chaud (hot-reload) en développement.
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// Initialise le client Prisma.
// Si `globalForPrisma.prisma` existe, on le réutilise. Sinon, on en crée un nouveau.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Optionnel : pour logger les requêtes SQL dans la console de développement.
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Si on est en environnement de développement, on attache le client Prisma à l'objet global.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
