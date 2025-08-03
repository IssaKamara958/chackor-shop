import { CartView } from "@/components/cart/CartView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Votre Panier",
  description: "Consultez les articles dans votre panier, ajustez les quantités et préparez-vous à finaliser votre commande sur Chackor Shop.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function CartPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-center font-headline mb-8">
        Votre Panier
      </h1>
      <CartView />
    </div>
  );
}
