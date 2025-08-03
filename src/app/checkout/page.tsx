import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement de votre commande",
  description: "Finalisez votre commande sur Chackor Shop en remplissant vos informations de livraison et de paiement.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function CheckoutPage() {
    return (
        <div>
             <h1 className="text-3xl md:text-4xl font-bold text-center font-headline mb-8">
                Paiement
            </h1>
            <CheckoutForm />
        </div>
    )
}
