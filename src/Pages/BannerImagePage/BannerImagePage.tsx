import { useState, useEffect } from "react";
import { RiImageAddFill, RiDeleteBinLine,RiSave3Fill } from "react-icons/ri";

export default function BannerImagePage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Clean up preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Remove uploaded image
  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8 md:p-10">
      <div className="max-w-4xl">
        {/* Title */}
        <div className="text-2xl sm:text-3xl font-semibold text-indigo-800 animate-slideIn">
          Upload and Manage Banner Images
        </div>
        <p
          className="text-gray-500 mt-2 text-sm sm:text-base animate-slideIn"
          style={{ animationDelay: "100ms" }}
        >
          Add or update banner images for your homepage with ease.
        </p>
        <hr
          className="border-t border-indigo-200 my-4 animate-slideIn"
          style={{ animationDelay: "200ms" }}
        />

        {/* Image Preview */}
        <div
          className="mt-8 animate-slideIn"
          style={{ animationDelay: "300ms" }}
        >
          <div className="relative w-full h-96 bg-gray-200 rounded-lg shadow-md overflow-hidden">
            <img
              src={
                previewUrl ||
                "https://via.placeholder.com/800x400.png?text=Banner+Image+Placeholder"
              }
              alt="Banner Preview"
              className="w-full h-full object-cover"
            />
            {imageFile && (
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

        {/* File Input */}
        <div
          className="mt-6 animate-slideIn"
          style={{ animationDelay: "400ms" }}
        >
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
              aria-label="Upload banner image"
            />
          </label>
        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <button
          type="button"
        
          className="flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-indigo-600 text-white rounded-lg shadow-md font-lufga font-semibold text-sm sm:text-base hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95 transition-all duration-200 animate-slideIn cursor-pointer"
          style={{ animationDelay: "500ms" }}
          aria-label="Save changes"
        >
          <RiSave3Fill size={20} className="mr-2" />
          Save
        </button>
      </div>
    </div>
  );
}
