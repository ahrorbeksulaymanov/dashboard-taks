import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

const GridControls = ({ addItemToGrid }: { addItemToGrid: (type: string) => void }) => {
  const { isEditableGrid, changeEditingStatus } = useContext(SidebarContext)!;

  return (
    <div className="flex justify-end items-center mt-5 gap-4">
      {isEditableGrid && <button onClick={() => addItemToGrid("text")} className="text-blue-600 font-semibold text-[14px] cursor-pointer hover:text-blue-400">+ Block Qo'shish</button>}
      <button onClick={() => changeEditingStatus(!isEditableGrid)} className={`px-4 py-1 text-[14px] text-white rounded-sm cursor-pointer ${isEditableGrid ? "bg-[#ED7115] hover:bg-[#ed7315d7]" : "bg-[#191928] hover:bg-[#23233a]"}`}>
        {isEditableGrid ? "Saqlash" : "O'zgartirish"}
      </button>
    </div>
  );
};

export default GridControls;
