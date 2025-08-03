import { CartView } from "@/components/cart/CartView";

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
