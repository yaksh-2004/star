"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { redirect } from "next/navigation";
import { RegisterTypes } from "@/type";
import { RegisterUser } from "@/lib/auth";


export default function Register() {
  const [formData, setFormData] = useState<RegisterTypes>({
    name: "",
    email: "",
    password: "",
    role: "Buyer",
  });

  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState("");
  // const [role, setRole] = useState('Buyer')
  const [error, setError] = useState("");
  console.log(formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (formData.password.length < 8) {
      setError("password must be 8 characters long");
      return;
    }
    if (formData.password !== confirmpassword) {
      setError("password and confirm password must be same");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Email address is not correct");
      return;
    }

    if (!/[!@#$%^&*()<>,."]/.test(formData.password)) {
      setError("password must contain special character");
      return;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError("password must contain capital latter");
      return;
    }


    try {
      await RegisterUser(formData);
      alert("Registration successful");
    }
  
     catch (err) {
      alert("Registration failed");
      console.log(err);
    }
    redirect("/login");
  };

 

  return (
    <div className="bg-gradient-to-t from-white py-6 pb-20">
      <div className=" w-[450px] max-sm:w-[300px] max-sm:pt-3 max-sm:my-4 m-auto px-10 my-10 bg-white py-8 shadow-lg shadow-neutral-500 rounded-xl">
        <h2 className="text-3xl pb-4 text-blue-500">Sign Up</h2>

        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="py-2 px-2 border border-gray-300"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            required
            className="py-2 px-2 border border-gray-300"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="py-2 px-2 border border-gray-300"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Comfirm password"
            required
            className="py-2 px-2 border border-gray-300"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmpassword(e.target.value);
            }}
          />
          <select
            className="py-2.5 px-2 border border-gray-300"
            value={formData.role}
            name="role"
            required
            onChange={handleChange}
          >
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
            <option value="ADMIN">Admin</option>
          </select>

          {error && <p className="text-red-500">{error}</p>}

          <button className="bg-blue-600 text-white px-5 my-1 py-2 rounded-lg w-full m-auto hover:bg-blue-700">
            Submit
          </button>
        </form>

        <div className="text-center mt-4">
          <span>already have an account ? </span>
          <Link href="/login" className="text-blue-500">
            login
          </Link>
        </div>
      </div>
    </div>
  );
}