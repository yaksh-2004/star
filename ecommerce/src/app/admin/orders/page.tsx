
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  order_id: number;
  status: string;
  buyer: {
    id: number;
    name: string;
  };
  products: {
    product_id: number;
    name: string;
    quantity: number;
  }[];
}

const AllOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState<string>("");
  const [editingStatus, setEditingStatus] = useState<Order | null>(null);


  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders((prev) => prev.filter((order) => order.order_id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // const editOrderStatus = (orderId: number, newStatus: string) => {
  //   setEditingStatus((prev) => ({
  //     ...prev,
  //     [orderId]: newStatus,
  //   }));
  // };

  const updateStatus = async (orderId: number) => {
    const status = {
      status: editingStatus?.status || "PENDING",
    }
    try {
      const response = await axios.put(
        `http://localhost:8000/api/orders/${orderId}/status`,
         status ,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert(`Order ${orderId} status updated successfully.`);
        fetchOrders();
        // setEditingStatus((prev) => {
        //   const updated = { ...prev };
        //   delete updated[orderId];
        //   return updated;
        // });
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
    finally{
      setEditingStatus(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Orders</h1>

      <input
        type="text"
        placeholder="Search by Status or Order ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded m-2"
      />

      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">ORDER_ID</th>
            <th className="border px-3 py-2">Buyer</th>
            <th className="border px-3 py-2">Product_ID</th>
            <th className="border px-3 py-2">Product_Name</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((order) =>
              search === "" ? true : (
                order.status.toLowerCase().startsWith(search.toLowerCase()) || 
                order.order_id.toString().startsWith(search.toLowerCase())
              )
            )
            .map((order) =>
              order.products.map((product, index) => (
                <tr key={`${order.order_id}-${index}`} className="text-center">
                  <td className="border px-3 py-1">{order.order_id}</td>
                  <td className="border px-3 py-1">{order.buyer.name}</td>
                  <td className="border px-3 py-1">{product.product_id}</td>
                  <td className="border px-3 py-1">{product.name}</td>
                  {editingStatus?.order_id===order.order_id ? <td className="border px-3 py-1">
                   <select
                      value={editingStatus.status}
                      onChange={(e) => setEditingStatus({...editingStatus, status: e.target.value})}
                      className="border p-1 rounded"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  :
                  <td className="border px-3 py-1">{order.status}</td>
                  }
                  <td className="border px-3 py-1 space-x-2">
                 {editingStatus?.order_id===order.order_id ? 
                    <button
                      onClick={() => updateStatus(order.order_id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Update
                    </button>
                  
                   
                    :
                   
                    <button
                      onClick={() => setEditingStatus(order)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                    Edit
                    </button>
                    
                  }
                    
                    <button
                      onClick={() => deleteOrder(order.order_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrdersPage;

