import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="text-center py-20 rounded-lg bg-card shadow-md">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">
          Bienvenue chez Chackor Shop
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground">
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
