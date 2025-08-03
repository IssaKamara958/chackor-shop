import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative text-center py-20 rounded-lg bg-card shadow-md overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-50" 
        style={{ backgroundImage: "url('/images/products/banner.jpg')" }}
        role="presentation"
        aria-hidden="true"
      ></div>
      <div className="container mx-auto px-4 relative z-10 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight drop-shadow-lg">
          Bienvenue chez Chackor Shop
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg drop-shadow-lg">
          Découvrez la saveur authentique de notre café Touba et les services de Chackor Organisation.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#products">
              Commander Maintenant
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
