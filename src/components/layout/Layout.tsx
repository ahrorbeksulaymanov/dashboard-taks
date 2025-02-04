import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FiMenu, FiX } from "react-icons/fi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useWindowSize from "../../hooks/useWindowSize";
import { SidebarContext } from "../../context/SidebarContext";
import Alert from "../Alert";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  
  const { isEditableGrid } = useContext(SidebarContext)!;
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const { width } = useWindowSize()

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
        if(isHovering) {
            // sidebar ochiq holatida sidebar hover bo'lganda ochiq turishi uchun
            if (event.clientX < 256) {
                setIsHovering(true);
              } else {
                setIsHovering(false);
              }
        } else {
            // sidebar yopiq holatida sidebar hover bo'lganda ochiq turishi uchun
            if (event.clientX < 8) {
              setIsHovering(true);
            } else {
              setIsHovering(false);
            }
        }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering]);

  useEffect(() => {
    if(width < 900) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
    }
  }, [width])

  useEffect(() => {
    if(isEditableGrid) {
      setIsSidebarOpen(true)
    } else {
      setIsSidebarOpen(false)
    }
  }, [isEditableGrid])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen transition-all">
        <Sidebar 
          isOpen={isSidebarOpen || isHovering} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <div 
          className={`flex-1 flex flex-col transition-all ${isSidebarOpen || isHovering ? 'ml-64' : 'ml-0'}`} 
        >
          <Header 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            icon={
              isSidebarOpen 
                  ? <FiMenu className="cursor-pointer text-[22px]" /> 
                      : <FiX className="cursor-pointer text-[22px]" />
              } 
          />
          <main className="bg-[#F5F5F5] p-4 flex-1 w-full">{children}</main>
        </div>
      </div>
      <Alert />
    </DndProvider>
  );
};

export default Layout;
