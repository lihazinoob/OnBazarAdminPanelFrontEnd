import { ReactNode } from "react";

interface ToolTipWrapperDataTypes {
  label: string;
  children: ReactNode;
}
export default function IconToolTipWrapper({label,children}:ToolTipWrapperDataTypes)
{
  return(<>
    <div className="relative group cursor-pointer">
      {children}

      {/* Custom ToolTip */}
      <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-black text-white  text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none before:content-[''] before:absolute before:top-1/2 before:-left-2 before:transform before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-black">
        {label}
      </span>
    </div>
  </>);
}