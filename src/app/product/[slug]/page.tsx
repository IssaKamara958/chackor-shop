
import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next';
import { ProductDetailsClient } from "@/components/products/ProductDetailsClient";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

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

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);

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

