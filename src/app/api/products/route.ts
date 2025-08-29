import { NextResponse } from 'next/server';
import { products } from '@/lib/products';

export const dynamic = 'force-dynamic'; // Ensures the route is always dynamic

export async function GET() {
  try {
    // In a real application, you would fetch this from a database.
    // For now, we're returning the static data to simulate a DB call.
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Ensure you return a proper error response
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
