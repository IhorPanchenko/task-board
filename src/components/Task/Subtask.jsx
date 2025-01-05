import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../../redux/boardsSlice";

const Subtask = ({ index, taskIndex, colIndex }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  const col = activeBoard.columns[colIndex];
  const task = col.tasks[taskIndex];
  const subtask = task.subtasks[index];
  const checked = subtask.isCompleted;

  const onChange = () => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({
        subtaskIndex: index,
        taskIndex,
        colIndex,
      })
    );
  };

  return (
    <div
      className="w-full flex items-center justify-start gap-4 p-3 rounded-md relative 
    bg-[#f4f7fd] dark:bg-[#20212c] hover:bg-[#635fc740] dark:hover:bg-[#635fc740]"
    >
      <input
        className="w-4 h-4 cursor-pointer accent-[#635fc7]"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-labelledby={`subtask-${index}`}
      />
      <p className={checked ? "line-through opacity-30" : undefined}>
        {subtask.title}
      </p>
    </div>
  );
};

export default Subtask;
