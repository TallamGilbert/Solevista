import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";

const CATEGORY_STYLES: Record<string, string> = {
  MEN: "bg-blue-100 text-blue-700",
  WOMEN: "bg-pink-100 text-pink-700",
  SNEAKERS: "bg-purple-100 text-purple-700",
  SPORTS: "bg-orange-100 text-orange-700",
  CASUAL: "bg-green-100 text-green-700",
};

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { orderItems: true } },
    },
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-soft-black">Products</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-soft-black text-white text-sm font-bold hover:bg-accent hover:text-soft-black transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="px-6 py-14 text-center text-sm text-gray-400">
            No products yet.{" "}
            <Link href="/admin/products/new" className="text-accent font-semibold hover:underline">
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 w-12" />
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Price
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Stock
                  </th>
                  <th className="text-right px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-light-gray transition-colors">

                    {/* Thumbnail */}
                    <td className="pl-6 pr-2 py-3">
                      <div className="relative w-10 h-10 rounded-xl bg-light-gray overflow-hidden flex-shrink-0">
                        {product.images[0] && (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </td>

                    {/* Name + Brand */}
                    <td className="px-4 py-3">
                      <p className="font-semibold text-soft-black leading-tight">{product.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{product.brand}</p>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          CATEGORY_STYLES[product.category] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {product.category.charAt(0) + product.category.slice(1).toLowerCase()}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3">
                      <span className="font-semibold text-soft-black">
                        KSh {Math.round(product.price).toLocaleString()}
                      </span>
                      {product.comparePrice && product.comparePrice > product.price && (
                        <span className="text-xs text-gray-400 line-through ml-1.5">
                          KSh {Math.round(product.comparePrice).toLocaleString()}
                        </span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-3">
                      <span
                        className={`font-semibold ${
                          product.stock === 0
                            ? "text-red-500"
                            : product.stock < 10
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 rounded-xl text-gray-400 hover:text-soft-black hover:bg-light-gray transition-colors"
                          aria-label="Edit product"
                        >
                          <Pencil size={15} />
                        </Link>
                        <DeleteProductButton id={product.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
