import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const response = await fetch(
    `https://fakestoreapi.com/products/${id}`
  );

  const product: Product = await response.json();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-10">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="w-full h-96 object-contain"
        />

        <div>
          <h1 className="text-3xl font-bold">
            {product.title}
          </h1>

          <p className="mt-4 text-gray-600">
            {product.description}
          </p>

          <p className="mt-4 text-lg">
            Category:
            <span className="font-semibold">
              {" "}
              {product.category}
            </span>
          </p>

          <p className="mt-6 text-2xl font-bold text-blue-600">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
}