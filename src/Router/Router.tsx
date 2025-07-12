import { createBrowserRouter } from "react-router-dom";

import DashBoardLayout from "@/Layout/DashBoard/DashBoardLayout";
import DashBoardPage from "@/Pages/DashBoardPage/DashBoardPage";
import ProductManagementPage from "@/Pages/ProductManagementPage/ProductManagementPage";
import BannerImagePage from "@/Pages/BannerImagePage/BannerImagePage";
import CategoryManagementPage from "@/Pages/CategoryManagementPage/CategoryManagementPage";
import CategoryUpdatepage from "@/Pages/CategoryManagementPage/CategoryUpdatePage";
import ProductUploadPage from "@/Pages/ProductUploadPage/ProductUploadPage";
import ProductTablePage from "@/Pages/ProductUploadPage/ProductTablePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <DashBoardPage />,
      },
    ],
  },
  {
    path: "/cms",
    element: <DashBoardLayout />,
    children: [
      {
        element: <ProductManagementPage />,
        children: [
          {
            index: true,
            element: <BannerImagePage />,
          },
          {
            path: "banner",
            element: <BannerImagePage />,
          },
          {
            path: "product",
            element: <ProductUploadPage />,
          },
          {
            path: "product/table",
            element:<ProductTablePage/>
          },
          {
            path: "category",
            element: <CategoryManagementPage />,
          },

          {
            path:"category/update/:id",
            element: <CategoryUpdatepage/>,
          }
        ],
      },
    ],
  },
]);

export default router;
