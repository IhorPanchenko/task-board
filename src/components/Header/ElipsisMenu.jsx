const ElipsisMenu = ({ type, setOpenEditModal, setOpenDeleteModal }) => {
  return (
    <div
      className={
        type === "Boards" ? "absolute top-16 right-5" : "absolute top-6 right-4"
      }
    >
      <div className="flex justify-end items-center">
        <div
          className="w-42 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] 
        bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg  h-auto pr-12"
        >
          <span
            onClick={() => {
              setOpenEditModal();
            }}
            className="block cursor-pointer dark:text-gray-400 text-gray-700"
          >
            Edit {type}
          </span>

          <span
            onClick={() => {
              setOpenDeleteModal();
            }}
            className="block cursor-pointer text-red-500"
          >
            Delete {type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ElipsisMenu;
