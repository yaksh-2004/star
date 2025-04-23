
import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setquantity] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);

  //   const newPreviews = files.map(file => URL.createObjectURL(file));
  //   setPreviewUrls(prev => [...prev, ...newPreviews]);
   };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    //setPreviewUrls(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", desc);
    // formData.append("price", price);

    // images.forEach(img => {
    //   formData.append("images", img);
    // });

    // create simple object
    const formData = {
      name,
      desc,
      price,
      images,
      quantity,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Product created!");
        router.push("/admin/dashboard");
      } else {
        alert(data.message || "Failed to create product");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded mt-10">
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
          onChange={e => setquantity(e.target.value)}
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
              <img src={url} className="w-24 h-24 object-cover rounded" />
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



