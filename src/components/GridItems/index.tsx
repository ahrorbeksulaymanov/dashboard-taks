import React, { useState, useContext } from "react";
import { useDrop } from "react-dnd";
import RGL, { WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { SidebarContext } from "../../context/SidebarContext";
import GridControls from "../GridControls";
import ImageUploader from "../ImageUploader";
import { IoMdClose } from "react-icons/io";
import GridInput from "../GridInput";
import useWindowSize from "../../hooks/useWindowSize";

const ReactGridLayout = WidthProvider(RGL) as unknown as React.FC<RGL.ReactGridLayoutProps>;
const ItemType = { BOX: "box" };

const MyGrid = () => {

  const { removeSidebarItem, addSidebarItem, isEditableGrid, sidebarItems } = useContext(SidebarContext)!;
  const { width } = useWindowSize()
  const [layout, setLayout] = useState<Layout[]>([
    { i: "1", x: 0, y: 0, w: 4, h: 4 },
    { i: "2", x: 4, y: 0, w: 4, h: 4 },
  ]);

  const [items, setItems] = useState<{ id: string; type: string; content?: string }[]>([
    { id: "1", type: "text", content: "Default Matn" },
    { id: "2", type: "image" },
  ]);

  const [, drop] = useDrop({
    accept: ItemType.BOX,
    drop: (item: { id: string, type: string }) => {      
      addItemToGrid(item.type, item.id);
      removeSidebarItem(item.id);
    },
  });

  const addItemToGrid = (itemType: string, id?: string) => {
    if (!isEditableGrid) return; // Agar tahrirlash rejimi o'chirilgan bo'lsa, hech narsa qo'shilmaydi

    const newId = String(id ? id : layout.length + sidebarItems.length + 1);
    const newItem: Layout = {
      i: newId,
      x: (layout.length * 4) % 12,
      y: Infinity,
      w: 4,
      h: 4,
    };    

    setLayout([...layout, newItem]);
    setItems([...items, itemType === "image" ? { id: newId, type: itemType } : { id: newId, type: itemType, content: "Default matn" }]);
  };
  

  const removeItem = (id: string, type: string) => {

    console.log("dele item", id, type);
    
    if (!isEditableGrid) return; // Agar tahrirlash rejimi o'chirilgan bo'lsa, element o'chmaydi

    setLayout(layout.filter((item) => item.i !== id));
    setItems(items.filter((item) => item.id !== id));
    addSidebarItem(type, type === "image" ? "🖼 Rasm" : "📝 Matn", id);
  };

  const handleLayoutChange = (newLayout: Layout[]) => {
    console.log("🛠 Layout o'zgardi:", newLayout);
    setLayout(newLayout);
  };
  

  return (
      <div ref={drop} className="flex-1">
        <ReactGridLayout
          className="layout min-h-[50vh]"
          layout={layout}
          cols={width > 1400 ? 12 : 12 }
          // cols={width > 1400 ? 12 : width > 1000 ? 18 : width > 900 ? 20 : width > 700 ? 24 : 48 }
          rowHeight={30}
          width={800}
          isResizable={isEditableGrid}
          isDraggable={isEditableGrid}
          onLayoutChange={handleLayoutChange} // Layout o'zgarishini saqlash
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`relative bg-white border flex flex-col items-center justify-center text-lg font-bold p-3 rounded-md ${
                isEditableGrid ? "cursor-move border-dashed border-gray-800" : "cursor-auto border-solid border-gray-300"
              }`}
            >
              {/* O'chirish tugmasi */}
              {isEditableGrid && (
                <div onClick={() => {
                  console.log("clicked div");                  
                }}>
                  <button
                    onClick={() => {
                      console.log("clicked");
                      removeItem(item.id, item.type)
                      
                    }}
                    className="absolute top-2 right-2 z-[10000] text-white p-1 rounded-sm hover:bg-blue-50 cursor-pointer"
                  >
                    <IoMdClose className="text-black" />
                  </button>
                </div>
              )}

              {/* Rasm yoki matn */}
              {item.type === "image" ? (
                <ImageUploader item={item} setItems={setItems} isEditableGrid={isEditableGrid} />
              ) : (
                <GridInput item={item} setItems={setItems} isEditableGrid={isEditableGrid} />
              )}
            </div>
          ))}
        </ReactGridLayout>

        <GridControls addItemToGrid={addItemToGrid} />
      </div>
  );
};

export default MyGrid;