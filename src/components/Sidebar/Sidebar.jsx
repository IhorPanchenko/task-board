import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import {
  IoLayersOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";
import useDarkMode from "../../Hooks/useDarkMode";
import boardsSlice from "../../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = useDarkMode();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);

  const toggleDarkMode = (checked) => {
    setColorTheme(checked ? "dark" : "light");
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[68px] h-screen items-center left-0 z-60`
            : `bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full  `
        }
      >
        <div>
          {isSideBarOpen && (
            <div className=" bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl">
              <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                ALL BOARDS ({boards?.length})
              </h3>

              <div className="flex flex-col h-[70vh] justify-between">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-center space-x-2 px-5 mr-8 rounded-r-full 
                      duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] 
                      hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] 
                      dark:text-white ${
                        board.isActive &&
                        "bg-[#635fc7] rounded-r-full text-white mr-8"
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <IoLayersOutline className="filter-white" />
                      <span className=" text-lg font-bold ">{board.name}</span>
                    </div>
                  ))}

                  <div
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                    className="flex items-center space-x-2 mr-8 rounded-r-full duration-500 
                    ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] 
                  hover:text-[#635fc7] dark:hover:bg-white "
                  >
                    <IoLayersOutline className="filter-white" />
                    <span className=" text-lg font-bold ">
                      Create New Board
                    </span>
                  </div>
                </div>

                <div
                  className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] 
                  flex justify-center items-center rounded-lg"
                >
                  <IoSunnyOutline className="h-5 w-5 text-gray-600" />
                  <Switch
                    checked={colorTheme === "dark"}
                    onChange={toggleDarkMode}
                    className={`${
                      colorTheme === "dark" ? "bg-[#635fc7]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        colorTheme === "dark"
                          ? "translate-x-6"
                          : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    ></span>
                  </Switch>
                  <IoMoonOutline className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </div>
          )}

          {isSideBarOpen ? (
            <div
              onClick={() => setIsSideBarOpen((prevState) => !prevState)}
              className="flex items-center mt-2 absolute bottom-16 text-lg font-bold  rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500"
            >
              <IoEyeOffOutline className="min-w-[20px]" />
              {isSideBarOpen && <span> Hide Sidebar </span>}
            </div>
          ) : (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className="absolute p-4"
            >
              <IoEyeOutline className="h-5 w-5 text-gray-300" />
            </div>
          )}
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
};

export default Sidebar;
