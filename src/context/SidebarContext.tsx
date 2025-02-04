import { createContext, useState, ReactNode } from "react";

interface SidebarContextType {
    sidebarItems: { id: string, type: string; text: string }[];
    removeSidebarItem: (id: string) => void;
    addSidebarItem: (type: string, text: string, id: string) => void;
    isEditableGrid: boolean,
    changeEditingStatus: (val: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {

  const [isEditableGrid, setisEditableGrid] = useState(true);
  const [sidebarItems, setSidebarItems] = useState([
    { id: "3", type: "text", text: "📝 Matn" },
    { id: "4", type: "image", text: "🖼 Rasm" },
    { id: "5", type: "image", text: "🖼 Rasm" },
    { id: "6", type: "text", text: "📝 Matn" },
    { id: "7", type: "image", text: "🖼 Rasm" },
    { id: "8", type: "text", text: "📝 Matn" },
    { id: "9", type: "image", text: "🖼 Rasm" },
    { id: "10", type: "text", text: "📝 Matn" },
    { id: "11", type: "text", text: "📝 Matn" },
    { id: "12", type: "image", text: "🖼 Rasm" },
    { id: "13", type: "text", text: "📝 Matn" },
    { id: "14", type: "text", text: "📝 Matn" },
    { id: "15", type: "image", text: "🖼 Rasm" },
  ]);
  
  const changeEditingStatus = (val: boolean) => {
    setisEditableGrid(val);
  };

  const removeSidebarItem = (id: string) => {
    setSidebarItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addSidebarItem = (type: string, text: string, id: string) => {
    setSidebarItems((prev) => [...prev, { type, text, id }]);
  };

  return (
    <SidebarContext.Provider value={{ sidebarItems, removeSidebarItem, addSidebarItem, isEditableGrid, changeEditingStatus }}>
      {children}
    </SidebarContext.Provider>
  );
};
