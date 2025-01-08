import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { IoCloseOutline } from "react-icons/io5";
import boardsSlice from "../../redux/boardsSlice";

const AddEditTaskModal = ({
  type,
  device,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) => {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const [error, setError] = useState({
    title: "",
    subtasks: "",
  });

  const board = useSelector((state) =>
    state.boards.find((board) => board.isActive)
  );
  const columns = board.columns;

  useEffect(() => {
    if (type === "edit" && isFirstLoad) {
      const col = columns[prevColIndex];
      const task = col
        ? col.tasks.find((task, index) => index === taskIndex)
        : {};
      setSubtasks(
        task.subtasks.map((subtask) => ({ ...subtask, id: uuidv4() }))
      );
      setTitle(task.title);
      setDescription(task.description);
      setStatus(col.name);
      setIsFirstLoad(false);
    }
  }, [type, isFirstLoad, prevColIndex, taskIndex, columns, type]);

  const handleChange = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const setSubtask = newState.find((subtask) => subtask.id === id);
      if (setSubtask) {
        setSubtask.title = newValue;
      }
      return newState;
    });
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const handleDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const validate = () => {
    let isValid = true;
    const newError = {
      title: "",
      subtasks: "",
    };

    if (!title.trim()) {
      newError.title = "Please provide Task Name";
      isValid = false;
    }
    if (subtasks.some((subtask) => !subtask.title.trim())) {
      newError.subtasks = "At least one subtask must be added";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
    setIsAddTaskModalOpen(false);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setIsAddTaskModalOpen(false);
      }}
      className={`absolute left-0 right-0 top-0 py-6 px-6 pb-10 overflow-y-scroll bg-[#00000080] flex ${
        device === "mobile" ? "bottom-[-100vh]" : "bottom-0"
      }`}
    >
      {/* Modal content container */}
      <div
        className="max-w-md w-full px-8 py-4 max-h-[95vh] mx-auto my-auto bg-white 
      dark:bg-[#2b2c37] z-50 text-black dark:text-white font-bold shadow-md 
      shadow-[#364e7e1a] rounded-xl overflow-y-scroll scrollbar-hide"
      >
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>

        {/* Task Name input field */}
        <div className="mt-4 flex flex-col space-y-1">
          <label
            htmlFor="task-name-input"
            className="text-sm text-gray-500 dark:text-white"
          >
            Task Name *
          </label>
          <input
            id="task-name-input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="e.g Take coffee break"
            className="bg-transparent px-4 py-2 text-sm border border-gray-600 rounded-md 
            outline-none focus:outline-[#635fc7] focus:border-0 ring-0"
          />
          {error.title && <p className="text-red-500 text-xs">{error.title}</p>}
        </div>

        {/* Description input field */}
        <div className="mt-8 flex flex-col space-y-1">
          <label
            htmlFor="description-textarea"
            className="text-sm text-gray-500 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description-textarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            className="bg-transparent px-4 py-2 text-sm border border-gray-600 rounded-md 
            outline-none focus:outline-[#635fc7] focus:border-0 min-h-52 ring-0 resize-none"
          />
        </div>

        {/* Subtasks input fields */}
        <div className="mt-8 flex flex-col space-y-1">
          <span className="text-sm text-gray-500 dark:text-white">
            Subtasks *
          </span>
          {subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center w-full">
              <label htmlFor={`subtask-${subtask.id}`} className="sr-only">
                Subtask {subtask.id}
              </label>

              <input
                id={`subtask-${subtask.id}`}
                onChange={(e) => handleChange(subtask.id, e.target.value)}
                type="text"
                value={subtask.title}
                placeholder="e.g Take coffee break"
                className="bg-transparent mb-2 px-4 py-2 text-sm border border-gray-600 
                rounded-md outline-none focus:outline-[#635fc7] focus:border-0 flex-grow ring-0"
              />

              {subtasks.length > 1 && (
                <IoCloseOutline
                  onClick={() => handleDelete(subtask.id)}
                  className="h-5 w-5 text-gray-600 cursor-pointer m-1"
                />
              )}
            </div>
          ))}
          {error.subtasks && (
            <p className="text-red-500 text-xs">{error.subtasks}</p>
          )}

          <button
            onClick={() =>
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ])
            }
            className="w-full items-center py-2 rounded-full bg-[#635fc7] text-white 
            hover:opacity-75 dark:bg-white dark:text-[#635fc7]"
          >
            + Add New Subtask
          </button>
        </div>

        {/* Current status dropdown */}
        <div className="mt-8 flex flex-col space-y-3">
          <label
            htmlFor="status-select"
            className="text-sm text-gray-500 dark:text-white"
          >
            Current status
          </label>
          <select
            id="status-select"
            value={status}
            onChange={handleChangeStatus}
            className="flex-grow px-4 py-2 text-sm bg-transparent border border-gray-300 
            rounded-md outline-none focus:outline-[#635fc7] focus:border-0 ring-0"
          >
            {columns.map((column) => (
              <option
                value={column.name}
                key={column.name}
                className="bg-white dark:bg-[#2b2c37]"
              >
                {column.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => validate() && onSubmit(type)}
            className="w-full items-center py-2 rounded-full bg-[#635fc7] text-white 
            hover:opacity-75"
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTaskModal;
