import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import boardsSlice from "../../redux/boardsSlice";

const AddEditBoardModal = ({ setIsBoardModalOpen, type }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);

  useEffect(() => {
    if (type === "edit" && board && newColumns.length === 2) {
      setNewColumns(board.columns.map((col) => ({ ...col, id: uuidv4() })));
      setName(board.name);
    }
  }, [board, type, newColumns.length]);

  const handleColumnChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const updatedColumns = prevState.map((col) =>
        col.id === id ? { ...col, name: newValue } : col
      );
      return updatedColumns;
    });
  };

  const handleDeleteColumn = (id) => {
    setNewColumns((prevState) =>
      prevState.filter((column) => column.id !== id)
    );
  };

  const validate = () => {
    if (!name.trim()) return false;
    if (newColumns.some((column) => !column.name.trim())) return false;
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      const action =
        type === "add"
          ? boardsSlice.actions.addBoard
          : boardsSlice.actions.editBoard;
      dispatch(action({ name, newColumns }));
      setIsBoardModalOpen(false);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000080] px-2 py-4 overflow-scroll scrollbar-hide"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsBoardModalOpen(false);
      }}
    >
      <div className="mx-auto w-full max-w-md max-h-[95vh] px-8 py-8 overflow-y-scroll bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] rounded-xl">
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm text-gray-500 dark:text-white">
            Board Name
          </label>
          <input
            className="bg-transparent px-4 py-2 text-sm border border-gray-600 rounded-md outline-none focus:outline-[#635fc7]"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm text-gray-500 dark:text-white">
            Board Columns
          </label>

          {newColumns.map((column) => (
            <div key={column.id} className="flex items-center w-full">
              <input
                type="text"
                value={column.name}
                onChange={(e) => handleColumnChange(column.id, e.target.value)}
                className="flex-grow bg-transparent px-4 py-2 text-sm border border-gray-600 rounded-md outline-none focus:outline-[#735fc7]"
              />
              <IoCloseOutline
                onClick={() => handleDeleteColumn(column.id)}
                className="h-5 w-5 m-1 text-gray-600 cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={() =>
              setNewColumns([
                ...newColumns,
                { name: "", task: [], id: uuidv4() },
              ])
            }
            className="w-full mt-4 py-2 rounded-full bg-[#635fc7] text-white hover:opacity-75 dark:bg-white dark:text-[#635fc7]"
          >
            + Add new column
          </button>

          <button
            onClick={handleSubmit}
            className="w-full mt-8 py-2 rounded-full bg-[#635fc7] text-white hover:opacity-75 dark:bg-[#635fc7] dark:text-white relative"
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditBoardModal;
