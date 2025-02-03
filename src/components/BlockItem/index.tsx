import React, { useState, useRef, useContext } from "react";
import { useDrop } from "react-dnd";
import RGL, { WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SidebarContext } from "../layout/SidebarContext";

const ReactGridLayout = WidthProvider(RGL) as unknown as React.FC<RGL.ReactGridLayoutProps>;
const ItemType = { BOX: "box" };

const MyGrid = () => {
  const { removeSidebarItem, addSidebarItem } = useContext(SidebarContext)!;
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    drop: (item: { id: string }) => {
      addItemToGrid(item.id);
      removeSidebarItem(item.id);
    },
  });

  const addItemToGrid = (itemType: string) => {
    const newId = String(layout.length + 1);
    const newItem: Layout = {
      i: newId,
      x: (layout.length * 4) % 12, // Yangi elementni joylashuvi,
      y: Infinity, // Eng pastga qo'shiladi
      w: 4,
      h: 4,
    };

    setLayout([...layout, newItem]);
    setItems([...items, { id: newId, type: itemType }]);
  };

  const removeItem = (id: string, type: string) => {
    setLayout(layout.filter((item) => item.i !== id));
    setItems(items.filter((item) => item.id !== id));
    addSidebarItem(type, type === "image" ? "🖼 Rasm" : "📝 Matn");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const itemId = fileInputRef.current!.dataset.itemId!;
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, content: reader.result as string } : item
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileUpload = (itemId: string) => {
    fileInputRef.current!.dataset.itemId = itemId;
    fileInputRef.current!.click();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div ref={drop} className="flex-1 p-5">
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={800}
          isResizable={true}
          isDraggable={true}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="relative bg-gray-200 border border-gray-400 flex flex-col items-center justify-center text-lg font-bold p-4 rounded-md"
            >
              {/* O‘chirish tugmasi */}
              <button
                onClick={() => removeItem(item.id, item.type)}
                className="absolute z-40 top-2 right-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                ❌
              </button>

              {/* Rasm yoki matn */}
              {item.type === "image" ? (
                <>
                  {item.content ? (
                    <img
                      src={item.content}
                      alt="Uploaded"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <span>🖼 Rasm Yuklash</span>
                  )}
                  <button
                    onClick={() => openFileUpload(item.id)}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                  >
                    📤 Rasm Yuklash
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </>
              ) : (
                <input
                  type="text"
                  value={item.content || ""}
                  onChange={(e) => {
                    setItems((prevItems) =>
                      prevItems.map((itemData) =>
                        itemData.id === item.id ? { ...itemData, content: e.target.value } : itemData
                      )
                    );
                  }}
                  className="w-full text-center text-lg p-2 border border-gray-400 rounded-md"
                />
              )}
            </div>
          ))}
        </ReactGridLayout>

        {/* Pastda "Block qo'shish" tugmasi */}
        <button
          onClick={() => addItemToGrid("text")}
          className="mt-5 w-full px-4 py-3 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600"
        >
          ➕ Block Qo‘shish
        </button>
      </div>
    </DndProvider>
  );
};

export default MyGrid;












// import React, { useState } from "react";
// import RGL, { WidthProvider, Layout } from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";

// // JSX muammosini hal qilish uchun TypeScript cast qo‘shamiz
// const ReactGridLayout = WidthProvider(RGL) as unknown as React.FC<RGL.ReactGridLayoutProps>;

// interface GridItem {
//   id: string;
//   image?: string;
// }

// const MyGrid = () => {
//   const [layout, setLayout] = useState<Layout[]>([
//     { i: "1", x: 0, y: 0, w: 4, h: 4 },
//     { i: "2", x: 4, y: 0, w: 4, h: 4 },
//   ]);

//   const [items, setItems] = useState<GridItem[]>([
//     { id: "1" },
//     { id: "2" },
//   ]);

//   // Yangi grid item qo'shish
//   const addNewGridItem = () => {
//     const newId = String(items.length + 1);
//     const newItem: Layout = {
//       i: newId,
//       x: (layout.length * 4) % 12,
//       y: Infinity,
//       w: 4,
//       h: 4
//     };
//     setLayout([...layout, newItem]);
//     setItems([...items, { id: newId }]);
//   };

