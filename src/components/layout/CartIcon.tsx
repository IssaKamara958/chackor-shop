"use client";

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartProvider';

export function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Button asChild variant="ghost" size="icon" className="relative">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {itemCount}
          </span>
        )}
        <span className="sr-only">Voir le panier</span>
      </Link>
    </Button>
  );
}
