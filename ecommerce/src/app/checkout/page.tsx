// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// type CartItem = {
//   id: number;
//   image: string;
//   name: string;
//   price: number;
//   productId: number;
//   quantity: number;
//   subtotal: number;
// };

// export default function CheckoutPage() {
//   const router = useRouter();
//   //   const [cart, setCart] = useState<{ id: string; name: string; quantity: number; price: number }[]>([]);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [address, setAddress] = useState("");
//   const [token, setToken] = useState("");
//   console.log(cart);
  

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const savedToken = localStorage.getItem("token");
//     setCart(savedCart);
//     setToken(savedToken || "");
//   }, []);

//   const handleConfirmOrder = async () => {
//     const products = cart.map((item) => ({
//       productId: item.productId,
//       quantity: item.quantity,
//     }));
//     console.log(products);
    

//     const res = await fetch("http://localhost:8000/api/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ products, address }),
//     });

//     if (res.status === 200) {
//       localStorage.removeItem("cart");
//       router.push("/order-confirm");
//     } else {
//       alert("Order failed. Please try again.");
//     }
//   };
//   useEffect(() => {
//     const fetchCart = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const res = await fetch("http://localhost:8000/api/cart", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();

//         setCart(data.items);
//       } catch (err) {
//         console.error("Failed to fetch cart", err);
//       } finally {
//         console.log(cart);
//       }
//     };
//     fetchCart();
//   }, []);

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

//       <textarea
//         className="w-full p-2 border rounded mb-4"
//         placeholder="Enter your address..."
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />
//       {cart.map((item) => {
//         return (
//           <div
//             key={item.id}
//             className="flex items-center justify-between border p-4 rounded mb-4"
//           >
//             <div className="flex items-center">
//               {/* <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-16 h-16 mr-4"
//               /> */}
//               <div>
//                 <h2 className="text-lg font-semibold">{item.name}</h2>
//                 <p>Price: ${item.price}</p>
//                 <p>Quantity: {item.quantity}</p>
//                 <p>Subtotal: ${(item.price * item.quantity)}</p>
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       <div>
//         <div className="mt-4 font-bold text-lg">
//           Total: $
//           {cart
//             .reduce((acc, item) => acc + item.price * item.quantity, 0)
//             }
//         </div>
//       </div>

//       <button
//         onClick={handleConfirmOrder}
//         className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//       >
//         Confirm Order
//       </button>
//     </div>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type CartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  subtotal: number;
};

export default function CheckoutPage() {
  const router = useRouter();
  //   const [cart, setCart] = useState<{ id: string; name: string; quantity: number; price: number }[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [address, setAddress] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const savedToken = localStorage.getItem("token");
    setCart(savedCart);
    setToken(savedToken || "");
  }, []);

  const handleConfirmOrder = async () => {
    const products = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const res = await fetch("http://localhost:8000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ products, address }),
    });

    if (res.ok) {
      localStorage.removeItem("cart");
      router.push("/order-confirm");
    } else {
      alert("Order failed. Please try again.");
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/api/cart", {
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
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter your address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {cart.map((item) => {
        return (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded mb-4"
          >
            <div className="flex items-center">
              {/* <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 mr-4"
              /> */}
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
  );
}
