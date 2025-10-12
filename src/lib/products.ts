
import type { Product } from '@/types';
import { prisma } from '@/lib/db';

export const staticProducts: Omit<Product, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'cafe-1kg',
    name: 'L\'Authentique Café Touba - 1kg',
    description: 'Un kilogramme de notre café Touba artisanal, pour les vrais amateurs.',
    price: 6500,
    image: '/images/products/1kg.png',
    slug: 'cafe-touba-1kg',
    category: 'Café Touba',
  },
  {
    id: 'cafe-500g',
    name: 'Le Traditionnel Café Touba - 500g',
    description: 'Un demi-kilo de pur plaisir, parfait pour une consommation régulière.',
    price: 3250,
    image: '/images/products/500g.jpg',
    slug: 'cafe-touba-500g',
    category: 'Café Touba',
  },
  {
    id: 'cafe-250g',
    name: 'Sachet Saveur Touba - 250g',
    description: 'Le format idéal pour découvrir notre café ou pour un cadeau.',
    price: 2300,
    image: '/images/products/250g.jpg',
    slug: 'cafe-touba-250g',
    category: 'Café Touba',
  },
  {
    id: 'cafe-125g',
    name: 'Format Découverte Touba - 125g',
    description: 'Une petite quantité pour une dégustation ou pour vos voyages.',
    price: 1150,
    image: '/images/products/125g.jpg',
    slug: 'cafe-touba-125g',
    category: 'Café Touba',
  },
];


/**
 * Fetches all products directly from the database using Prisma.
 * This is the new recommended way for Server Components.
 */
export async function getProducts(): Promise<Product[]> {
    try {
        const productsFromDb = await prisma.product.findMany({
            orderBy: { name: 'asc' },
        });

        // Convert Prisma's Decimal and Date types to JSON-compatible types
        return productsFromDb.map(product => ({
            ...product,
            price: Number(product.price),
            createdAt: product.createdAt, // Keep as Date object for server
            updatedAt: product.updatedAt, // Keep as Date object for server
        }));
    } catch (error) {
        console.error("Failed to fetch products from DB:", error);
        return []; // Return an empty array in case of an error
    }
}
