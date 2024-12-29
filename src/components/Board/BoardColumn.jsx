import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomColor } from "../../helpers/getRandomColor";
import Task from "../Task/Task";
import boardsSlice from "../../redux/boardsSlice";

const BoardColumn = ({ colIndex }) => {
  const [color] = useState(getRandomColor());

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);

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
      className="scrollbar-hide mx-5 pt-24 min-w-72"
    >
      <span
        className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em]
      text-[#828fa3]"
      >
        <span className={`rounded-full w-4 h-4 ${color}`}></span>
        {col.name} ({col?.tasks?.length})
      </span>

      {col.tasks?.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
};

export default BoardColumn;
