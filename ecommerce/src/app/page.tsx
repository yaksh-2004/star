
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [productData, setProductData] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    sortBy: "",
    order: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    search: "",
  });

  const fetchAllProduct = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const res = await axios.get(
        `http://localhost:8000/api/product-filters?${queryParams.toString()}`
      );

      setProductData(res.data.products || res.data.data);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, [filters]);

  return (
    <div className="flex justify-start mx-auto min-h-screen py-8 px-4 gap-8 mt-16 max-w-[1440px]">
    
      <aside className="w-[300px] bg-white rounded-xl p-6 h-fit sticky top-24 shadow-md border border-gray-100">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Filters</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full mb-6 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />

       
        <div className="mb-6">
          <label className="text-gray-700 font-semibold mb-3 block">
            Categories
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All Categories</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Beauty & Personal Care">Beauty & Personal Care</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Books">Books</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Baby & Kids">Baby & Kids</option>
            <option value="Footwear">Footwear</option>
          </select>
        </div>

   
        <div className="mb-6">
          <label className="text-gray-700 font-semibold mb-3 block">
            Price Range
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="w-1/2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="w-1/2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>


        <div className="mb-6">
          <label className="text-gray-700 font-semibold mb-3 block">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select Option</option>
            <option value="price">Price</option>
            <option value="createdAt">Newest</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="text-gray-700 font-semibold mb-3 block">Order</label>
          <select
            value={filters.order}
            onChange={(e) => setFilters({ ...filters, order: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <button
          onClick={() => setFilters({
            sortBy: "",
            order: "",
            minPrice: "",
            maxPrice: "",
            category: "",
            search: "",
          })}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg transition-all font-semibold"
        >
          Clear Filters
        </button>
      </aside>

     
      <main className="flex-1">
        {productData.length === 0 ? (
          <p className="text-center text-xl font-semibold text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-full w-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 min-h-[56px]">
                    {item.name}
                  </h2>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-bold text-gray-900">${item.price}</p>
                  </div>
                  <Link
                    href={`/product/${item.id}`}
                    className="mt-4 block text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
