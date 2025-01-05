import { useCallback } from "react";

const ElipsisMenu = ({ type, setOpenEditModal, setOpenDeleteModal }) => {
  const handleOpenEditModal = useCallback(() => {
    setOpenEditModal();
  }, [setOpenEditModal]);

  const handleOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal();
  }, [setOpenDeleteModal]);

  return (
    <div
      className={
        type === "Boards" ? "absolute right-5 top-16" : "absolute right-4 top-6"
      }
    >
      <div className="flex justify-end items-center">
        <div
          className="w-42 h-auto text-sm font-medium z-50 shadow-md shadow-[#364e7e1a] 
        bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 pr-12 rounded-lg"
        >
          <button
            onClick={handleOpenEditModal}
            className="block cursor-pointer text-gray-700 dark:text-gray-400"
          >
            Edit {type}
          </button>

          <button
            onClick={handleOpenDeleteModal}
            className="block cursor-pointer text-red-500"
          >
            Delete {type}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElipsisMenu;
