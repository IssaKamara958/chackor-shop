import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User, Globe, Facebook } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos de Chackor Organisation",
  description: "Découvrez la mission, la vision et les services de Chackor Organisation, une initiative communautaire à Thiès, Sénégal, et ses pôles d'activités : Café Touba, services digitaux, et plus.",
  openGraph: {
    title: 'À Propos de Chackor Organisation | Chackor Shop',
    description: 'Tout savoir sur Chackor Organisation, notre mission et nos services.',
    url: '/about',
    images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: 'À propos de Chackor Shop',
        },
      ],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">À Propos de Nous</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Créer un écosystème enraciné dans la culture locale, propulsé par la technologie, et orienté vers le développement humain et territorial.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Chackor Organisation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90">
          <p>
            Chackor Organisation est une initiative communautaire basée à Thiès, au Sénégal. Notre mission est de valoriser les savoir-faire locaux, de promouvoir la digitalisation inclusive, et de favoriser le développement interrégional.
          </p>
          <p>
            Nous regroupons des talents dans divers domaines tels que l’artisanat, l’agriculture, la technologie, et le conseil, créant ainsi un pont entre tradition et modernité.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Achakourou : Notre Extension Numérique</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/90">
          <p>Achakourou est notre branche numérique, structurée autour de quatre pôles stratégiques :</p>
          <ul className="list-disc list-inside space-y-4 pl-4">
            <li>
              <span className="font-semibold text-primary">Achakourou Café Touba :</span> Café artisanal avec torréfaction maison, enrichi de clous de girofle et poivre noir. Nous privilégions un emballage local et une distribution interrégionale pour soutenir l'économie locale.
            </li>
            <li>
              <span className="font-semibold text-primary">Achakourou Digital Services :</span> Création de sites web, développement front-end (React, HTML, CSS, JavaScript), prototypage UX/UI, et intégration de services numériques pour les entreprises et les particuliers.
            </li>
            <li>
              <span className="font-semibold text-primary">Achakourou Bana Bana :</span> Plateforme de commerce agricole interrégional visant à connecter directement les producteurs locaux aux marchés, garantissant une meilleure rémunération et des produits de qualité.
            </li>
            <li>
              <span className="font-semibold text-primary">Achakourou Consulting :</span> Services de conseil en gestion, digitalisation, stratégie d'entreprise, et accompagnement psychologique pour le développement personnel et professionnel.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card id="contact">
        <CardHeader>
          <CardTitle className="font-headline">Contactez-nous</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
                <User className="h-5 w-5 text-primary mt-1" />
                <div>
                  <strong>Issa Kamara</strong>
                  <p className="text-sm text-muted-foreground">Entrepreneur, Développeur Web & Fondateur de Chackor</p>
                  <p className="text-sm text-muted-foreground">Parcelles Assainies unité 1, Thiès, Sénégal</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+221776828441" className="hover:underline">+221 77 682 84 41</a>
            </div>
            <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:issakamara958@gmail.com" className="hover:underline">issakamara958@gmail.com</a>
            </div>
            <div className="flex items-center gap-4">
                <Globe className="h-5 w-5 text-primary" />
                <a href="https://issa-portfeuil.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">issa-portfeuil.netlify.app</a>
            </div>
            <div className="flex items-center gap-4">
                <Facebook className="h-5 w-5 text-primary" />
                <a href="https://www.facebook.com/profile.php?id=100074472115745" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
