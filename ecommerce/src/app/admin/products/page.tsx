// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { deleteProduct, getAllProducts } from "@/lib/api";

// export default function AdminProductsPage() {
//   const [products, setProducts] = useState<{ id: number; name: string; price: number; images: string[] }[]>([]);
//   const router = useRouter();
//   console.log(products);
  

//   useEffect(() => {
//     getAllProducts().then(res=> setProducts(res.data));
//   }, []);

//   const handleDelete = async (id: number) => {
//     const res=await deleteProduct(id);
//     if(res===200){
//         await getAllProducts().then(res=> setProducts(res.data));
//     }
//     // setProducts(products.filter((p: any) => p.id !== id));
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Product Management</h1>
//       <ul className="space-y-4">
//         {products.map((product) => (
//           <li
//             key={product.id}
//             className="border p-3 rounded-md flex justify-between"
//           >
//             <div>
//               <p>
//                 <p>
//                      <b>
//                         Image:<img src={product.images[0]} alt={product.name} width={50} height={50} />
//                      </b>
                     
//                 </p>
//                 <b>Name:</b> {product.name}
//               </p>
//               <p>
//                 <b>Price:</b> ${product.price}
//               </p>
//             </div>
//             <div className="space-x-2">
//               <button
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//                 onClick={() =>
//                   router.push(`/admin/products/edit/${product.id}`)
//                 }
//               >
//                 Edit
//               </button>
//               <button
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//                 onClick={() => handleDelete(product.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }









"use client";

import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products");
      const data = await res.json();
      setProducts(data.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.status === 200) {

        setProducts(products.filter((product) => product.id !== id));
        alert("Product deleted successfully");
        // const res = await fetchProducts();
        // setProducts(res.data);
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;
    try {
      const res = await fetch(`http://localhost:8000/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          price: editingProduct.price,
          quantity: editingProduct.quantity,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        alert("Product updated successfully");
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert(data.message || "Failed to update");
      }
    } catch (err) {
      console.error("Update error", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-2">{product.name}</td>
              <td className="p-2">
                {editingProduct?.id === product.id ? (
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                    }
                    className="border px-2 py-1 w-20"
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td className="p-2">
                {editingProduct?.id === product.id ? (
                  <input
                    type="number"
                    value={editingProduct.quantity}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, quantity: parseInt(e.target.value) })
                    }
                    className="border px-2 py-1 w-20"
                  />
                ) : (
                  product.quantity
                )}
              </td>
              <td className="p-2 space-x-2">
                {editingProduct?.id === product.id ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}