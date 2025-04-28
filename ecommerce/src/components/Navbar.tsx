
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}


const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  console.log(user);
  
useEffect(() => {
  const fetchUser = async() => {
    const res=await getUser();
    console.log(res.data);
    
    setUser(res.data);
  }
  fetchUser();
    
}, [])

    // Get user info from localStorage
  


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login"); // Redirect to signin page
  };
  const handleLogin = () => {
    router.push("/login");
  

  }
  return (
    <nav className="bg-gray-800 text-white px-6 py-2 flex justify-between items-center mb-4">
      <Link href="/" className="text-2xl font-bold">
       <img src="/logo.webp" alt="Logo" className="w-[70px] rounded-full" />
      </Link>

      <div className="flex gap-6 items-center">
        {user ? (
            <>
            <span className="font-semibold">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        
        ) : (
          <>
          <Link href="/register" className="hover:underline">
            Sign Up
          </Link>
          <Link href="/login" className="hover:underline">
            Sign In
          </Link>
         <button onClick={handleLogin}>
          Admin 
         </button>
        </>
        
        )}
      </div>
    </nav>
  );
};

export default Navbar;









