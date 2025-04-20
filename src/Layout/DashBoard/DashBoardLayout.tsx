import { Outlet } from "react-router-dom";
import Sidebar from "@/Components/SideBar/Sidebar";
export default function DashBoardLayout() {
  return (
    <>
      <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
        <div className="w-[100px] bg-indigo-50 fixed top-0 left-0 h-full;">
          <Sidebar />
        </div>
        <div className="flex-1 md:ml-[100px] flex flex-col min-h-screen">
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
