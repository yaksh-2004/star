
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getUser } from "@/lib/api";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }


// const Navbar = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();
//   console.log(user);
  
// useEffect(() => {
//   const fetchUser = async() => {
//     const res=await getUser();
//     console.log(res.data);
    
//     setUser(res.data);
//   }
//   fetchUser();
    
// }, [])

//     // Get user info from localStorage
  


//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     router.push("/login"); // Redirect to signin page
//   };
//   const handleLogin = () => {
//     router.push("/login");
  

//   }
//   return (
//     <nav className="bg-gray-800 text-white px-6 py-2 flex justify-between items-center mb-4">
//       <Link href="/" className="text-2xl font-bold">
//        <img src="/logo.webp" alt="Logo" className="w-[70px] rounded-full" />
//       </Link>

//       <div className="flex gap-6 items-center">
//         {user ? (
//             <>
//             <span className="font-semibold">Hi, {user.name}</span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </>
        
//         ) : (
//           <>
//           <Link href="/register" className="hover:underline">
//             Sign Up
//           </Link>
//           <Link href="/login" className="hover:underline">
//             Sign In
//           </Link>
//          <button onClick={handleLogin}>
//           Admin 
//          </button>
//         </>
        
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






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
  
  useEffect(() => {
    const fetchUser = async() => {
      const res = await getUser();
      setUser(res.data);
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
    
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center hover:opacity-90 transition-opacity"
            >
              <img 
                src="/logo.webp" 
                alt="Logo" 
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="ml-3 text-xl font-semibold text-gray-800 hidden sm:block">
                CartVerse
              </span>
            </Link>
          </div>

     
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user.name[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/register"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <button
                  onClick={handleLogin}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Admin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




