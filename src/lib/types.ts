
import type { Product as PrismaProduct } from '@prisma/client';

// We overwrite the `price` type from Decimal to number
// and ensure createdAt/updatedAt are strings for client-side serialization.
// On the server, they can be Date objects, but they must be converted before being passed to a client component.
export type Product = Omit<PrismaProduct, 'price' | 'createdAt' | 'updatedAt'> & {
  price: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  placeholderText?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export const REGIONS = ['Thiès', 'Dakar', 'Diourbel', 'Fatick', 'Kaffrine', 'Kaolack', 'Kédougou', 'Kolda', 'Louga', 'Matam', 'Saint-Louis', 'Sédhiou', 'Tambacounda', 'Ziguinchor'] as const;

export type Region = typeof REGIONS[number];

    