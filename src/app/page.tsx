import { Hero } from '@/components/home/Hero';
import { ProductList } from '@/components/home/ProductList';
import { EventServiceOrder } from '@/components/home/EventServiceOrder';
import { products } from '@/lib/products';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const cafeProducts = products.filter(p => p.category === 'Café Touba');

  return (
    <div className="space-y-16">
      <Hero />
      <div>
        <h2 id="products" className="text-3xl font-bold text-center font-headline scroll-mt-20">Notre Café Touba Artisanal</h2>
        <p className="text-center text-muted-foreground mt-2 mb-8">Torréfaction maison, avec clous de girofle et poivre noir.</p>
        <ProductList products={cafeProducts} />
      </div>
      <Separator />
      <div>
         <h2 className="text-3xl font-bold text-center font-headline">Un Événement à Célébrer ?</h2>
        <p className="text-center text-muted-foreground mt-2 mb-8">Commandez notre service café pour vos baptêmes, magals, et autres occasions.</p>
        <EventServiceOrder />
      </div>
    </div>
  );
}
