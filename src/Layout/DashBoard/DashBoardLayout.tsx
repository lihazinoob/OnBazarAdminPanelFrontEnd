import { Outlet } from "react-router-dom"

export default function DashBoardLayout()
{
  return(<>
    <div>
      <Outlet/>
    </div>
  </>)
}