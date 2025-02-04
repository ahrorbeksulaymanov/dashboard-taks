import { useContext, useEffect, useState } from "react";
import './style.css';
import { SidebarContext } from "../../context/SidebarContext";

const Alert: React.FC = () => {  

  const { isEditableGrid } = useContext(SidebarContext)!;
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  useEffect(() => {
    if(!isEditableGrid) {
      handleSave()
    }
  }, [isEditableGrid])


  return (
    <>
      {isSaved && (
        <div className="fixed top-20 right-5 bg-green-500 text-white px-4 py-2 rounded-md shadow-md alert-animation z-[100]">
          ✅ Ma'lumot muvaffaqiyatli saqlandi!
        </div>
      )}
    </>
  );
};

export default Alert;