//   // Grid o‘zgarishlarini kuzatish
//   const onLayoutChange = (newLayout: Layout[]) => {
//     setLayout(newLayout);
//   };

//   // Rasm yuklash funksiyasi
//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setItems((prevItems) =>
//           prevItems.map((item) =>
//             item.id === itemId ? { ...item, image: reader.result as string } : item
//           )
//         );
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <button
//         onClick={addNewGridItem}
//         style={{
//           marginBottom: "10px",
//           padding: "10px 20px",
//           fontSize: "16px",
//           cursor: "pointer",
//           background: "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "5px"
//         }}
//       >
//         ➕ Yangi Grid Item Qo‘shish
//       </button>

//       <ReactGridLayout
//         className="layout"
//         layout={layout}
//         onLayoutChange={onLayoutChange}
//         cols={12}
//         rowHeight={30}
//         width={1200}
//         isResizable={true}
//         isDraggable={true}
//       >
//         {items.map((item) => (
//           <div
//             key={item.id}
//             style={{
//               background: "#fff",
//               border: "1px dashed #111",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "16px",
//               fontWeight: "bold",
//               position: "relative",
//               overflow: "hidden"
//             }}
//           >
//             {/* Rasmni ko'rsatish */}
//             {item.image ? (
//               <img
//                 src={item.image}
//                 alt="Uploaded"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   position: "absolute",
//                   top: 0,
//                   left: 0
//                 }}
//               />
//             ) : (
//               <span>📦 {item.id}</span>
//             )}

//             {/* Rasm yuklash tugmasi */}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleImageUpload(e, item.id)}
//               style={{
//                 position: "absolute",
//                 bottom: "5px",
//                 left: "5px",
//                 fontSize: "12px",
//                 cursor: "pointer"
//               }}
//             />
//           </div>
//         ))}
//       </ReactGridLayout>
//     </div>
//   );
// };

// export default MyGrid;









// import React, { useState } from "react";
// import RGL, { Layout, WidthProvider } from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";

// // JSX muammosini hal qilish uchun TypeScript cast qo‘shamiz
// const ReactGridLayout = WidthProvider(RGL) as unknown as React.FC<RGL.ReactGridLayoutProps>;

// const MyGrid = () => {
//   const [layout, setLayout] = useState<Layout[]>([
//     { i: "1", x: 0, y: 0, w: 2, h: 2 },
//     { i: "2", x: 2, y: 0, w: 2, h: 2 },
//     { i: "3", x: 4, y: 0, w: 2, h: 2 }
//   ]);

//   // Yangi grid item qo'shish
//   const addNewGridItem = () => {
//     const newItem = {
//       i: String(layout.length + 1), // Har bir yangi element uchun unikal ID
//       x: (layout.length * 2) % 12, // Yangi elementni joylashuvi
//       y: Infinity, // Eng pastga qo'shiladi
//       w: 2,
//       h: 2
//     };
//     setLayout([...layout, newItem]);
//   };

//   // Grid o'zgarishlarini kuzatish
//   const onLayoutChange = (newLayout: Layout[]) => {
//     setLayout(newLayout);
//   };

//   return (
//     <div>
//       <button
//         onClick={addNewGridItem}
//         style={{
//           marginBottom: "10px",
//           padding: "10px 20px",
//           fontSize: "16px",
//           cursor: "pointer",
//           background: "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "5px"
//         }}
//       >
//         ➕ Yangi Grid Item Qo‘shish
//       </button>

//       <ReactGridLayout
//         className="layout"
//         layout={layout}
//         onLayoutChange={onLayoutChange}
//         cols={12}
//         rowHeight={30}
//         width={1200}
//         isResizable={true} // Resize imkoniyati
//         isDraggable={true} // Drag imkoniyati
//       >
//         {layout.map((item) => (
//           <div
//             key={item.i}
//             style={{
//               background: "#ddd",
//               border: "1px solid #aaa",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "16px",
//               fontWeight: "bold"
//             }}
//           >
//             📦 {item.i}
//           </div>
//         ))}
//       </ReactGridLayout>
//     </div>
//   );
// };

// export default MyGrid;
