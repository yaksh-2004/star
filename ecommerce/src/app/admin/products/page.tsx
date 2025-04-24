"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct, getAllProducts } from "@/lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<{ id: number; name: string; price: number; images: string[] }[]>([]);
  const router = useRouter();
  console.log(products);
  

  useEffect(() => {
    getAllProducts().then(res=> setProducts(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    const res=await deleteProduct(id);
    if(res===200){
        await getAllProducts().then(res=> setProducts(res.data));
    }
    // setProducts(products.filter((p: any) => p.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Product Management</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="border p-3 rounded-md flex justify-between"
          >
            <div>
              <p>
                <p>
                     <b>
                        Image:<img src={product.images[0]} alt={product.name} width={50} height={50} />
                     </b>
                     
                </p>
                <b>Name:</b> {product.name}
              </p>
              <p>
                <b>Price:</b> ${product.price}
              </p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() =>
                  router.push(`/admin/products/edit/${product.id}`)
                }
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
