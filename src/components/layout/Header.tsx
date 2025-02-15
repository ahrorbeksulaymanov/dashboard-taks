import React from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";

interface HeaderProps {
  toggleSidebar: () => void;
  icon: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, icon }) => {
  return (
    <header className="bg-[#fff] text-white px-4 py-2 flex justify-between items-center shadow sticky top-0 z-50">
        <button
            onClick={toggleSidebar}
            className="px-0 py-0 border-none text-black bg-transparent"
        >
            {icon}
        </button>
        <div className="flex gap-4 items-center">
            <IoNotificationsOutline className="text-[24px] cursor-pointer text-black" />
            <BiMessageRoundedDots className="text-[24px] cursor-pointer text-black" />
            <div className="flex items-center bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full p-0.5 pr-2">
              <HiMiniUserCircle className="text-[40px] text-black" />
              <span className="text-black select-none">Ahror</span>
            </div>
        </div>
    </header>
  );
};

export default Header;
