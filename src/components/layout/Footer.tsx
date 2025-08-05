import Link from 'next/link';
import { Facebook, Mail, Phone, User, Globe, MapPin } from 'lucide-react';
import Image from 'next/image';

// The existing Footer component
export function Footer() {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Parcelles+Assainies+unité+1,+avenue+Police,+rue+de+la+Mosquée+Idrissa+Gaye,+Thies";

  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
          <div className="space-y-4">
            <h3 className="font-bold text-base text-primary font-headline">Développé par</h3>
            <p className="flex items-start gap-2">
              <User className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                <strong>Issa Kamara</strong><br/>
                Entrepreneur Indépendant & Développeur Web Frontend
              </span>
            </p>
             <p>
                Fondateur de Chackor Organisation
            </p>
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()} Chackor Organisation. Tous droits réservés.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-base text-primary font-headline">Contact</h3>
            <address className="not-italic space-y-2 text-muted-foreground">
              <p>Parcelles Assainies unité 1, Thiès, Sénégal</p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+221776828441" className="hover:text-primary">+221 77 682 84 41</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:issakamara958@gmail.com" className="hover:text-primary">issakamara958@gmail.com</a>
              </p>
            </address>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-base text-primary font-headline">Liens Utiles</h3>
            <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-primary flex items-center gap-2"><User className="h-4 w-4" />À propos</Link></li>
                <li><a href="https://issa-portfeuil.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-center gap-2"><Globe className="h-4 w-4" />Portfolio</a></li>
                <li><a href="https://www.facebook.com/profile.php?id=100074472115745" target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-center gap-2"><Facebook className="h-4 w-4" />Facebook</a></li>
            </ul>
          </div>
          {/* Section for the Google Map */}
          <div className="space-y-4" id="localisation">
            <h3 className="font-bold text-base text-primary font-headline">Localisation</h3>
            <div className="relative w-full h-48 overflow-hidden rounded-lg border">
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" title="Voir sur Google Maps">
                    <Image
                        src="https://placehold.co/400x300.png"
                        alt="Carte de localisation de Chackor Organisation"
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        data-ai-hint="map location"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white p-4 text-center hover:bg-black/50 transition-colors">
                        <div >
                            <MapPin className="h-8 w-8 mx-auto mb-2" />
                            <p className="font-semibold">Cliquez pour voir sur Google Maps</p>
                        </div>
                    </div>
                </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
