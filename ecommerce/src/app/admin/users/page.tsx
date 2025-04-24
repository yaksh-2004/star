"use client";
import { getAllUsers } from "@/lib/api";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<
    { id: string; name: string; email: string; role: string }[]
  >([]);
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
          // alert("Products loaded successfully");
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
          </li>
        ))}
      </ul>
    </div>
  );
}
