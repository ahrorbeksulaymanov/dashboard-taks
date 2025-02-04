import { useDrag } from "react-dnd";

const ItemType = {
  BOX: "box",
};

export const SidebarItem = ({ id, text, isEditableGrid, type }: { id: string; text: string; type: string, isEditableGrid: boolean }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemType.BOX,
      item: { id, type: type },
      canDrag: isEditableGrid, // Agar `isEditableGrid === false` bo'lsa, drag ishlamaydi
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [isEditableGrid] // `isEditableGrid` o'zgarganda qayta render bo'ladi
  );

  return (
    <div
      ref={isEditableGrid ? drag : null} // Agar `isEditableGrid === false` bo'lsa, drag ishlamaydi
      className={`p-2.5 mb-2 ${isEditableGrid ? "cursor-grab" : "cursor-auto"} rounded-sm text-white`}
      style={{
        background: isDragging ? "#29293f" : "#2D4F94",
      }}
    >
      {text}
    </div>
  );
};
