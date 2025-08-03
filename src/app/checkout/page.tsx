import { CheckoutForm } from "@/components/checkout/CheckoutForm";

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