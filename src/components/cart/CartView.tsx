"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { REGIONS, Region } from "@/lib/types";

export function CartView() {
  const { items, itemCount, updateQuantity, removeItem, subtotal, shippingCost, total, shippingRegion, setRegion } = useCart();

  if (itemCount === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-lg">
        <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-semibold">Votre panier est vide</h2>
        <p className="mt-2 text-muted-foreground">Parcourez nos produits pour commencer vos achats.</p>
        <Button asChild className="mt-6">
          <Link href="/">Continuer les achats</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 bg-card p-4 sm:p-6 rounded-lg shadow-sm">
        <ul className="space-y-6">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="rounded-md object-cover aspect-square"
                data-ai-hint="coffee bag"
              />
              <div className="flex-grow">
                <Link href={`/product/${product.slug}`} className="font-semibold hover:text-primary">{product.name}</Link>
                <p className="text-sm text-muted-foreground">{product.price.toLocaleString('fr-FR')} FCFA</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input type="number" value={quantity} readOnly className="h-8 w-14 text-center" />
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeItem(product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Card className="lg:col-span-1 sticky top-24 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Récapitulatif</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="region-select">Région de livraison</Label>
            <Select value={shippingRegion} onValueChange={(value) => setRegion(value as Region)}>
              <SelectTrigger id="region-select">
                <SelectValue placeholder="Choisir une région" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span>{subtotal.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <div className="flex justify-between">
            <span>Frais de transport</span>
            <span>{Math.round(shippingCost).toLocaleString('fr-FR')} FCFA</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{Math.round(total).toLocaleString('fr-FR')} FCFA</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full" size="lg">
            <Link href="/checkout">Commander</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
