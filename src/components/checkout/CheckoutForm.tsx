"use client";

import { useState } from 'react';
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
import { REGIONS, Region } from '@/lib/types';
import Link from 'next/link';
import { CheckCircle, Download, FileText, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';

const checkoutSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  address: z.string().min(5, "L'adresse est requise"),
  phone: z.string().regex(/^[0-9]{9,15}$/, "Numéro de téléphone invalide"),
  email: z.string().email("Adresse email invalide"),
  region: z.enum(REGIONS, { errorMap: () => ({ message: "Veuillez sélectionner une région." }) }),
  paymentMethod: z.enum(["Wave", "Orange Money", "Comptant"], { errorMap: () => ({ message: "Veuillez sélectionner une méthode de paiement." }) }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

function PaymentInstructions({ method }: { method: "Wave" | "Orange Money" | "Comptant" }) {
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

export function CheckoutForm() {
  const router = useRouter();
  const { items, itemCount, subtotal, shippingCost, total, shippingRegion, clearCart } = useCart();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState<CheckoutFormValues | null>(null);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      region: shippingRegion,
      paymentMethod: "Wave",
    },
  });

  const paymentMethod = useWatch({ control: form.control, name: 'paymentMethod' });

  function generateReceiptContent(data: CheckoutFormValues) {
    return `
Reçu de Commande - Chackor Shop
-----------------------------------------
Date: ${new Date().toLocaleDateString('fr-FR')}
Numéro de commande: #${Date.now().toString().slice(-6)}

Informations Client:
  Nom: ${data.name}
  Adresse: ${data.address}, ${data.region}
  Téléphone: ${data.phone}
  Email: ${data.email}

Récapitulatif de la Commande:
-----------------------------------------
${items.map(item => `  - ${item.quantity}x ${item.product.name.padEnd(40)} | ${(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA`).join('\n')}

Détail des coûts:
  Nombre total d'articles: ${itemCount}
  Sous-total: ${subtotal.toLocaleString('fr-FR')} FCFA
  Frais de transport: ${Math.round(shippingCost).toLocaleString('fr-FR')} FCFA
-----------------------------------------
  TOTAL À PAYER: ${Math.round(total).toLocaleString('fr-FR')} FCFA
-----------------------------------------

Méthode de Paiement: ${data.paymentMethod}
${(data.paymentMethod === 'Wave' || data.paymentMethod === 'Orange Money') ? 'Statut: En attente de paiement au 77 682 84 41' : 'Statut: Paiement à la livraison'}

Merci pour votre confiance !
Chackor Shop
+221 77 682 84 41
`.trim();
  }

  const handleDownloadReceipt = () => {
    if (!orderDetails) return;
    const receiptContent = generateReceiptContent(orderDetails);
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


  function onSubmit(data: CheckoutFormValues) {
    setOrderDetails(data);
    setIsOrderConfirmed(true);
    // Do not clear cart here, so receipt can be generated
  }

  if (items.length === 0 && !isOrderConfirmed) {
     router.push('/');
     return null;
  }
  
  if (isOrderConfirmed && orderDetails) {
    const orderText = `
Nouvelle commande Chackor Shop:
---
Client: ${orderDetails.name}
Adresse: ${orderDetails.address}, ${orderDetails.region}
Téléphone: ${orderDetails.phone}
Email: ${orderDetails.email}
---
Produits:
${items.map(item => `- ${item.quantity}x ${item.product.name}`).join('\n')}
---
Sous-total: ${subtotal.toLocaleString('fr-FR')} FCFA
Transport: ${Math.round(shippingCost).toLocaleString('fr-FR')} FCFA
Total: ${Math.round(total).toLocaleString('fr-FR')} FCFA
---
Paiement: ${orderDetails.paymentMethod}
`;

    const handleNewOrder = () => {
      clearCart();
      router.push('/');
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <CardTitle className="text-2xl font-headline mt-4">Veuillez poursuivre...</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">Merci pour votre commande. Veuillez effectuer le paiement si nécessaire, puis téléchargez votre reçu. Nous vous contacterons bientôt.</p>
                
                {(orderDetails.paymentMethod === 'Wave' || orderDetails.paymentMethod === 'Orange Money') && (
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <h3 className="font-semibold">Instructions de paiement</h3>
                    <p>Envoyez le total de <strong className="text-primary">{Math.round(total).toLocaleString('fr-FR')} FCFA</strong> par {orderDetails.paymentMethod} au :</p>
                    <p className="text-2xl font-bold my-2">77 682 84 41</p>
                    <p className="text-xs text-muted-foreground">Votre commande sera traitée dès réception du paiement.</p>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={handleDownloadReceipt} size="lg">
                        <Download className="mr-2"/> Télécharger le reçu
                    </Button>
                </div>

                <div className='text-xs text-muted-foreground pt-4'>
                    <p>Après avoir téléchargé votre reçu, vous pouvez passer une nouvelle commande.</p>
                </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={handleNewOrder} variant="outline" className="w-full">
                    Retour à l'accueil et nouvelle commande
                </Button>
            </CardFooter>
        </Card>
    )
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
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="votre@email.com" {...field} /></FormControl><FormMessage /></FormItem>
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
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Wave" /></FormControl><FormLabel className="font-normal">Wave</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Orange Money" /></FormControl><FormLabel className="font-normal">Orange Money</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Comptant" /></FormControl><FormLabel className="font-normal">Comptant (à la livraison/au local)</FormLabel></FormItem>
                            </RadioGroup>
                        </FormControl>
                         <PaymentInstructions method={paymentMethod} />
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
                <div className="flex justify-between"><span>Transport</span><span>{Math.round(shippingCost).toLocaleString('fr-FR')} FCFA</span></div>
                <Separator/>
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{Math.round(total).toLocaleString('fr-FR')} FCFA</span></div>
            </CardContent>
        </Card>
    </div>
  );
}

    