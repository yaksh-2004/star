
"use client";

import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category:string;
  images: string[];
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState<string>("");

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
    console.log(id);
    
    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.status=== 200) {

        setProducts(products.filter((product) => Number(product.id) !== id));
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
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by product name"
        className="border p-2 mb-4 w-full" 
      />
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Category</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.filter((value)=>search.toLowerCase()===""? value: value.name.startsWith(search)).map((product) => (
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
              <td className="p-2">{product.category}</td>
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