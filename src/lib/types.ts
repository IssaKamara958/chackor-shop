
import type { Product as PrismaProduct } from '@prisma/client';

// We overwrite the `price` type from Decimal to number
// and ensure createdAt/updatedAt are Date objects.
export type Product = Omit<PrismaProduct, 'price'> & {
  price: number;
  createdAt: Date;
  updatedAt: Date;
  placeholderText?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export const REGIONS = ['Thiès', 'Dakar', 'Diourbel', 'Fatick', 'Kaffrine', 'Kaolack', 'Kédougou', 'Kolda', 'Louga', 'Matam', 'Saint-Louis', 'Sédhiou', 'Tambacounda', 'Ziguinchor'] as const;

export type Region = typeof REGIONS[number];
