import axios from "axios";
import { log } from "console";


 const api = axios.create({
    baseURL: "http://localhost:8000/api",
    
})
export const addToCart = async (productId: number, quantity: number) => {
  return api.post("/cart", { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

};

export const getCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token not found");
    }
    const res = await api.get("/cart", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
 
  return res.data;
};
export const getBuyerOrders = async (token: string) => {
    const res = await fetch(`http://localhost:8000/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error("Failed to fetch orders");
  
    return res.json();
  };
  




export async function getAllOrders() {
      const res = await fetch('http://localhost:8000/api/orders', { cache: 'no-store' });
    
      return res.json();
    }
    
    export async function getAllUsers() {
      const res = await fetch('http://localhost:8000/api/admin/users', { cache: 'no-store' });
      const data = await res.json();
      console.log(data);
      
      console.log(data);
      
      return data
    }
    export async function getAllProducts() {
      const res = await fetch('http://localhost:8000/api/products', { cache: 'no-store' });
      return res.json();
    }
    
    export async function deleteProduct(id: number) {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE'
      });
      return res.json();
    }
    
    export async function getProductById(id: number) {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, { cache: 'no-store' });
      return res.json();
    }
    
    export async function updateProduct(id: number, data:FormData) {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      return res.json();
    }
    
    
export default api;
