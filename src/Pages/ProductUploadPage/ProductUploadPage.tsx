import React, { useEffect, useState } from "react";
import {
  RiImageAddFill,
  RiDeleteBinLine,
  RiSave3Fill,
} from "react-icons/ri";

interface Category {
  id: number;
  category_name: string;
}

export default function ProductCreationPage() {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productImagePreviews, setProductImagePreviews] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [salesPercent, setSalesPercent] = useState<number | "">("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [quantity, setQuantity] = useState<number | "">("");
  const [colors, setColors] = useState<string[]>([""]);
  const [sizes, setSizes] = useState<string[]>([""]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://raw-node-js.onrender.com/api/fetchAllCategoryInformation");
        const data = await res.json();
        setCategories(data.categoryInformation);
      } catch (err) {
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // Clean up previews
  useEffect(() => {
    return () => {
      productImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [productImagePreviews]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...productImages, ...files];

    if (newFiles.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }

    setProductImages(newFiles);
    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setProductImagePreviews(previews);
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = productImages.filter((_, i) => i !== index);
    const updatedPreviews = productImagePreviews.filter((_, i) => i !== index);
    setProductImages(updatedFiles);
    setProductImagePreviews(updatedPreviews);
  };

  const handleArrayChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });
  };

  const addToArray = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeFromArray = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (
      productImages.length < 3 ||
      !productName ||
      !productDescription ||
      !price ||
      !quantity ||
      !selectedCategoryId
    ) {
      setError("Please fill all required fields and upload at least 3 images.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      productImages.forEach((file) => {
        formData.append("productImages", file);
      });

      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("price", price.toString());
      formData.append("salesPercent", salesPercent.toString());
      formData.append("isFeatured", isFeatured.toString());
      formData.append("isNew", isNew.toString());
      formData.append("isSoldOut", isSoldOut.toString());
      formData.append("quantity", quantity.toString());
      formData.append("colors", JSON.stringify(colors.filter((c) => c)));
      formData.append("sizes", JSON.stringify(sizes.filter((s) => s)));
      formData.append("categoryId", selectedCategoryId.toString());

      const response = await fetch("https://raw-node-js.onrender.com/api/uploadProductInformation", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      alert("Product created successfully");

      // Reset form
      setProductName("");
      setProductDescription("");
      setPrice("");
      setSalesPercent("");
      setQuantity("");
      setColors([""]);
      setSizes([""]);
      setIsFeatured(false);
      setIsNew(false);
      setIsSoldOut(false);
      setSelectedCategoryId(null);
      setProductImages([]);
      setProductImagePreviews([]);
    } catch (err) {
      setError("Failed to upload product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-indigo-800 mb-4">Create New Product</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side Inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 w-full border rounded px-4 py-2"
            />

            <label className="block text-sm font-medium mt-4 text-gray-700">Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={4}
              className="mt-1 w-full border rounded px-4 py-2"
            />

            <label className="block text-sm font-medium mt-4 text-gray-700">Price (USD)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1 w-full border rounded px-4 py-2"
            />

            <label className="block text-sm font-medium mt-4 text-gray-700">Sales Percentage</label>
            <input
              type="number"
              value={salesPercent}
              onChange={(e) => setSalesPercent(Number(e.target.value))}
              className="mt-1 w-full border rounded px-4 py-2"
            />

            <label className="block text-sm font-medium mt-4 text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 w-full border rounded px-4 py-2"
            />

            <label className="block text-sm font-medium mt-4 text-gray-700">Select Category</label>
            <select
              value={selectedCategoryId ?? ""}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
              className="mt-1 w-full border rounded px-4 py-2"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>

            {/* Checkboxes */}
            <div className="mt-4 space-y-2">
              <label className="block">
                <input type="checkbox" checked={isFeatured} onChange={() => setIsFeatured(!isFeatured)} /> Featured
              </label>
              <label className="block">
                <input type="checkbox" checked={isNew} onChange={() => setIsNew(!isNew)} /> New Product
              </label>
              <label className="block">
                <input type="checkbox" checked={isSoldOut} onChange={() => setIsSoldOut(!isSoldOut)} /> Sold Out
              </label>
            </div>
          </div>

          {/* Right Side Image Upload + Colors/Sizes */}
          <div>
            {/* Image Previews */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {productImagePreviews.map((preview, index) => (
                <div key={index} className="relative h-32 rounded overflow-hidden border">
                  <img src={preview} alt={`Preview ${index + 1}`} className="object-cover w-full h-full" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <RiDeleteBinLine size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Upload Button */}
            <label className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded shadow cursor-pointer w-full">
              <RiImageAddFill size={20} className="mr-2" />
              {productImages.length >= 5 ? "Max Images Reached" : "Upload Images"}
              <input
                type="file"
                multiple
                accept="image/*"
                disabled={productImages.length >= 5}
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {/* Colors */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Product Colors</label>
              {colors.map((color, index) => (
                <div key={index} className="flex mt-1">
                  <input
                    value={color}
                    onChange={(e) => handleArrayChange(index, e.target.value, setColors)}
                    className="flex-1 border px-2 py-1 rounded"
                    placeholder={`Color ${index + 1}`}
                  />
                  <button onClick={() => removeFromArray(index, setColors)} className="ml-2 text-red-500">✕</button>
                </div>
              ))}
              <button onClick={() => addToArray(setColors)} className="mt-2 text-indigo-600">+ Add Color</button>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Product Sizes</label>
              {sizes.map((size, index) => (
                <div key={index} className="flex mt-1">
                  <input
                    value={size}
                    onChange={(e) => handleArrayChange(index, e.target.value, setSizes)}
                    className="flex-1 border px-2 py-1 rounded"
                    placeholder={`Size ${index + 1}`}
                  />
                  <button onClick={() => removeFromArray(index, setSizes)} className="ml-2 text-red-500">✕</button>
                </div>
              ))}
              <button onClick={() => addToArray(setSizes)} className="mt-2 text-indigo-600">+ Add Size</button>
            </div>
          </div>
        </div>

        {/* Error and Submit */}
        {error && <p className="text-red-600 mt-4">{error}</p>}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg shadow font-semibold hover:bg-indigo-700 disabled:opacity-50"
            disabled={loading}
          >
            <RiSave3Fill size={20} className="mr-2" />
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
