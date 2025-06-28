import { Link, useParams, useNavigate } from "react-router-dom";
import React from "react";
import {
  RiArrowLeftLine,
  RiImageAddFill,
  RiDeleteBinLine,
  RiSave3Fill
} from "react-icons/ri";

// interface for the data type of category
interface Category {
  id: number;
  created_at: string;
  category_name: string;
  category_description: string;
  category_image: string;
}

export default function CategoryUpdatepage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // state for user input related category information
  const [categoryName, setCategoryName] = React.useState<string>("");
  const [categoryDescription, setCategoryDescription] =
    React.useState<string>("");
  const [categoryImage, setCategoryImage] = React.useState<File | null>(null);

  // state for preview of category image
  const [categoryImagePreview, setCategoryImagePreview] = React.useState<
    string | null
  >(null);

  // state for current category data
  const [currentCategory, setCurrentCategory] = React.useState<Category | null>(
    null
  );

  //  state for error messages
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  // state for loading states
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchCategory = async () => {
      if (!id) {
        setError("Invalid category ID");
        setFetchLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `https://raw-node-js.onrender.com/api/fetchCategoryById/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch category data");
        }
        const data = await response.json();
        const category = data.categoryInformation;
        if (category) {
          setCurrentCategory(category);
          setCategoryName(category.category_name);
          setCategoryDescription(category.category_description);
          setCategoryImagePreview(category.category_image);
        } else {
          throw new Error("Category not found");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        setError("Failed to fetch category. Please try again.");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // Handle File Selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match(/image\/(jpeg|png|jpg)/)) {
        setError("Invalid file type. Please upload a JPG or PNG image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File size exceeds the limit of 5MB.");
        return;
      }
      setCategoryImage(file);
      setCategoryImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  // Clean up preview URL to prevent memory leaks
  React.useEffect(() => {
    return () => {
      if (categoryImagePreview && categoryImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(categoryImagePreview);
      }
    };
  }, [categoryImagePreview]);

  // Remove uploaded image
  const handleRemoveImage = () => {
    setCategoryImage(null);
    if (currentCategory) {
      setCategoryImagePreview(currentCategory.category_image);
    } else {
      setCategoryImagePreview(null);
    }
  };

  // Update the category information after form submission
  const handleUpdate = async () => {
    if (!categoryName || !categoryDescription || !categoryImage) {
      setError("Please fill all fields and select an image to upload.");
      return;
    }
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("categoryName", categoryName);
      formData.append("categoryDescription", categoryDescription);
      formData.append("categoryImage", categoryImage);

      const response = await fetch(
        `https://raw-node-js.onrender.com/api/updateCategoryInformation/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update category");
      }

      await response.json();
      setSuccess("Category updated successfully!");

      // Navigate back to category management page after a short delay
      setTimeout(() => {
        navigate("/cms/category");
      }, 2000);
    } catch (error) {
      console.error("Error updating category:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update category."
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading category data...</p>
        </div>
      </div>
    );
  }

  // Error state (category not found)
  if (error && !currentCategory) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <Link
            to="/cms/category"
            className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <RiArrowLeftLine className="mr-2" />
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6 sm:p-8 md:p-10">
        <div className="maz-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-2xl sm:text-3xl font-semibold text-indigo-800 animate-slideIn">
                Update Category
              </div>
              <p
                className="text-gray-500 mt-2 text-sm sm:text-base animate-slideIn"
                style={{ animationDelay: "100ms" }}
              >
                Update the category information and settings.
              </p>
            </div>
            <Link
              to="/cms/category"
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
            >
              <RiArrowLeftLine className="mr-2" />
              Back to Categories
            </Link>
          </div>
          <hr
            className="border-t border-indigo-200 my-4 animate-slideIn"
            style={{ animationDelay: "200ms" }}
          />
          {/* Form Section */}
          <div
            className="bg-white p-6 rounded-lg shadow-md animate-slideIn"
            style={{ animationDelay: "300ms" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-2 px-4 py-2 block w-full rounded-md border shadow-sm focus:ring-indigo-500"
                  placeholder="Enter category name"
                  maxLength={50}
                />

                <p className="mt-1 text-xs text-gray-500">
                  {categoryName.length}/50 characters
                </p>

                <label className="block text-sm font-medium text-gray-700 mt-6">
                  Category Description *
                </label>
                <textarea
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  rows={4}
                  className="mt-2 px-4 py-2 block w-full rounded-md border shadow-sm focus:ring-indigo-500"
                  placeholder="Enter category description"
                  maxLength={500}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {categoryDescription.length}/500 characters
                </p>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Image
                  </label>
                  <label className="flex items-center justify-center w-full sm:w-64 px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-md cursor-pointer hover:bg-indigo-700 transition-all duration-200">
                    <RiImageAddFill size={24} className="mr-2" />
                    <span className="text-sm sm:text-base font-semibold">
                      Upload New Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      aria-label="Upload Category Image"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Max file size: 5MB. Supported formats: JPG, PNG, JPEG.
                  </p>
                </div>
              </div>

              {/* Image Previews */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Image Preview
                </label>
                <div className="relative w-full h-64 bg-gray-200 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={
                      "https://via.placeholder.com/400x300.png?text=No+Image+Available"
                    }
                    alt="Category Image Preview"
                    className="w-full h-full object-cover"
                  />
                  {categoryImage && (
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                      aria-label="Remove new image"
                      title="Remove new image (restore original)"
                    >
                      <RiDeleteBinLine size={20} />
                    </button>
                  )}
                </div>
                {categoryImage && (
                  <p className="mt-2 text-sm text-green-600">
                    New image selected. Click save to apply changes.
                  </p>
                )}
              </div>
            </div>
            {/* Error and Success Messages */}
            {error && (
              <div
                className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md animate-slideIn"
                style={{ animationDelay: "400ms" }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className="mt-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md animate-slideIn"
                style={{ animationDelay: "400ms" }}
              >
                {success}
              </div>
            )}

            {/* Action Button */}
            <div className="mt-6 flex justify-end space-x-4">
              <Link
                to="/cms/category"
                className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md font-semibold text-sm hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleUpdate}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md font-semibold text-sm hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                <RiSave3Fill size={20} className="mr-2" />
                {loading ? "Updating..." : "Update Category"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
