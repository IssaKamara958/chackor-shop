"use client";

import { useState, Suspense, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageSquare, X, Loader } from "lucide-react";
import { Badge } from "../ui/badge";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import type { Group } from 'three';

const quickLinks = [
    { href: "/#products", label: "Voir les produits" },
    { href: "/about#contact", label: "Contacter l'équipe" },
    { href: "/about", label: "À propos de nous" },
];

function Model(props: { open: boolean }) {
  const group = useRef<Group>(null!);
  // Note: Using a free model from Sketchfab. Replace with your actual model.
  const { scene, animations } = useGLTF('/models/emily.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play a greeting animation when the popover opens
    if (props.open && actions['Greeting']) {
      actions['Greeting'].reset().fadeIn(0.5).play();
    } else if (actions['Idle']) {
      // Otherwise, play the idle animation
      actions['Idle']?.reset().fadeIn(0.5).play();
    }

    // Cleanup on unmount or when animation changes
    return () => {
      if (actions['Greeting']) actions['Greeting'].fadeOut(0.5);
      if (actions['Idle']) actions['Idle'].fadeOut(0.5);
    };
  }, [props.open, actions]);

  return <primitive ref={group} object={scene} {...props} scale={2} position-y={-2} />;
}

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
        className="w-80 md:w-96 rounded-lg shadow-xl border-primary/20 mr-4 mb-2 p-0 overflow-hidden"
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1 bg-gradient-to-br from-primary/20 to-secondary/20 min-h-[150px]">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[3.3, 1.0, 4.4]} intensity={4} />
              <Suspense fallback={<Loader />}>
                <Model open={isOpen} />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
            </Canvas>
          </div>
          <div className="col-span-2 p-4 space-y-3">
             <div className="space-y-1">
                <p className="font-bold text-lg">Ablaye Sène</p>
                <div className="p-2 bg-secondary/30 rounded-lg text-sm text-foreground">
                    <p>Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider ?</p>
                </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                    <strong className="text-primary">Chackor Organisation</strong> est un hub d'initiatives innovantes fondé par <strong className="text-primary">Issa Kamara</strong>.
                </p>
                <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary">☕ Café Touba</Badge>
                    <Badge variant="secondary">💻 Digital</Badge>
                    <Badge variant="secondary">📊 Consulting</Badge>
                </div>
          </div>
          </div>
        </div>
        <div className="p-4 pt-0 border-t">
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
