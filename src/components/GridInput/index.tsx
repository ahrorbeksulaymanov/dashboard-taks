import { Dispatch, SetStateAction } from "react";

interface GridInput {
  isEditableGrid: boolean;
  item: {
    id: string;
    type: string;
    content?: string;
  };
  setItems: Dispatch<SetStateAction<{ id: string; type: string; content?: string }[]>>
}

const GridInput: React.FC<GridInput> = ({ isEditableGrid, item, setItems }) => {  

  return (
    isEditableGrid ? <textarea
      value={item.content || ""}
      disabled={!isEditableGrid}
      onChange={(e) => {
        setItems((prevItems) =>
          prevItems.map((itemData) =>
            itemData.id === item.id ? { ...itemData, content: e.target.value } : itemData
          )
        );
      }}
      className={`w-full z-20 text-center text-[14px] font-normal p-2 border border-gray-400 rounded-md outline-none active:border-blue-800 focus:border-blue-600 ${
        isEditableGrid ? "" : "bg-gray-300 cursor-auto"
      }`}
    /> : <p className="text-[14px] font-normal overflow-hidden">{item.content || ""}</p>
  );
};

export default GridInput;
