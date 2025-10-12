
import type { Product } from '@/types';

// Using static data instead of Prisma to avoid environment compatibility issues.
export const staticProducts: Product[] = [
  {
    id: 'cafe-1kg',
    name: 'L\'Authentique Café Touba - 1kg',
    description: 'Un kilogramme de notre café Touba artisanal, pour les vrais amateurs.',
    price: 6500,
    image: '/images/products/1kg.png',
    slug: 'cafe-touba-1kg',
    category: 'Café Touba',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cafe-500g',
    name: 'Le Traditionnel Café Touba - 500g',
    description: 'Un demi-kilo de pur plaisir, parfait pour une consommation régulière.',
    price: 3250,
    image: '/images/products/500g.jpg',
    slug: 'cafe-touba-500g',
    category: 'Café Touba',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cafe-250g',
    name: 'Sachet Saveur Touba - 250g',
    description: 'Le format idéal pour découvrir notre café ou pour un cadeau.',
    price: 2300,
    image: '/images/products/250g.jpg',
    slug: 'cafe-touba-250g',
    category: 'Café Touba',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cafe-125g',
    name: 'Format Découverte Touba - 125g',
    description: 'Une petite quantité pour une dégustation ou pour vos voyages.',
    price: 1150,
    image: '/images/products/125g.jpg',
    slug: 'cafe-touba-125g',
    category: 'Café Touba',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];


/**
 * Fetches all products from the static list.
 * This is now a simple async function returning a promise.
 */
export async function getProducts(): Promise<Product[]> {
    // We wrap the static data in a Promise to mimic an async operation
    // like fetching from a database or an API.
    return Promise.resolve(staticProducts);
}
