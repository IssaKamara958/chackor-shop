
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative text-center py-20 rounded-lg bg-card shadow-md overflow-hidden">
      <Image
        src="/images/products/banner.jpg"
        alt="Bannière de grains de café"
        fill
        priority
        className="object-cover brightness-50"
        data-ai-hint="coffee beans"
        sizes="100vw"
      />
      <div className="container mx-auto px-4 relative z-10 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight drop-shadow-lg">
          Bienvenue chez Chackor<br/><span className="text-amber-400">Shop</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg drop-shadow-lg">
          La boutique officielle de Chackor Organisation.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#products">
              Voir les produits
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
