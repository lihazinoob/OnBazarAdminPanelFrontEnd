import { createBrowserRouter } from "react-router-dom";

import DashBoardLayout from "@/Layout/DashBoard/DashBoardLayout";
import DashBoardPage from "@/Pages/DashBoardPage/DashBoardPage";
import ProductManagementPage from "@/Pages/ProductManagementPage/ProductManagementPage";
import Sidebar from "@/Components/SideBar/Sidebar";
import BannerImagePage from "@/Pages/BannerImagePage/BannerImagePage";

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
        children:[
          {
            index:true,
            element:<BannerImagePage />
          },
          {
            path:"banner",
            element:<BannerImagePage />
          },
          {
            path:"product",
            element:<Sidebar />
          }
        ]
      },
    ],
  },
]);

export default router;