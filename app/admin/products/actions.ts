"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be a positive number"),
  comparePrice: z.number().positive().optional(),
  brand: z.string().min(1, "Brand is required"),
  category: z.nativeEnum(Category),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  images: z.array(z.string().url("Each image must be a valid URL")).min(1, "At least one image is required"),
  sizes: z.array(
    z.object({
      label: z.string().min(1, "Size label is required"),
      stock: z.number().int().min(0),
    })
  ),
});

type ProductInput = z.infer<typeof productSchema>;

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }
}

export async function createProduct(data: ProductInput) {
  await requireAdmin();

  const parsed = productSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { sizes, ...product } = parsed.data;

  const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
  if (existing) {
    return { error: { slug: ["This slug is already taken"] } };
  }

  await prisma.product.create({
    data: { ...product, sizes: { create: sizes } },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function updateProduct(id: string, data: ProductInput) {
  await requireAdmin();

  const parsed = productSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { sizes, ...product } = parsed.data;

  const slugConflict = await prisma.product.findFirst({
    where: { slug: product.slug, NOT: { id } },
  });
  if (slugConflict) {
    return { error: { slug: ["This slug is already taken"] } };
  }

  await prisma.$transaction([
    prisma.size.deleteMany({ where: { productId: id } }),
    prisma.product.update({
      where: { id },
      data: { ...product, sizes: { create: sizes } },
    }),
  ]);

  revalidatePath("/admin/products");
  revalidatePath(`/shop/${product.slug}`);
  redirect("/admin/products");
}

export async function deleteProduct(id: string): Promise<void> {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}
