import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductForm from "../../ProductForm";
import type { ProductFormInitialData } from "../../ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { sizes: { select: { label: true, stock: true } } },
  });

  if (!product) notFound();

  const initialData: ProductFormInitialData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    comparePrice: product.comparePrice,
    brand: product.brand,
    // Category enum value is a string — safe to cast
    category: product.category as ProductFormInitialData["category"],
    stock: product.stock,
    images: product.images,
    sizes: product.sizes,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm px-6 py-5">
        <h1 className="text-xl font-black text-soft-black">Edit Product</h1>
        <p className="text-sm text-gray-400 mt-0.5">{product.name}</p>
      </div>
      <ProductForm initialData={initialData} />
    </div>
  );
}
