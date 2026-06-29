type Product = {
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
};

export default async function AdminProductsPage() {
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  const products: Product[] = await response.json();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin Products
      </h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3">Title</th>
            <th className="border p-3">Price</th>
            <th className="border p-3">Category</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="border p-3">
                {product.title}
              </td>

              <td className="border p-3">
                ${product.price}
              </td>

              <td className="border p-3">
                {product.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}