import CompanyLogo from "../../assets/CompanyLogo.svg"
import { SideBarLinks } from "@/CONSTANTS/SideBarMenuLinks";
import IconToolTipWrapper from "./IconToolTipWrapper";
import { NavLink,useLocation } from "react-router-dom";
export default function Sidebar() {
  
  return (
    <>
      <div className="h-full flex flex-col items-center mt-6">

        {/* Logo Holder */}
        <div>
          <img src={CompanyLogo} alt="On_Bazar" />
        </div>

        {/* Menu Item Holder */}
        <div className="flex flex-col mt-20 space-y-8">
        {SideBarLinks.map((menuItem, index) => (
          
          <IconToolTipWrapper key={index} label={menuItem.label}>
            <NavLink to={menuItem.path}
            className={({isActive}) => 
            `flex items-center justify-center rounded-4xl p-2 transition-colors
            ${isActive ? 'bg-black border text-white':'hover:bg-gray-200'}
            `
          }
          
            >
              <menuItem.icon className={"w-6 h-6"} />
            </NavLink>
          </IconToolTipWrapper>
        ))}
        </div>
      </div>
    </>
  );
}
