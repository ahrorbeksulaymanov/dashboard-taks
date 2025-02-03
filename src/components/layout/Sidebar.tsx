import React, { useContext } from "react";
import { CiGrid42 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { SidebarItem } from "../SidebarItem";
import { SidebarContext } from "./SidebarContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {

  const sidebarContext = useContext(SidebarContext);

  if (!sidebarContext) {
    return <div>Context yuklanmadi...</div>;
  }

  const { sidebarItems } = sidebarContext;

  return (
    <div
      className={`bg-[#252836] text-white w-64 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } fixed h-full `}
    >
      <nav>
        <div className="h-[56px] bg-[#483D8B] flex items-center px-6">
            <h2 className="text-[22px] font-bold">Logo</h2>
        </div>
        <ul className="p-4">
          <li className="p-2 hover:bg-gray-700 cursor-pointer">
            <Link to={"/"} className="flex items-center gap-2"><CiGrid42 className="text-[18px]" />Dashboard</Link>
          </li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">
            <Link to={"/settings"} className="flex items-center gap-2"><CiGrid42 className="text-[18px]" />Settings</Link>
          </li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Settings</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Profile</li>
          {
            sidebarItems?.map(menu => (
              <SidebarItem key={menu?.id} id={menu?.id} text={menu?.text} />
            ))
          }
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
