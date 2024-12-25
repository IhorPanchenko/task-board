import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { IoCloseOutline } from "react-icons/io5";
import boardsSlice from "../../redux/boardsSlice";

const AddEditTaskModal = ({
  type,
  device,
  setOpenAddEditTask,
  taskIndex,
  prevColIndex = 0,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const columns = board.columns;
  const column = columns.find((column, index) => index === prevColIndex);
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const handleChange = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const setSubtask = newState.find((setSubtask) => setSubtask.id === id);
      setSubtask.title = newValue;
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
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }

    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
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
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]"
      }
    >
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white
      dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a]
        max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            type="text"
            placeholder="e.g Take coffee break"
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm
            border border-gray-600 focus:outline-[#635fc7] ring-0"
          />
        </div>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            className="bg-transparent px-4 py-2 outline-none focus:border-0 min-h-52 
            rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
          />
        </div>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Subtasks
          </label>

          {subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center w-full">
              <input
                onChange={(e) => {
                  handleChange(subtask.id, e.target.value);
                }}
                type="text"
                value={subtasks.title}
                placeholder="e.g Take coffee break"
                className="bg-transparent outline-none focus:border-0 border flex-grow px-4 
                py-2 rounded-md text-sm border-gray-600 focus:outline-[#635fc7]"
              />
              <IoCloseOutline
                onClick={() => {
                  handleDelete(subtask.id);
                }}
                className="h-5 w-5 text-gray-600 cursor-pointer m-1"
              />
            </div>
          ))}

          <button
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
            className="w-full items-center dark:text-[#635fc7] dark:bg-white 
          text-white bg-[#635fc7] py-2 rounded-full"
          >
            + Add New Subtask
          </button>
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current status
          </label>
          <select
            value={status}
            onChange={(e) => handleChangeStatus(e)}
            className="flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent 
            focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column) => (
              <option value={column.name} key={column.name}>
                {column.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setOpenAddEditTask(false);
              }
            }}
            className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full"
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTaskModal;
