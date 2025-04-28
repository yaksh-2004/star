// // "use client";
// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { deleteProduct, getAllProducts } from "@/lib/api";

// // export default function AdminProductsPage() {
// //   const [products, setProducts] = useState<{ id: number; name: string; price: number; images: string[] }[]>([]);
// //   const router = useRouter();
// //   console.log(products);
  

// //   useEffect(() => {
// //     getAllProducts().then(res=> setProducts(res.data));
// //   }, []);

// //   const handleDelete = async (id: number) => {
// //     const res=await deleteProduct(id);
// //     if(res===200){
// //         await getAllProducts().then(res=> setProducts(res.data));
// //     }
// //     // setProducts(products.filter((p: any) => p.id !== id));
// //   };

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-xl font-bold mb-4">Product Management</h1>
// //       <ul className="space-y-4">
// //         {products.map((product) => (
// //           <li
// //             key={product.id}
// //             className="border p-3 rounded-md flex justify-between"
// //           >
// //             <div>
// //               <p>
// //                 <p>
// //                      <b>
// //                         Image:<img src={product.images[0]} alt={product.name} width={50} height={50} />
// //                      </b>
                     
// //                 </p>
// //                 <b>Name:</b> {product.name}
// //               </p>
// //               <p>
// //                 <b>Price:</b> ${product.price}
// //               </p>
// //             </div>
// //             <div className="space-x-2">
// //               <button
// //                 className="bg-blue-500 text-white px-3 py-1 rounded"
// //                 onClick={() =>
// //                   router.push(`/admin/products/edit/${product.id}`)
// //                 }
// //               >
// //                 Edit
// //               </button>
// //               <button
// //                 className="bg-red-500 text-white px-3 py-1 rounded"
// //                 onClick={() => handleDelete(product.id)}
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }









// "use client";

// import React, { useEffect, useState } from "react";

// interface Order {
//   Order_id: number;
//   status: string;
//  buyer:{
//     id: number;
//     name: string;
//  },
//  products:{
//     product_id: number;
//     name: string;
//     quantity: number;
//   }[]
//  }



// export default function AllProductsPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [editingOrder, setEditingOrder] = useState<Order | null>(null);

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
//   console.log(orders);
  

//   const fetchOrder = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/orders");
//       const data = await res.json();
//       setOrders(data.data);
//     } catch (err) {
//       console.error("Failed to fetch orders", err);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const res = await fetch(`http://localhost:8000/api/orders/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       if (res.status === 200) {

//         setOrders(orders.filter((order) => order.Order_id !== id));
//         alert("Order deleted successfully");
//         // const res = await fetchProducts();
//         // setProducts(res.data);
//       } else {
//         alert(data.message || "Failed to delete");
//       }
//     } catch (err) {
//       console.error("Delete error", err);
//     }
//   };

  

//   useEffect(() => {
//     fetchOrder();
//   }, []);
//   console.log(orders);
  

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">All Products</h1>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="p-2">OrderId</th>
//             <th className="p-2">BuyerId</th>
//             <th className="p-2">Buyer_Name</th>
//             <th className="p-2">Product_Name</th>
//             <th className="p-2">Quantity</th>
//             <th className="p-2">Status</th>

//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.Order_id} className="border-t">
//               <td className="p-2">{order.buyer.name}</td>
//               <td className="p-2">
//                 {editingOrder?.Order_id === order.Order_id ? (
//                   <input
//                     type="number"
//                     value={editingOrder.buyer.id}
//                     onChange={(e) =>
//                       setEditingOrder({ ...editingOrder, buyer.id: parseFloat(e.target.value) })
//                     }
//                     className="border px-2 py-1 w-20"
//                   />
//                 ) : (
//                   `$${order.price}`
//                 )}
//               </td>
//               <td className="p-2">
//                 {editingOrder?.id === order.id ? (
//                   <input
//                     type="number"
//                     value={editingOrder.quantity}
//                     onChange={(e) =>
//                       setEditingOrder({ ...editingOrder, quantity: parseInt(e.target.value) })
//                     }
//                     className="border px-2 py-1 w-20"
//                   />
//                 ) : (
//                   order.quantity
//                 )}
//               </td>
//               <td className="p-2 space-x-2">
//                 {editingOrder?.id === order.id ? (
//                   <>
//                     {/* <button
//                       onClick={handleUpdate}
//                       className="bg-green-500 text-white px-3 py-1 rounded"
//                     >
//                       Save
//                     </button> */}
//                     <button
//                       onClick={() => setEditingOrder(null)}
//                       className="bg-gray-400 text-white px-3 py-1 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => setEditingOrder(order)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(order.id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }