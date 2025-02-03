import { createContext, useState, ReactNode } from "react";

interface SidebarContextType {
  sidebarItems: { id: string; text: string }[];
  removeSidebarItem: (id: string) => void;
  addSidebarItem: (id: string, text: string) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarItems, setSidebarItems] = useState([
    { id: "image", text: "🖼 Rasm" },
    { id: "text", text: "📝 Matn" },
  ]);

  const removeSidebarItem = (id: string) => {
    setSidebarItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addSidebarItem = (id: string, text: string) => {
    setSidebarItems((prev) => [...prev, { id, text, content: "Default Matn" }]);
  };

  return (
    <SidebarContext.Provider value={{ sidebarItems, removeSidebarItem, addSidebarItem }}>
      {children}
    </SidebarContext.Provider>
  );
};
