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
  //const [loading, setLoading] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  
  console.log(orderStatus);

  
  const fetchOrders = async () => {
    try {
      //setLoading(true);
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const editOrder = (id: number, status: string) => {
    setOrderId(id);
    setOrderStatus(status);
  };
  const updateStatus = async () => {
    const orderState = {
      status: orderStatus,
    }
    try {
      const response = await axios.put(
        `http://localhost:8000/api/orders/${orderId}/status`,orderState,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.status);

      if (response.status === 200) {
        alert("Status updated successfully for order ID: " + orderId);
        fetchOrders();
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Orders</h1>
      <input
        type="text"
        placeholder="Search by Status"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded m-2"
      />

      <select
        name=""
        id=""
        value={orderStatus}
        onChange={(e) => setOrderStatus(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">None</option>
        <option value="PENDING"> PENDING</option>
        <option value="PROCESSING">PROCESSING</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
      <button 
        onClick={() => updateStatus()}
        className="bg-blue-500 text-white px-4 py-2 rounded m-2"
      >
        Add
      </button>
      {false ? (
        <p>Loading orders...</p>
      ) : (
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
            {orders.filter((value)=>search.toLowerCase()===""? value: value.status.startsWith(search)).map((order) =>
              order.products.map((product) => (
                <tr key={order.order_id} className="text-center">
                  <td className="border px-3 py-1">{order.order_id}</td>
                  <td className="border px-3 py-1">{order.buyer.name}</td>
                  <td className="border px-3 py-1">{product.product_id}</td>
                  <td className="border px-3 py-1">{product.name}</td>
                  <td className="border px-3 py-1">{order.status}</td>
                  <td className="border px-3 py-1 space-x-2">
                    <button 
                      onClick={() => editOrder(order.order_id, order.status)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-red-600 "
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteOrder(order.order_id)}
                      className=" bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
      )}
    </div>
  );
};

export default AllOrdersPage;




