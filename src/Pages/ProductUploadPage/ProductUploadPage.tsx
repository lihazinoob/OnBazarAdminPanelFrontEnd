interface CategoryInformationforProduct {
  id: number;
  category_name: string;
}

import React from "react";

export default function ProductUploadPage() {
  // state to hold category information
  const [categoryInformation, setCategoryInformation] = React.useState<
    CategoryInformationforProduct[]
  >([]);

  // on mount fetch the category information
  React.useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(
          "https://raw-node-js.onrender.com/api/fetchAllCategoryInformation"
        );
        const data = await response.json();
        setCategoryInformation(data.categoryInformation);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchCategoryData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8 md:p-10">
      <div className="max-w-4xl">
        {/* Title */}
        <div className="text-2xl sm:text-3xl font-semibold text-indigo-800 animate-slideIn">
          Upload and Manage Products
        </div>
        {/* Subtitle */}
        <p
          className="text-gray-500 mt-2 text-sm sm:text-base animate-slideIn"
          style={{ animationDelay: "100ms" }}
        >
          Add or update your products
        </p>
        <hr
          className="border-t border-indigo-200 my-4 animate-slideIn"
          style={{ animationDelay: "200ms" }}
        />
      </div>
    </div>
  );
}
