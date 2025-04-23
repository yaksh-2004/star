// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//    <>

//    <div className="flex flex-row gap-4 mr-0.5 ml-0.5 mt-0.5">
//    Home Page
//    <Link href={"/register"}>Register Page</Link>
//    <Link href={"/login"}>Login Page</Link>
//    </div>

//    </>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  description: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products");
        const data = await res.json();
        console.log(data.data);

        if (res.ok) {
          // alert("Products loaded successfully");
          setProducts(data.data);
        } else {
          alert("Failed to load products");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching products");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-white space-y-6">
      <div className="flex flex-row gap-4 mr-0.5 ml-0.5 mt-0.5">
        Home Page
        <Link href={"/register"}>Register Page</Link>
        <Link href={"/login"}>Login Page</Link>
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">
        Available Products
      </h1>
      <div className="flex flex-wrap gap-8 justify-start items-center">
        {products.map((product) => {
          return (
            <div key={product.id} className=" shadow-md rounded-lg p-4 w-[200px]">
              <div className="bg-gray-100 rounded-lg w-[100%]">
                <img
                  src={product?.images[0]}
                  alt={product.name}
                  className="w-[100%] h-40 object-cover rounded-lg mb-4"
                />
              </div>
              <div className="flex flex-col">
                {product.name}
                <span className="text-sm text-gray-500">{product.description}</span>
                <span className="text-sm text-gray-500">Quantity: {product.quantity}</span>
                <span className="text-lg font-semibold mt-2">
                Price: ${product.price}</span>
                <Link
                  href={`/product/${product.id}`}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg text-center"
                >
                  View Details
                </Link>
                
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
