import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/Layout/Auth/AuthLayout";
const router = createBrowserRouter([
  {
    path:"/",
    element:<AuthLayout/>
  }
]);

export default router;