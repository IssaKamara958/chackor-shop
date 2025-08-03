import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartProvider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://chackor-shop.com'), // Replace with your actual domain
  title: {
    template: '%s | Chackor Shop',
    default: 'Chackor Shop - Café Touba Artisanal et Services',
  },
  description: 'Découvrez le Café Touba authentique de Chackor Organisation. Vente en ligne, services événementiels, et plus encore. Basé à Thiès, Sénégal.',
  keywords: ['Café Touba', 'Chackor Shop', 'Thiès', 'Sénégal', 'café artisanal', 'services événementiels'],
  openGraph: {
    title: 'Chackor Shop - Café Touba Artisanal et Services',
    description: 'La boutique officielle pour le café Touba de Chackor et les services associés.',
    url: '/',
    siteName: 'Chackor Shop',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bannière Chackor Shop',
      },
    ],
    locale: 'fr_SN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chackor Shop - Café Touba Artisanal et Services',
    description: 'Découvrez le Café Touba authentique de Chackor Organisation.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo/favicon.ico',
    apple: '/images/logo/apple-touch-icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
