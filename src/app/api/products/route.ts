import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM products');
    connection.release();
    
    // Le SGBD retourne les champs `price` comme des chaînes de caractères,
    // il faut donc les convertir en nombres.
    const products = (rows as any[]).map(product => ({
      ...product,
      price: parseFloat(product.price)
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products from DB:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
