// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function UsersPage() {
//   const [users, setUsers] = useState<
//     { id: number; name: string; email: string; role: string }[]
//   >([]);
//   const [search, setSearch] = useState<string>("");
//   console.log(users);
//   console.log(users);
  

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8000/api/admin/users",

//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
      

//         if (res.status === 200) {
      
//           setUsers(res.data);
//         } else {
//           alert("Failed to load Users");
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Error fetching Users");
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id: number) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:8000/api/admin/users/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       console.log(res);
      
//       if (res.status === 200) {
//         setUsers(users.filter((user) => Number(user.id) !== id));
//         alert("User deleted successfully");
//       } else {
//         alert("Failed to delete User");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting User");
//     }
//   }
  


//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">All Users</h1>
//       <input
//         type="text"
//         placeholder="Search by Name"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="border p-2 mb-4 rounded w-full"
//       />
//       <ul className="space-y-2">
//         {users.filter((value)=>search.toLowerCase()===""? value: value.name.startsWith(search)).map((user) => (
//           <li key={user.id} className="border p-3 rounded-md">
//             <p>
//               <b>Name:</b> {user.name}
//             </p>
//             <p>
//               <b>Email:</b> {user.email}
//             </p>
//             <p>
//               <b>Role:</b> {user.role}
//             </p>
//             <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(Number(user.id))}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}


const UserPage = () => {
  const [users, setUsers] = useState<User[]>([])
   const [search, setSearch] = useState<string>("");
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
    <div>
      User Dashboard
      <div className='mt-10 text-center bold text-2xl'>
        All Users
      </div>
      <input
        type="text"
        placeholder="Search by Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />
        <div>
        <table className='w-full border mt-5'>
          <thead>
            <tr className='bg-gray-200 '>
              <th className='p-2'>ID</th>
              <th className='p-2'>Name</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Role</th>
              <th className='p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter((value)=>search.toLowerCase()===""? value: value.name.startsWith(search)).map((user) => (
              <tr key={user.id} className='border-t text-center'>
                <td className='p-2'>{user.id}</td>
                <td className='p-2'>{user.name}</td>
                <td className='p-2'>{user.email}</td>
                <td className='p-2'>{user.role}</td>
                <td className='p-2'>
                  <button className='bg-blue-500 text-white px-3 py-1 rounded' onClick={() => handleDelete(Number(user.id))}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
        
      </div>
   
    
  )
}

export default UserPage