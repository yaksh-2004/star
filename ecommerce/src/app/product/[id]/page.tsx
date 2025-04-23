'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
    id: number;
    description: string;
    name: string;
    price: number;
    quantity: number;
    images: string[];
  }
   import { useParams } from 'next/navigation'


export default function ProductInfoPage() {
    const params = useParams()
    console.log(params.id);
    

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${params.id}`);
        const data = await res.json();
        console.log(data.data);
        
        if (res.ok) {
          setProduct(data.data);
        } else {
          alert('Failed to load product details');
        }
      } catch (err) {
        console.error(err);
       // alert('Error fetching product');
      }
    };
    fetchProduct();
  }, [params.id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ productId: product?.id, quantity });
    localStorage.setItem('cart', JSON.stringify(cart));


  };

  

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <img src={product.images[0]} alt={product.name} className="w-full h-80 object-cover rounded-lg mb-4" />
      <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
      <p className="text-gray-500 mb-4">{product.description}</p>
      <p className="text-xl font-bold mb-4">${product.price}</p>
      <div className="mb-4">
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-2 border rounded-md mt-1"
        />
      </div>
      <button
        onClick={addToCart}
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
     
    </div>
  );
}


