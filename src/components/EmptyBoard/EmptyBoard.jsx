import { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";

const EmptyBoard = ({ type }) => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const toggleModal = () => setIsBoardModalOpen(true);

  const message =
    type === "edit"
      ? "This board is empty. Create a new column to get started."
      : "There are no boards available. Create a new board to get started.";

  const buttonText = type === "edit" ? "+ Add New Column" : "+ Add New Board";

  return (
    <div
      className="flex flex-col h-screen w-screen items-center justify-center bg-white 
    dark:bg-[#2b2c37]"
    >
      <h3 className="font-bold text-gray-500">{message}</h3>

      <button
        onClick={toggleModal}
        aria-label={buttonText}
        className="w-full max-w-xs mt-8 relative font-bold text-white bg-[#635fc7] 
        dark:bg-[#635fc7] dark:text-white py-2 rounded-full hover:opacity-70 items-center"
      >
        {buttonText}
      </button>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
};

export default EmptyBoard;
