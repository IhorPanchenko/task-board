import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import boardsSlice from "../../redux/boardsSlice";
import ElipsisMenu from "../ElipsisMenu/ElipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import DeleteBoardModal from "../modals/DeleteBoardModal";
import Subtask from "../Task/Subtask";

const TaskModal = ({ colIndex, taskIndex, setIsTaskModalOpen }) => {
  const dispatch = useDispatch();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const { columns } = board;
  const { title, description, subtasks, status } =
    columns[colIndex].tasks[taskIndex];

  const [currentStatus, setCurrentStatus] = useState(status);
  const completed = subtasks.filter((subtask) => subtask.isCompleted).length;
  const [newColIndex, setNewColIndex] = useState(
    columns.indexOf(columns[colIndex])
  );

  const onChange = useCallback((e) => {
    setCurrentStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  }, []);

  const onClose = useCallback(
    (e) => {
      if (e.target !== e.currentTarget) return;
      dispatch(
        boardsSlice.actions.setTaskStatus({
          taskIndex,
          colIndex,
          newColIndex,
          status,
        })
      );
      setIsTaskModalOpen(false);
    },
    [dispatch, status, newColIndex, colIndex, taskIndex, setIsTaskModalOpen]
  );

  const onDeleteBtnClick = useCallback(() => {
    dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
    setIsTaskModalOpen(false);
    setIsDeleteModalOpen(false);
  }, [dispatch, taskIndex, colIndex, setIsTaskModalOpen, setIsDeleteModalOpen]);

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center px-2 py-4 overflow-scroll scrollbar-hide z-50 bg-[#00000080]"
    >
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{title}</h1>

          <IoEllipsisVertical
            onClick={() => setIsElipsisMenuOpen((prevState) => !prevState)}
            className="w-5 h-5 text-gray-500 cursor-pointer"
          />

          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Task"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
          {description}
        </p>

        <p className="pt-6 text-gray-500 tracking-widest text-xs">
          Subtasks ({completed} of {subtasks.length})
        </p>

        <div className="mt-3 space-y-2">
          {subtasks.map((subtask, index) => (
            <Subtask
              key={index}
              index={index}
              taskIndex={taskIndex}
              colIndex={colIndex}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label
            htmlFor="current-status-select"
            className="text-sm dark:text-white text-gray-500"
          >
            Current Status
          </label>
          <select
            id="current-status-select"
            value={status}
            onChange={onChange}
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent border border-bg-gray-300 focus:outline-none focus:border-0 focus:outline-[#635fc7]"
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteBoardModal
          type="task"
          title={title}
          onDeleteBtnClick={onDeleteBtnClick}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
};

export default TaskModal;
