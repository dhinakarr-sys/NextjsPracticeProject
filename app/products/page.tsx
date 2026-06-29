import ProductList from "@/components/ProductList";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

export default async function ProductsPage() {
  const response = await fetch(
    "https://fakestoreapi.com/products"
  );

  const products: Product[] = await response.json();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <ProductList products={products} />
    </div>
  );
}