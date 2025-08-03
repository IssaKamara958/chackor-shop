import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Chackor Organisation. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/about" className="hover:text-primary">
              À propos
            </Link>
            <Link href="/about#contact" className="hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
