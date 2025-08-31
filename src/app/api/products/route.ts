import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Utilise Prisma pour récupérer tous les produits de la base de données
    const products = await prisma.product.findMany({
        orderBy: {
            // Optionnel : trier les produits par leur nom par défaut
            name: 'asc'
        }
    });

    // La conversion de type n'est plus nécessaire car Prisma retourne des types corrects (ex: Decimal pour le prix)
    // Mais Next.js a besoin que les types complexes comme Decimal soient sérialisables.
    const serializableProducts = products.map(product => ({
      ...product,
      price: Number(product.price), // Convertit le type Decimal en Number
    }));

    return NextResponse.json(serializableProducts);
  } catch (error) {
    console.error("Failed to fetch products from DB:", error);
    
    // Fournit une erreur plus détaillée en développement
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error: errorMessage }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
