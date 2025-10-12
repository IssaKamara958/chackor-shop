
import { getProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next';
import { ProductDetailsClient } from "@/components/products/ProductDetailsClient";
import type { Product } from "@/types";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

// This function now fetches a single product by its slug
async function getProduct(slug: string): Promise<Product | undefined> {
    const products = await getProducts(); // In a real app, you'd fetch one product
    const product = products.find((p) => p.slug === slug);
    if (!product) return undefined;

    // Convert Date objects to string to be serializable for the client component
    return {
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
    } as unknown as Product;
}


export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // We fetch again here, but Next.js automatically de-duplicates fetch requests
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
  const products = await getProducts();
  return products.map((product) => ({
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
