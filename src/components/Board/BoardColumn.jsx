import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../../redux/boardsSlice";
import { getRandomColor } from "../../helpers/getRandomColor";
import Task from "../Task/Task";

const BoardColumn = ({ colIndex }) => {
  const [color] = useState(getRandomColor());
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive) || {};
  const activeCol = activeBoard?.columns?.[colIndex] || { name: "", tasks: [] };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="min-w-72 mx-5"
    >
      {/* Column Header */}
      <span
        className="flex items-center gap-2 font-semibold tracking-widest 
        md:tracking-[.2em] text-[#828fa3]"
      >
        <span className={`w-4 h-4 rounded-full ${color}`}></span>
        {activeCol.name} ({activeCol.tasks?.length ?? 0})
      </span>

      {/* Task List */}
      {activeCol.tasks?.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
};

export default BoardColumn;
