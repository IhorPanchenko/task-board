import { useEffect } from "react";

const DeleteBoardModal = ({
  type,
  title,
  onDeleteBtnClick,
  setIsDeleteModalOpen,
}) => {
  const buttonStyles =
    "w-full py-2 font-semibold rounded-full hover:opacity-75";

  const handleOverlayClick = (e) => {
    if (e.target !== e.currentTarget) return;
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setIsDeleteModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setIsDeleteModalOpen]);

  return (
    <div
      role="dialog"
      aria-labelledby="deleteModalTitle"
      aria-describedby="deleteModalDescription"
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center px-2 py-4 overflow-scroll z-50 bg-[#00000080]"
    >
      <div className="w-full max-w-md my-auto max-h-[95vh] overflow-y-scroll px-8 py-8 bg-white dark:bg-[#2b2c37] text-black dark:text-white rounded-xl">
        <h3 id="deleteModalTitle" className="text-xl font-bold text-red-500">
          Delete this {type}?
        </h3>

        <p
          id="deleteModalDescription"
          className={`pt-6 text-${
            type === "task" ? "sm" : "xs"
          } font-semibold tracking-wide text-gray-500`}
        >
          Are you sure you want to delete the "{title}" {type}?{" "}
          {type === "task"
            ? "task and its subtasks"
            : "board. This action will remove all columns and tasks."}{" "}
          This action cannot be reversed.
        </p>

        <div className="flex items-center justify-center w-full mt-4 space-x-4">
          <button
            onClick={onDeleteBtnClick}
            className="w-full py-2 font-semibold rounded-full hover:opacity-75 text-white bg-red-500"
          >
            Delete
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="w-full py-2 font-semibold rounded-full hover:opacity-75 text-[#635fc7] bg-[#635fc71a]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoardModal;
