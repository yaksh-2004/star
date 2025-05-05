
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type CartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  subtotal: number;
};



  

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const fetchCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCartItems(data.items);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    const token = getToken();
    if (!token) return;

    try {
      await fetch(`http://localhost:8000/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const removeItem = async (id: number) => {
    const token = getToken();
    if (!token) return;

    try {
      await fetch(`http://localhost:8000/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  useEffect(() => {
    fetchCart();
  }, []);
  console.log(cartItems);
  

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
   <div>
    <Link href="/" className="text-blue-500 hover:underline">
      Shop More
    </Link>
   </div>
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded mb-4"
            >
              <Image
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <h2 className="font-semibold">{item.name}</h2>
                <p>Price: ₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 text-sm mt-2"
                >
                  Remove
                </button>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">Total: ${subtotal}</h3>
            <button
              onClick={() => router.push("/checkout")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default CartPage;
