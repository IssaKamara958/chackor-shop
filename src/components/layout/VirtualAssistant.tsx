"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageSquare, X } from "lucide-react";
import { Badge } from "../ui/badge";

const quickLinks = [
    { href: "/#products", label: "Voir les produits" },
    { href: "/about#contact", label: "Contacter l'équipe" },
    { href: "/about", label: "À propos de nous" },
];

export function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 flex items-center justify-center text-white"
          aria-label="Ouvrir l'assistant virtuel"
        >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-80 md:w-96 rounded-lg shadow-xl border-primary/20 mr-4 mb-2"
      >
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-4">
            <div className="relative h-12 w-12 shrink-0">
                <Image
                    src="/images/logo/ch-logo.jpg"
                    alt="Ablaye Sène, assistant virtuel"
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-primary"
                    data-ai-hint="man portrait"
                />
                 <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
            </div>
            
            <div className="space-y-2 flex-grow">
                <p className="font-bold text-lg">Ablaye Sène</p>
                <div className="p-3 bg-secondary/30 rounded-lg text-sm text-foreground">
                    <p>Bonjour ! Je suis votre assistant virtuel chez Chackor. Comment puis-je vous aider aujourd'hui ?</p>
                </div>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
                <strong className="text-primary">Chackor Organisation</strong> est un hub d'initiatives innovantes fondé par <strong className="text-primary">Issa Kamara</strong>. Nous proposons :
            </p>
            <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">☕ Café Touba</Badge>
                <Badge variant="secondary">💻 Services Digitaux</Badge>
                <Badge variant="secondary">📊 Consulting</Badge>
                <Badge variant="secondary">🚚 Bana Bana</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-2">
            {quickLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="outline"
                className="justify-start"
                onClick={() => setIsOpen(false)}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
