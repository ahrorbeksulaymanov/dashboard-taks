import React, { useContext } from "react";
import { CiGrid42, CiSun } from "react-icons/ci";
import { Link } from "react-router-dom";
import { SidebarItem } from "../SidebarItem";
import { SidebarContext } from "../../context/SidebarContext";
import logo from '../../assets/footerlogo.svg';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {

  const sidebarContext = useContext(SidebarContext);

  if (!sidebarContext) {
    return <div>Context yuklanmadi...</div>;
  }

  const { sidebarItems, isEditableGrid } = sidebarContext;

  return (
    <div
      className={`bg-[#191928] text-white w-64 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } fixed h-full `}
    >
      <nav>
        <div className="h-[56px] bg-[#ED7115] flex items-center px-6">
            <img src={logo} className="w-[70%]" alt="Fido-biznes logo" />
        </div>
        <ul className="p-4 h-[calc(100vh-56px)] overflow-y-auto custom-scrollbar">
          <li className="hover:bg-[#29293f] cursor-pointer rounded-sm">
            <Link to={"/"} className="flex items-center gap-2 p-2"><CiGrid42 className="text-[18px]" />Dashboard</Link>
          </li>
          <li className="hover:bg-[#29293f] cursor-pointer rounded-sm mb-3">
            <Link to={"/settings"} className="flex items-center gap-2 p-2"><CiSun className="text-[22px]" />Settings</Link>
          </li>
          {
            sidebarItems?.map(menu => (
              <SidebarItem key={menu?.id} id={menu?.id} type={menu?.type} text={menu?.text} isEditableGrid={isEditableGrid} />
            ))
          }
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
