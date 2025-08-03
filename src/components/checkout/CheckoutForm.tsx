"use client";

import { useState } from 'react';
import { useCart } from "@/context/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { REGIONS, Region } from '@/lib/types';
import Link from 'next/link';
import { CheckCircle, Mail, MessageCircle } from 'lucide-react';
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

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, shippingCost, vat, total, shippingRegion, clearCart } = useCart();
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

  function onSubmit(data: CheckoutFormValues) {
    setOrderDetails(data);
    setIsOrderConfirmed(true);
    clearCart();
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
TVA: ${Math.round(vat).toLocaleString('fr-FR')} FCFA
Transport: ${Math.round(shippingCost).toLocaleString('fr-FR')} FCFA
Total: ${Math.round(total).toLocaleString('fr-FR')} FCFA
---
Paiement: ${orderDetails.paymentMethod}
`;
    const whatsappUrl = `https://wa.me/221776828441?text=${encodeURIComponent(orderText)}`;
    const emailUrl = `mailto:issakamara958@gmail.com?subject=${encodeURIComponent('Nouvelle Commande Chackor Shop')}&body=${encodeURIComponent(orderText)}`;

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <CardTitle className="text-2xl font-headline mt-4">Commande confirmée !</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">Merci pour votre commande. Nous vous contacterons bientôt. Pour finaliser, veuillez nous envoyer les détails via WhatsApp ou Email.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2"/> Envoyer via WhatsApp</a>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <a href={emailUrl}><Mail className="mr-2"/> Envoyer via Email</a>
                    </Button>
                </div>
                 <Button asChild variant="link" className="mt-4">
                    <Link href="/">Retour à l'accueil</Link>
                </Button>
            </CardContent>
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
                <div className="flex justify-between"><span>TVA (18%)</span><span>{Math.round(vat).toLocaleString('fr-FR')} FCFA</span></div>
                <div className="flex justify-between"><span>Transport</span><span>{Math.round(shippingCost).toLocaleString('fr-FR')} FCFA</span></div>
                <Separator/>
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{Math.round(total).toLocaleString('fr-FR')} FCFA</span></div>
            </CardContent>
        </Card>
    </div>
  );
}
