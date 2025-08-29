
"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { QuantitySelector } from "@/components/products/QuantitySelector";

export function ProductDetailsClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
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
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
              <AddToCartButton product={product} quantity={quantity} className="w-full">
                Ajouter au Panier
              </AddToCartButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
