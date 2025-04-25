import React from "react";


type Order = {
    buyer:{
        id: number;
        name: string;
    };
    order_id: number;
    status: string;
    products: {
      product_id: number;
      name: string;
      quantity: number;
    }[];
  };
export default function OrderCard({ order }: { order: Order }) {
    console.log(order);
    
  return (
    <div className="border p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold">Order ID: {order.order_id}</h3>
      <p>Status: {order.status}</p>
      <ul className="mt-2 space-y-1">
        {order.products.map((product, i) => (
          <li key={i}>
            <strong>
            {product.name}
                </strong> × {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
