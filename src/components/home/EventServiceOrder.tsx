"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const EVENT_PRICE_PER_UNIT = 10000; // Prix par "marmite" de café, incluant le service complet.

export function EventServiceOrder() {
  const [eventType, setEventType] = useState('Baptême');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  const totalPrice = quantity * EVENT_PRICE_PER_UNIT;

  const handleAddToCart = () => {
    if (quantity < 1) {
        toast({
            title: "Quantité invalide",
            description: "Veuillez entrer une quantité valide.",
            variant: "destructive",
        })
        return;
    }
    
    const eventProduct: Product = {
      id: `event-${eventType.toLowerCase()}-${Date.now()}`,
      name: `Service Clé en Main: ${eventType}`,
      description: `Service café complet pour ${quantity} unité(s), incluant fourniture, préparation et service.`,
      price: totalPrice / quantity, // Price per unit
      image: '/images/services/event-service.png',
      slug: 'service-evenementiel',
      category: 'Service Événementiel',
    };
    
    addItem(eventProduct, quantity);
    toast({
      title: "Service ajouté au panier",
      description: `Le service pour votre ${eventType} a été ajouté.`,
    });
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-center font-headline">Service Café Clé en Main</CardTitle>
        <CardDescription className="text-center pt-2">
            Notre prestation inclut la fourniture du café, sa préparation sur place et le service à vos invités tout au long de votre événement.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="event-type">Type d'événement</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger id="event-type">
                <SelectValue placeholder="Choisissez un événement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baptême">Baptême</SelectItem>
                <SelectItem value="Magal">Magal</SelectItem>
                <SelectItem value="Mariage">Mariage</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantité (ex: nombre de marmites)</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
        </div>
        <div className="text-center">
            <p className="text-muted-foreground">Prix total pour le service complet</p>
            <p className="text-3xl font-bold text-primary">{totalPrice.toLocaleString('fr-FR')} FCFA</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Ajouter la prestation au panier
        </Button>
      </CardFooter>
    </Card>
  );
}
