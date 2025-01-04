import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import {
  IoLayersOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import useDarkMode from "../../Hooks/useDarkMode";
import boardsSlice from "../../redux/boardsSlice";

const HeaderDropdown = ({ setOpenDropdown, setBoardModalOpen }) => {
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(colorTheme === "dark");

  const boards = useSelector((state) => state.boards);

  const toggleDarkMode = (checked) => {
    setColorTheme(checked ? "dark" : "light");
    setDarkSide(checked);
  };

  const closeDropdown = (e) => {
    if (e.target !== e.currentTarget) return;
    setOpenDropdown(false);
  };

  const handleBoardClick = (index) => {
    dispatch(boardsSlice.actions.setBoardActive({ index }));
  };

  const handleCreateNewBoardClick = () => {
    setBoardModalOpen(true);
    setOpenDropdown(false);
  };

  return (
    <div
      className="absolute left-0 right-0 top-16 bottom-[-100vh] py-10 px-6 bg-[#00000080]"
      onClick={closeDropdown}
    >
      <div
        className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 
        rounded-xl"
      >
        {/* Total number of boards */}
        <h3 className="text-gray-600 dark:text-gray-300 font-semibold mx-4 mb-8">
          All Boards {boards?.length}
        </h3>

        <div>
          {boards.map((board, index) => (
            <div
              className={`flex items-center dark:text-white space-x-2 px-5 py-4 cursor-pointer
              ${
                board.isActive && "bg-[#635fc7] rounded-r-full text-white mr-8"
              }`}
              key={board.name}
              onClick={() => handleBoardClick(index)}
            >
              <IoLayersOutline className="h-4 text-gray-600" />
              <span className="text-lg font-bold">{board.name}</span>
            </div>
          ))}

          {/* Option to create a new board */}
          <div
            onClick={handleCreateNewBoardClick}
            className="flex items-center space-x-2 px-5 py-4 text-[#635fc7] cursor-pointer"
          >
            <IoLayersOutline className="h-4 text-gray-600" />
            <span className="text-lg font-bold">Create New Board</span>
          </div>

          {/* Dark mode switcher */}
          <div
            className="mx-2 p-4 space-x-2 flex justify-center items-center bg-slate-100 
          dark:bg-[#02212c] rounded-lg"
          >
            <IoSunnyOutline className="h-5 w-5 text-gray-600" />
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center ${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } rounded-full`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  darkSide ? "translate-x-6" : "translate-x-1"
                }`}
              ></span>
            </Switch>
            <IoMoonOutline className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdown;
