import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm px-6 py-5">
        <h1 className="text-xl font-black text-soft-black">Add Product</h1>
        <p className="text-sm text-gray-400 mt-0.5">Create a new product listing</p>
      </div>
      <ProductForm />
    </div>
  );
}
