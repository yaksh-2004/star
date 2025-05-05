
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home = () => {
  interface Product {
    id: string;
    name: string;
    price: number;
    images?: string[];
  }

  const [productData, setProductData] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    sortBy: "",
    order: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    search: "",
  });
  console.log(productData);
  

  const fetchAllProduct = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
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
    <div className="flex gap-8 px-4 py-10 max-w-[1440px] mx-auto min-h-screen">
     
      <aside className="w-[300px]  bg-white rounded-xl p-6 shadow-md border border-gray-200 sticky top-24 h-fit">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6"> Product Filters</h2>

        <div className="space-y-5">
      
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full p-2.5 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="w-full p-2.5 border rounded-lg text-sm border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Beauty & Personal Care">
                Beauty & Personal Care
              </option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Books">Books</option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Baby & Kids">Baby & Kids</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Price Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                className="w-1/2 p-2.5 border rounded-lg text-sm border-gray-300"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                className="w-1/2 p-2.5 border rounded-lg text-sm border-gray-300"
              />
            </div>
          </div>

  
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
              className="w-full p-2.5 border rounded-lg text-sm border-gray-300 bg-white"
            >
              <option value="">Select Option</option>
              <option value="price">Price</option>
              <option value="createdAt">Newest</option>
            </select>
          </div>

   
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Order
            </label>
            <select
              value={filters.order}
              onChange={(e) =>
                setFilters({ ...filters, order: e.target.value })
              }
              className="w-full p-2.5 border rounded-lg text-sm border-gray-300 bg-white"
            >
              <option value="">Select Filter</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          <button
            onClick={() =>
              setFilters({
                sortBy: "",
                order: "",
                minPrice: "",
                maxPrice: "",
                category: "",
                search: "",
              })
            }
            className="w-full mt-2 py-2.5 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-900 transition"
          >
            Clear All Filters
          </button>
        </div>
      </aside>

      <main className="flex-1">
        {productData.length === 0 ? (
          <p className="text-center text-xl font-semibold text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 m-10">
            {productData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden rounded-t-xl">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between h-[180px]">
                  <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="bg-green-100 text-green-700 font-medium px-3 py-1 text-sm rounded-full">
                      ${item.price}
                    </span>
                    <Link
                      href={`/product/${item.id}`}
                      className="text-blue-600 text-sm font-semibold hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
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
