

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { baseurl } from "@/lib/api";

type CartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  subtotal: number;
};
type productType = {
  product_id: number;
  quantity: number;
  
};
type productObjType = {
  products: productType[];
  address: string;
  city: string;
  pincode: number;
  
};


export default function CheckoutPage() {
  const router = useRouter();
  //   const [cart, setCart] = useState<{ id: string; name: string; quantity: number; price: number }[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [pincode, setPincode] = useState<number>(0);
  const [ ,setToken] = useState("");
  console.log(address);
  

  useEffect(() => {
   // const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const savedToken = localStorage.getItem("token");
    //setCart(savedCart);
    setToken(savedToken || "");
  }, []);
  const productarr:productType[] = cart.map((item) => ({
    product_id: item.productId,
    quantity: item.quantity,
  }));
  const productObj:productObjType={
    products: productarr,
    address: address,
    city: city,
    pincode: pincode,
  }
  console.log(productObj);

  const handleConfirmOrder = async () => {
 
    try{
      const res = await axios.post(`${baseurl}/orders`, productObj,{

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      
      });
      console.log(res.status);
      
  
      if (res.status === 201) {
  
        //localStorage.removeItem("cart");
        router.push("/order-confirm");
      } else {
        alert("Order failed. Please try again.");
      }

    }catch(err){
      console.error("Error placing order", err);
      alert("Order failed. Please try again.");
    }

 
  };
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${baseurl}/cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        setCart(data.items);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      } finally {
        console.log(cart);
      }
    };
    fetchCart();
  }, [cart]);

  return (
    <div className="p-6 max-w-2xl mx-auto h-screen">
 <div className="p-5 shadow-md rounded-lg bg-white">
      <h1 className="text-2xl font-semibold mb-4 mt-10">Checkout</h1>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Shipping Address
        </label>

      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter your address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <label className="block mb-2 text-sm font-medium text-gray-700">
        City
      </label>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter your city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Pin Code
      </label>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter your pin code..."
        value={pincode}
        onChange={(e) => setPincode(Number(e.target.value))}
      />

      </div>
   
      {cart.map((item) => {
        return (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded mb-4"
          >
            <div className="flex items-center">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="w-16 h-16 mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${(item.price * item.quantity)}</p>
              </div>
            </div>
          </div>
        );
      })}

      <div>
        <div className="mt-4 font-bold text-lg">
          Total: $
          {cart
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            }
        </div>
      </div>

      <button
        onClick={handleConfirmOrder}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Confirm Order
      </button>
    </div>
    </div>
   
  );
}




