export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  category: 'Café Touba' | 'Service Événementiel';
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export const REGIONS = ['Thiès', 'Dakar', 'Diourbel', 'Fatick', 'Kaffrine', 'Kaolack', 'Kédougou', 'Kolda', 'Louga', 'Matam', 'Saint-Louis', 'Sédhiou', 'Tambacounda', 'Ziguinchor'] as const;

export type Region = typeof REGIONS[number];
