import { useDrag } from "react-dnd";

const ItemType = {
  BOX: "box",
};

export const SidebarItem = ({ id, text }: { id: string; text: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.BOX,
    item: id == "text" ? { id, type: id, content: "Default Matn" } : { id, type: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="p-2 mb-2 cursor-grab"
      style={{
        padding: "10px",
        marginBottom: "10px",
        background: isDragging ? "green" : "green",
      }}
    >
      {text}
    </div>
  );
};
