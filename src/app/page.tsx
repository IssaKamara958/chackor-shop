import { Hero } from '@/components/home/Hero';
import { ProductList } from '@/components/home/ProductList';
import { EventServiceOrder } from '@/components/home/EventServiceOrder';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';
import type { Product } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Accueil | Chackor Shop - Café Touba et Services',
  description: 'Bienvenue sur Chackor Shop. Achetez notre café Touba artisanal fabriqué à Thiès, Sénégal. Découvrez aussi nos services événementiels pour toutes vos occasions.',
};

async function getProducts(): Promise<Product[]> {
  // In a real app, you'd fetch this from your database.
  // We'll use the static file for now, served via an API route.
  // The NEXT_PUBLIC_URL environment variable should be set in your deployment environment.
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:9002';
  try {
    const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' }); // Use no-store to ensure dynamic data
    if (!res.ok) {
      console.error('Failed to fetch products:', await res.text());
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array on error
  }
}


export default async function Home() {
  const products = await getProducts();
  const cafeProducts = products.filter(p => p.category === 'Café Touba');

  return (
    <div className="space-y-16">
      <Hero />
      <section>
        <h2 id="products" className="text-3xl font-bold text-center font-headline scroll-mt-20">Notre Café Touba Artisanal</h2>
        <p className="text-center text-muted-foreground mt-2 mb-8">Torréfaction maison, avec clous de girofle et poivre noir.</p>
        <ProductList products={cafeProducts} />
      </section>
      <Separator />
      <section>
         <h2 className="text-3xl font-bold text-center font-headline">Un Service Café Complet Pour Vos Événements</h2>
        <p className="text-center text-muted-foreground mt-2 mb-8">De la fourniture du café à la préparation et au service de vos invités, nous nous occupons de tout !</p>
        <EventServiceOrder />
      </section>
    </div>
  );
}
