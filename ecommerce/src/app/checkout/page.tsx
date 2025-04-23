'use client';

import { useEffect, useState } from 'react';
//import { useRouter } from 'next/navigation';

interface CartItem {
  productId: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  //const router = useRouter();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);

    const fetchProducts = async () => {
      const productIds = cartData.map((item: CartItem) => item.productId);
      const res = await fetch('/api/cart');
      const data = await res.json();
      const filteredProducts = data.filter((product: Product) =>
        productIds.includes(product.id)
      );
      setProducts(filteredProducts);
    };

    fetchProducts();
  }, [cart]);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in first');

    const orderData = {
      products: cart.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity
      })),
      address: '123 Sample Street, City, Country' 
    };

    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    const data = await res.json();
    if (res.ok) {
      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      //router.push('/buyer/dashboard');
    } else {
      alert(data.message || 'Error placing order');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-semibold text-center mb-6">Checkout</h1>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex justify-between p-4 border-b">
            <span>{product.name}</span>
            <span>${product.price}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
