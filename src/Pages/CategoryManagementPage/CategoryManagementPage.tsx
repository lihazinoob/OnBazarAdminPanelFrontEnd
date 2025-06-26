import React from "react";

import {
  RiImageAddFill,
  RiDeleteBinLine,
  RiSave3Fill,
  RiEdit2Fill,
} from "react-icons/ri";

export default function CategoryManagementPage() {
  // state for user input related category information'
  const [categoryName, setCategoryName] = React.useState<string>("");
  const [categoryDescription, setCategoryDescription] =
    React.useState<string>("");
  const [categoryImage, setCategoryImage] = React.useState<File | null>(null);
  // state for preview of category image
  const [categoryImagePreview, setCategoryImagePreview] = React.useState<
    string | null
  >(null);
  // state for error messages
  const [error, setError] = React.useState<string | null>(null);
  // state for loading state
  const [loading, setLoading] = React.useState<boolean>(false);

  // state for categories list
  const [categories, setCategories] = React.useState([]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCategoryImage(file);
      setCategoryImagePreview(URL.createObjectURL(file));
    }
  };

  // Clean up preview URL to prevent memory leaks
  React.useEffect(() => {
    return () => {
      if (categoryImagePreview) {
        URL.revokeObjectURL(categoryImagePreview);
      }
    };
  }, [categoryImagePreview]);

  // Remove uploaded image
  const handleRemoveImage = () => {
    setCategoryImage(null);
    setCategoryImagePreview(null);
  };

  // Save new Category
  const handleSave = async () => {
    if (!categoryName || !categoryDescription || !categoryImage) {
      setError("Please fill all fields and select an image to upload.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // creating a formdata instance so that I can send it to the backend
      const formData = new FormData();
      formData.append("categoryName", categoryName);
      formData.append("categoryDescription", categoryDescription);
      formData.append("categoryImage", categoryImage);

      // Sending the data to the backend server
      const response = await fetch(
        "http://localhost:3000/api/uploadCategoryInformation",
        {
          method: "POST",
          body: formData,
        }
      );

      const newCategory = await response.json();
      console.log(newCategory);
      if (newCategory) {
        setCategories([...categories, newCategory]);
      }

      // after getting the data, all the input fields should be reset or cleared

      setCategoryName("");
      setCategoryDescription("");
      setCategoryImage(null);
      setCategoryImagePreview(null);
    } catch (error) {
      console.error("Error uploading category:", error);
      setError("Failed to upload category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // function to delete a category
  const handleDelete = async (id) => {
    try {
      // Simulated API call
      // await fetch(`https://your-api-endpoint/api/categories/${id}`, {
      //   method: "DELETE",
      // });
      setCategories(categories.filter((category) => category.id !== id));
    } catch (err) {
      setError("Failed to delete category.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6 sm:p-8 md:p-10">
        <div className="max-w-4xl">
          {/* Title */}
          <div className="text-2xl sm:text-3xl font-semibold text-indigo-800 animate-slideIn">
            Upload and Manage Product Categories
          </div>
          <p
            className="text-gray-500 mt-2 text-sm sm:text-base animate-slideIn"
            style={{ animationDelay: "100ms" }}
          >
            Add or update categories for your products with ease.
          </p>
          <hr
            className="border-t border-indigo-200 my-4 animate-slideIn"
            style={{ animationDelay: "200ms" }}
          />

          {/* Category Management Form */}
          <div
            className="bg-white p-6 rounded-lg shadow-md animate-slideIn"
            style={{ animationDelay: "300ms" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-2 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter category name"
                />
                <label className="block text-sm font-medium text-gray-700 mt-8">
                  Category Description
                </label>

                <textarea
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  rows={4}
                  className="mt-2 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter category description"
                />

                <div className="mt-4">
                  <label className="flex items-center justify-center w-full sm:w-64 px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-md cursor-pointer hover:bg-indigo-700 transition-all duration-200">
                    <RiImageAddFill size={24} className="mr-2" />
                    <span className="text-sm sm:text-base font-semibold">
                      Choose Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      aria-label="Upload category image"
                    />
                  </label>
                </div>
              </div>

              {/* Image preview*/}
              <div>
                <div className="relative w-full h-64 bg-gray-200 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={
                      categoryImagePreview ||
                      "https://via.placeholder.com/400x300.png?text=Category+Image+Placeholder"
                    }
                    alt="Category Image Preview"
                    className="w-full h-full object-cover"
                  />
                  {categoryImage && (
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                      aria-label="Remove image"
                    >
                      <RiDeleteBinLine size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Error message show */}
            {error && (
              <div
                className="mt-4 text-red-600 text-sm sm:text-base animate-slideIn"
                style={{ animationDelay: "400ms" }}
              >
                {error}
              </div>
            )}
            {/* Save button */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md font-semibold text-sm hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                <RiSave3Fill size={20} className="mr-2" />
                {loading ? "Saving..." : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
