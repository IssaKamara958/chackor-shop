import Link from 'next/link';
import { Facebook, Mail, Phone, User, Globe, MapPin } from 'lucide-react';
import Image from 'next/image';

// The existing Footer component
export function Footer() {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3855.986337345334!2d-16.94784868515663!3d14.79788598962299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec115951197c397%3A0x472f796233261645!2sParcelles%20Assainies%20Unit%C3%A9%201%2C%20Thi%C3%A8s%2C%20S%C3%A9n%C3%A9gal!5e0!3m2!1sfr!2sfr!4v1628588882531!5m2!1sfr!2sfr";

  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
          <div className="space-y-4">
            <h3 className="font-bold text-base text-primary font-headline">Conçu et développé par</h3>
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
                <li><a href="https://issa-kamara-portfolio-3d.web.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-center gap-2"><Globe className="h-4 w-4" />Portfolio</a></li>
                <li><a href="https://www.facebook.com/profile.php?id=100074472115745" target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-center gap-2"><Facebook className="h-4 w-4" />Facebook</a></li>
            </ul>
          </div>
          {/* Section for the Google Map */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1" id="localisation">
            <h3 className="font-bold text-base text-primary font-headline">Localisation</h3>
            <div className="relative w-full h-48 overflow-hidden rounded-lg border">
                <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Carte de localisation de Chackor Organisation à Thiès, Sénégal"
                ></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
