import { useState } from "react";
import { useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import {
  IoLayersOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import useDarkMode from "../../Hooks/useDarkMode";

function HeaderDropdown({ setOpenDropdown, setBoardModalOpen }) {
  const [colorTheme, setColorTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const boards = useSelector((state) => state.boards);

  const toggleDarkMode = (checked) => {
    setColorTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
          All Boards {boards?.length}
        </h3>

        <div className="">
          {boards.map((board) => (
            <div
              className={`flex items-center dark:text-white space-x-2 px-5 py-4 ${
                board.isActive && "bg-[#635fc7] rounded-r-full text-white mr-8"
              }`}
              key={board.name}
            >
              <IoLayersOutline className="h-4 text-gray-600" />
              <span className="text-lg font-bold">{board.name}</span>
            </div>
          ))}

          <div
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className="flex items-center space-x-2 text-[#635fc7] px-5 py-4 cursor-pointer"
          >
            <IoLayersOutline className="h-4 text-gray-600" />
            <span className="text-lg font-bold">Create New Board</span>
          </div>

          <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#02212c] flex justify-center items-center rounded-lg">
            <IoSunnyOutline className="h-5 w-5 text-gray-600" />
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              ></span>
            </Switch>
            <IoMoonOutline className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropdown;
