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

    // Conversion des types non-sériálisables (Decimal, Date) en types compatibles JSON (Number, String)
    const serializableProducts = products.map(product => ({
      ...product,
      price: Number(product.price), // Convertit le type Decimal en Number
      createdAt: product.createdAt.toISOString(), // Convertit la date en string
      updatedAt: product.updatedAt.toISOString(), // Convertit la date en string
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
