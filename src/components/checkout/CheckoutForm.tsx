
"use client";

import { useState, useEffect } from 'react';
import { useCart } from "@/context/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { REGIONS, Region, CartItem } from '@/types';
import Link from 'next/link';
import { CheckCircle, Download, Smartphone, Send, Wallet, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

const checkoutSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  address: z.string().min(5, "L'adresse est requise"),
  phone: z.string().regex(/^[0-9]{9,15}$/, "Numéro de téléphone invalide"),
  region: z.enum(REGIONS, { errorMap: () => ({ message: "Veuillez sélectionner une région." }) }),
  paymentMethod: z.enum(["Wave", "Orange Money", "Comptant"], { errorMap: () => ({ message: "Veuillez sélectionner une méthode de paiement." }) }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;
type PaymentMethod = CheckoutFormValues['paymentMethod'];

// Interface for the confirmed order details, now separate from the cart
interface ConfirmedOrder {
    customer: CheckoutFormValues;
    items: CartItem[];
    subtotal: number;
    shippingCost: number;
    total: number;
}

function PaymentInstructions({ method }: { method?: PaymentMethod }) {
    if (method === 'Wave' || method === 'Orange Money') {
        return (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm">
                <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                        <p>Veuillez envoyer le montant total au numéro suivant :</p>
                        <p className="font-bold text-lg">77 682 84 41</p>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

const paymentMethods: { id: PaymentMethod, label: string, icon: React.ReactNode }[] = [
    { id: "Wave", label: "Wave", icon: <CreditCard className="mr-2" /> },
    { id: "Orange Money", label: "Orange Money", icon: <Smartphone className="mr-2" /> },
    { id: "Comptant", label: "Comptant (à la livraison)", icon: <Wallet className="mr-2" /> },
]

export function CheckoutForm() {
  const router = useRouter();
  const { items, itemCount, subtotal, shippingCost, total, shippingRegion, clearCart } = useCart();
  
  // State to hold the finalized order details AFTER validation
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  // Redirect if cart is empty and no order has been confirmed
  useEffect(() => {
    if (itemCount === 0 && !confirmedOrder) {
      router.replace('/');
    }
  }, [itemCount, confirmedOrder, router]);


  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      region: shippingRegion,
      paymentMethod: "Wave",
    },
  });

  const watchedPaymentMethod = useWatch({ control: form.control, name: 'paymentMethod' });

  function generateReceiptContent(order: ConfirmedOrder) {
    return `
Reçu de Commande - Chackor Shop
-----------------------------------------
Date: ${new Date().toLocaleDateString('fr-FR')}
Numéro de commande: #${Date.now().toString().slice(-6)}

Informations Client:
  Nom: ${order.customer.name}
  Adresse: ${order.customer.address}, ${order.customer.region}
  Téléphone: ${order.customer.phone}

Récapitulatif de la Commande:
-----------------------------------------
${order.items.map(item => `  - ${item.quantity}x ${item.product.name.padEnd(40)} | ${(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA`).join('\n')}

Détail des coûts:
  Nombre total d'articles: ${order.items.reduce((acc, item) => acc + item.quantity, 0)}
  Sous-total: ${order.subtotal.toLocaleString('fr-FR')} FCFA
  Frais de transport: ${Math.round(order.shippingCost).toLocaleString('fr-FR')} FCFA
-----------------------------------------
  TOTAL PAYÉ: ${Math.round(order.total).toLocaleString('fr-FR')} FCFA
-----------------------------------------

Méthode de Paiement: ${order.customer.paymentMethod}
${(order.customer.paymentMethod === 'Wave' || order.customer.paymentMethod === 'Orange Money') ? 'Statut: En attente de paiement au 77 682 84 41' : 'Statut: Paiement à la livraison'}

Merci pour votre confiance !
Chackor Shop
+221 77 682 84 41
`.trim();
  }

  const handleDownloadReceipt = () => {
    if (!confirmedOrder) return;
    const receiptContent = generateReceiptContent(confirmedOrder);
    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `recu-chackor-shop-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // This function now just saves the order details and clears the cart.
  function onSubmit(data: CheckoutFormValues) {
    // 1. Capture all necessary cart data before clearing it
    setConfirmedOrder({
      customer: data,
      items: [...items], // Create a copy of the items array
      subtotal,
      shippingCost,
      total,
    });
    
    // 2. Clear the cart. This will be reflected on the next render.
    clearCart();
  }
  
  // If an order has been confirmed, show the success screen.
  if (confirmedOrder) {
    const orderText = `
*Nouvelle commande Chackor Shop:*
-----------------------------------
*Client:* ${confirmedOrder.customer.name}
*Adresse:* ${confirmedOrder.customer.address}, ${confirmedOrder.customer.region}
*Téléphone:* ${confirmedOrder.customer.phone}
-----------------------------------
*Produits:*
${confirmedOrder.items.map(item => `- ${item.quantity}x ${item.product.name}`).join('\n')}
-----------------------------------
*Sous-total:* ${confirmedOrder.subtotal.toLocaleString('fr-FR')} FCFA
*Transport:* ${Math.round(confirmedOrder.shippingCost).toLocaleString('fr-FR')} FCFA
*Total à payer:* ${Math.round(confirmedOrder.total).toLocaleString('fr-FR')} FCFA
-----------------------------------
*Paiement:* ${confirmedOrder.customer.paymentMethod}
`;

    const whatsappUrl = `https://wa.me/221776828441?text=${encodeURIComponent(orderText)}`;

    const handleNewOrder = () => {
      // No need to clear cart, already done. Just redirect.
      router.push('/');
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <CardTitle className="text-2xl font-headline mt-4">Veuillez poursuivre...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-center text-muted-foreground">Validez votre commande en l'envoyant via WhatsApp. Nous vous contacterons rapidement pour confirmer.</p>
                
                <Card className='p-4'>
                    <CardTitle className='text-lg mb-2'>Récapitulatif de la commande</CardTitle>
                    <ul className="space-y-1 text-sm text-muted-foreground">{confirmedOrder.items.map(({ product, quantity }) => (
                        <li key={product.id} className="flex justify-between items-center"><span>{quantity} x {product.name}</span><span>{(product.price * quantity).toLocaleString('fr-FR')} FCFA</span></li>
                    ))}</ul>
                    <Separator className='my-2'/>
                    <div className="flex justify-between font-bold text-base"><span>Total</span><span>{Math.round(confirmedOrder.total).toLocaleString('fr-FR')} FCFA</span></div>
                </Card>

                {(confirmedOrder.customer.paymentMethod === 'Wave' || confirmedOrder.customer.paymentMethod === 'Orange Money') && (
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <h3 className="font-semibold">Instructions de paiement</h3>
                    <p>Envoyez le total de <strong className="text-primary">{Math.round(confirmedOrder.total).toLocaleString('fr-FR')} FCFA</strong> par {confirmedOrder.customer.paymentMethod} au :</p>
                    <p className="text-2xl font-bold my-2">77 682 84 41</p>
                    <p className="text-xs text-muted-foreground">Votre commande sera traitée dès réception du paiement.</p>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className='w-full sm:w-auto'>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <Send className="mr-2"/> Envoyer via WhatsApp
                        </a>
                    </Button>
                    <Button onClick={handleDownloadReceipt} size="lg" variant="outline" className='w-full sm:w-auto'>
                        <Download className="mr-2"/> Télécharger le reçu
                    </Button>
                </div>

            </CardContent>
            <CardFooter>
                 <Button onClick={handleNewOrder} variant="ghost" className="w-full text-muted-foreground">
                    Passer une nouvelle commande
                </Button>
            </CardFooter>
        </Card>
    )
  }

  // Hide form until we've confirmed the cart is not empty client-side
  if (itemCount === 0) {
    return null; 
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-lg">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Nom complet</FormLabel><FormControl><Input placeholder="Votre nom" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Adresse de livraison</FormLabel><FormControl><Input placeholder="Votre adresse" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input placeholder="771234567" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <FormField control={form.control} name="region" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Région</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Sélectionnez votre région" /></SelectTrigger></FormControl>
                            <SelectContent>{REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Méthode de paiement</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                                {paymentMethods.map(method => (
                                     <FormItem key={method.id} className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value={method.id} /></FormControl>
                                        <FormLabel className="font-normal flex items-center">{method.icon} {method.label}</FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                         <PaymentInstructions method={watchedPaymentMethod} />
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit" className="w-full" size="lg">Valider la commande</Button>
            </form>
        </Form>
        <Card className="sticky top-24">
            <CardHeader><CardTitle>Récapitulatif de la commande</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">{items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex justify-between items-center"><span>{quantity} x {product.name}</span><span>{(product.price * quantity).toLocaleString('fr-FR')} FCFA</span></li>
                ))}</ul>
                <Separator/>
                <div className="flex justify-between"><span>Sous-total</span><span>{subtotal.toLocaleString('fr-FR')} FCFA</span></div>
                {itemCount > 0 && <div className="flex justify-between"><span>Transport</span><span>{Math.round(shippingCost).toLocaleString('fr-FR')} FCFA</span></div>}
                <Separator/>
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{Math.round(total).toLocaleString('fr-FR')} FCFA</span></div>
            </CardContent>
        </Card>
    </div>
  );
}

    