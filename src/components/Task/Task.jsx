import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoTimeOutline } from "react-icons/io5";
import TaskModal from "../modals/TaskModal";

const Task = ({ taskIndex, colIndex }) => {
  // const { title, description, priority, deadline, image, alt, tags } = task;
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((column, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);

  let completed = 0;
  let subtasks = task.subtasks;

  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    // <div
    //   ref={provided.innerRef}
    //   {...provided.draggableProps}
    //   {...provided.dragHandleProps}
    //   className="w-full cursor-grab bg-white flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
    // >
    //   {image && alt && (
    //     <img
    //       src={image}
    //       alt={alt || "Task image"}
    //       className="w-full h-44 rounded-lg object-cover"
    //     />
    //   )}

    //   {/* Title and Description */}
    //   <div className="w-full flex items-start flex-col">
    //     <span className="text-sm font-medium text-[#555555]">{title}</span>
    //     <span className="text-sm text-gray-500">{description}</span>
    //   </div>

    //   {/* Tags Section */}
    //   <div className="flex items-center gap-2">
    //     {tags.map((tag) => (
    //       <span
    //         key={tag.title}
    //         className="px-3 py-[2px] text-[13px] font-medium rounded-md"
    //         style={{ backgroundColor: tag.bg, color: tag.text }}
    //       >
    //         {tag.title}
    //       </span>
    //     ))}
    //   </div>

    //   <div className="w-full border border-dashed"></div>

    //   {/* Deadline and Priority */}
    //   <div className="w-full flex items-center justify-between">
    //     <div className="flex items-center gap-1">
    //       <IoTimeOutline color="#666666" size="19px" />
    //       <span className="text-sm text-gray-700">
    //         {formatDeadline(deadline)}
    //       </span>
    //     </div>

    //     {/* Priority Indicator */}
    //     <div
    //       className={`w-16 rounded-full h-1 ${
    //         priority === "high"
    //           ? "bg-red-500"
    //           : priority === "medium"
    //           ? "bg-orange-500"
    //           : "bg-blue-500"
    //       }`}
    //     ></div>
    //   </div>
    // </div>

    <div>
      <div
        onDragStart={handleOnDrag}
        draggable
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        className="w-72 first:my-5 rounded-lg bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a]
        py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7]
        cursor-pointer"
      >
        <span className="block font-bold tracking-wide">{task.title}</span>

        <span className="block font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed tasks
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
