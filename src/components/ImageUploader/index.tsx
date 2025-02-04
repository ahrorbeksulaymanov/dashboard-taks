import { Dispatch, SetStateAction, useRef } from "react";

interface ImageUploaderProps {
  isEditableGrid: boolean;
  item: {
    id: string;
    type: string;
    content?: string;
  };
  setItems: Dispatch<SetStateAction<{ id: string; type: string; content?: string }[]>>
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ isEditableGrid, item, setItems }) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
  

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
      if (!isEditableGrid) return; // Agar tahrirlash rejimi o'chirilgan bo'lsa, yuklash ishlamaydi
  
      fileInputRef.current!.dataset.itemId = itemId;
      fileInputRef.current!.click();
    };

  return (
    <>
      {item.content ? (
        <img
          src={item.content}
          alt="Uploaded"
          className="w-full h-full object-cover rounded-sm"
        />
      ) : (
        <span className="text-[14px]">🖼 Rasm Yuklash</span>
      )}
      {isEditableGrid && (
        <button
          onClick={() => openFileUpload(item.id)}
          className="absolute bottom-5 px-3 py-1 text-gray-400  font-normal text-[14px] border border-gray-400 rounded-md cursor-pointer bg-white hover:bg-blue-50"
        >
          📤 Rasm Yuklash
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </>
  );
};

export default ImageUploader;
