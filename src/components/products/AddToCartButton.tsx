"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartProvider";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
};

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  children,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Ajouté au panier",
      description: `${quantity} x ${product.name} a été ajouté à votre panier.`,
    });
  };

  return (
    <Button onClick={handleAddToCart} className={className} size={children ? 'lg' : 'default'} >
      {children || (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter au panier
        </>
      )}
    </Button>
  );
}
