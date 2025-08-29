
import { products as staticProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next';
import { ProductDetailsClient } from "@/components/products/ProductDetailsClient";
import type { Product } from "@/lib/types";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

async function getProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:9002';
  try {
      const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
      if (!res.ok) return [];
      return res.json();
  } catch (error) {
      console.error("Failed to fetch products for metadata", error);
      return [];
  }
}

async function getProduct(slug: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find((p) => p.slug === slug);
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: "Produit non trouvé",
      description: "Ce produit n'existe pas ou plus dans notre catalogue.",
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.name,
    description: `Achetez ${product.name}. ${product.description} Disponible maintenant sur Chackor Shop.`,
    openGraph: {
      title: `${product.name} | Chackor Shop`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
        ...previousImages,
      ],
      type: 'article',
      url: `/product/${product.slug}`,
    },
     twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Chackor Shop`,
      description: product.description,
      images: [product.image],
    },
  }
}

export async function generateStaticParams() {
  // Although we fetch dynamically, we can still use the static data 
  // at build time to generate static paths.
  return staticProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `https://chackor-shop.com${product.image}`,
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Chackor Shop"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://chackor-shop.com/product/${product.slug}`,
      "priceCurrency": "XOF",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Chackor Shop"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailsClient product={product} />
    </>
  );
}

