import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/Layout/Auth/AuthLayout";
import DashBoardLayout from "@/Layout/DashBoard/DashBoardLayout";
import DashBoardPage from "@/Pages/DashBoardPage/DashBoardPage";
import ProductManagementPage from "@/Pages/ProductManagementPage/ProductManagementPage";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <AuthLayout />,
  // },
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
    path: "/products",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <ProductManagementPage />,
      },
    ],
  },
]);

export default router;