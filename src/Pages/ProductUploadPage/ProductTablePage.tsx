import React from "react";
interface Product {
  id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
}
import { Link } from "react-router-dom";
import { RiEdit2Fill, RiDeleteBinLine } from "react-icons/ri";

export default function ProductTablePage() {
  // state to hold products data
  const [products, setProducts] = React.useState<Product[]>([]);

  // state for seeing loading screen until products are fetched
  const [loading, setLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://raw-node-js.onrender.com/api/fetchAllProducts?page=${page}`
      );
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      // toast.error("Failed to fetch product list.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);


  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl">
        <div className="text-2xl sm:text-3xl font-semibold text-indigo-800 animate-slideIn">
          Your Products
        </div>
        <p
          className="text-gray-500 mt-2 text-sm sm:text-base animate-slideIn"
          style={{ animationDelay: "100ms" }}
        >
          View and manage your uploaded products. You can edit or delete them as
          needed.
        </p>
        <hr
          className="border-t border-indigo-200 my-4 animate-slideIn"
          style={{ animationDelay: "200ms" }}
        />
      </div>
      <div className="over-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                >
                  Loading products...
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {product.product_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.product_description.length > 50
                      ? product.product_description.slice(0, 50) + "..."
                      : product.product_description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Tk.{product.product_price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.product_quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/cms/product/update/${product.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <RiEdit2Fill size={20} />
                    </Link>
                    <button
                      // onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <RiDeleteBinLine size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
