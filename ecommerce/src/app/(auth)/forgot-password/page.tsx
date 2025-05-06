
"use client";
import { forgotPassword } from "@/lib/auth";
import { useState } from "react";
 export interface EmailObject {
  email: string;
}


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");

  const emailObject:EmailObject = {
    email:email
  }

  const handleSubmit = async () => {
    try {
      await forgotPassword(emailObject);
      alert("Reset link sent to your email");
    } catch {
      alert("Failed to send reset email");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 w-full mb-2 border-gray-800 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 w-full">
        Send Reset Link
      </button>
    </div>
  );
}
