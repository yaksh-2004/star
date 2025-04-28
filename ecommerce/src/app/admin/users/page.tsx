"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<
    { id: number; name: string; email: string; role: string }[]
  >([]);
  console.log(users);
  console.log(users);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/admin/users",

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      

        if (res.status === 200) {
      
          setUsers(res.data);
        } else {
          alert("Failed to load Users");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching Users");
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      
      if (res.status === 200) {
        setUsers(users.filter((user) => Number(user.id) !== id));
        alert("User deleted successfully");
      } else {
        alert("Failed to delete User");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting User");
    }
  }


  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border p-3 rounded-md">
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
            <p>
              <b>Role:</b> {user.role}
            </p>
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(Number(user.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
