"use client"
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";



export default function ConditionalNavbar() {
const pathname=usePathname();
if(pathname.startsWith("/admin")){
  return <Navbar/>
}

  if(pathname.startsWith("/login")){
    return null;
  }
  if(pathname.startsWith("/login")){
    return null;
  }
    if(pathname.startsWith("/register")){
       
        return null;
    }
    if(pathname.startsWith("/forgot-password")){
        return null;
    }
    if(pathname.startsWith("/reset-password")){
        return null;
    }
  
}
