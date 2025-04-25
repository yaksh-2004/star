"use client";

import React, { useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard";
import { getBuyerOrders } from "@/lib/api";

export default function BuyerDashboard() {
  type Order = {
    buyer: {
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      try {
        const data = (await getBuyerOrders(token)).map((order: any) => ({
          ...order,
          order_id: Number(order.order_id),
        }));
        setOrders(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading)
    return <p className="text-center mt-8">Loading your orders...</p>;
  console.log(orders[0].buyer.name);

  return (
    <div >
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4 mt-0.5 float-right">
          User:{orders[0].buyer.name}
        </h2>
        <h1 className="text-2xl font-bold mb-20 text-center ">
          User Dashboard
        </h1>
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        <div className="space-y-7">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.order_id} order={order} />
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
