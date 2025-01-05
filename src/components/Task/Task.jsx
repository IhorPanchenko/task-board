import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

const Task = ({ taskIndex, colIndex }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const task = board?.columns[colIndex]?.tasks[taskIndex];

  const completed = useMemo(() => {
    return task?.subtasks.filter((subtask) => subtask.isCompleted).length || 0;
  }, [task]);

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onDragStart={handleOnDrag}
        draggable
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        className="w-72 first:my-5 rounded-lg py-6 px-3 bg-white dark:bg-[#2b2c37] 
        shadow-lg shadow-[#364e7e1a] hover:text-[#635fc7] dark:text-white 
        dark:hover:text-[#635fc7] cursor-pointer"
      >
        <span className="block font-bold tracking-wide">{task?.title}</span>

        <span className="block mt-2 text-xs font-bold text-gray-500 tracking-tighter">
          {completed} of {task?.subtasks.length} completed tasks
        </span>
      </div>

      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
};

export default Task;
