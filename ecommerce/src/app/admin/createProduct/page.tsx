"use client"
import { addProduct } from "@/lib/auth";
import Image from "next/image";
import { useState } from "react";
//import { useRouter } from "next/router";

export default function Admin() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [quantity, setQuantity] = useState("");
  //const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);

     const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviews]);
   };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc)
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    images.forEach(img => {
      formData.append("images", img);
    });

    try {
     await addProduct(formData)
  alert("Product created successfully");
     
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
    finally{
    setName("");
    setDesc("");
    setPrice("");
    setCategory("");
    setImages([]);
    setPreviewUrls([]);
    setQuantity("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-2 bg-white shadow-md rounded ">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
       <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded">
        <option value="">Select Category</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Beauty & Personal Care">Beauty & Personal Care</option>
        <option value="Sports & Outdoors">Sports & Outdoors</option>
        <option value="Books">Books</option>
        <option value="Toys & Games">Toys & Games</option>
        <option value="Footwear">Footwear</option>
        </select>

        <textarea
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
          <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />

        <div className="flex flex-wrap gap-4">
          {previewUrls.map((url, i) => (
            <div key={i} className="relative">
              <Image src={url} alt=""  width={500} height={500} className="w-24 h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-0 right-0 bg-red-600 text-white px-1 rounded-full"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
   
        >
          Create Product
        </button>
      </form>
    </div>
  );
}



