import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { RiImageAddFill, RiFileAddFill } from "react-icons/ri";
import { FaBox } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

export default function ProductManagementPage() {
  const [activeMenu, setActiveMenu] = useState<string | null>("banner");

  const menuItems = [
    {
      id: "banner",
      label: "Banner Image",
      icon: <RiImageAddFill size={24} />,
      description: "Manage homepage banner images",
      path: "/cms/banner",
    },
    {
      id: "product",
      label: "Product Upload",
      icon: <FaBox size={24} />,
      description: "Upload and edit products",
      path: "/cms/product",
    },
    {
      id: "category",
      label: "Category Management",
      icon: <MdCategory size={24} />,
      description: "Organize product categories",
      path: "/cms/category",
    },
    {
      id: "content",
      label: "Content Settings",
      icon: <RiFileAddFill size={24} />,
      description: "Manage site content",
      path: "/cms/content",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-8 py-6 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white">
        <div className="text-2xl font-semibold tracking-wide">
          Content Management
        </div>
        <hr className="border-t border-indigo-300 mt-2" />
      </div>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`h-full  transition-transform duration-300 ease-in-out transform md:translate-x-0`}
        >
          <div className="flex flex-col p-4 space-y-2 ">
            {menuItems.map((item, index) => (
              <Link
                to={item.path}
                key={item.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out animate-slideIn delay-${
                  index * 100
                } ${
                  activeMenu === item.id
                    ? "bg-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 hover:text-indigo-600"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  setActiveMenu(item.id);
                  
                }}
                aria-current={activeMenu === item.id ? "page" : undefined}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-indigo-600">{item.icon}</div>
                  <div>
                    <div className="text-lg font-semibold tracking-wide">
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 m-5 h-screen bg-white shadow-xl rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
