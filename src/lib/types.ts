

// We define the Product type manually now that Prisma is removed.
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  category: string;
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

    