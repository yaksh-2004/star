"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/auth"


export interface ResetPasswordTypes {
  newPassword: string;
  confirmPassword: string;
}


 export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const router=useRouter();

  const tokenFromURL = searchParams.get("token");
  useEffect(() => {
    if (tokenFromURL){
      localStorage.setItem("token", tokenFromURL);
    }
  }, [searchParams]);

  const resetPasswordObj={
    newPassword:password,
    confirmPassword:confirmPassword,
  }

  const handleReset = async () => {
    try {
      await resetPassword(resetPasswordObj);
      alert("Password reset successful");
      router.push("/login");
      
    } catch {
      alert("Failed to reset password");
    }
  };

  return (
     <div className="p-4 max-w-md mx-auto">
    
    <h2 className="text-xl font-bold mb-4">Reset Password</h2>
    <input
      type="password"
      placeholder="Enter new password"
      className="border p-2 w-full mb-2 border-gray-800 rounded"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <input
      type="password"
      placeholder="Confirm Password"
      className="border p-2 w-full mb-2 border-gray-800 rounded"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />
    <button onClick={handleReset} className="bg-blue-500 text-white p-2 w-full">
      Reset Password
    </button>
      </div>

  );
}