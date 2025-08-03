import { products } from "@/lib/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
      <Card className="overflow-hidden">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint="coffee bag"
          />
        </div>
      </Card>

      <div className="space-y-6">
        <div className="space-y-2">
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
            <p className="text-2xl lg:text-3xl font-bold text-primary">{product.price.toLocaleString('fr-FR')} FCFA</p>
        </div>
        
        <p className="text-foreground/80">{product.description}</p>
        
        <Card className="bg-card/80">
            <CardContent className="p-6">
                <div className="flex items-end gap-4">
                    <div className="grid gap-2 flex-grow">
                        <Label htmlFor="quantity" className="text-base">Quantité</Label>
                        {/* Note: This is a simplified version. A client component would be needed for state management of quantity */}
                        <Input id="quantity" type="number" defaultValue="1" min="1" className="w-24" />
                    </div>
                    <AddToCartButton product={product} className="w-full max-w-xs" >
                        Ajouter au Panier
                    </AddToCartButton>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
