import {
  IoLayersOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useDarkMode from "../../Hooks/useDarkMode";
import boardsSlice from "../../redux/boardsSlice";
import { Switch } from "@headlessui/react";
import AddEditBoardModal from "../modals/AddEditBoardModal";

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = useDarkMode();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const boards = useSelector((state) => state.boards);

  const toggleDarkMode = (checked) => {
    setColorTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    // <div className="fixed left-0 top-0 md:w-56 w-16 overflow-hidden h-full flex flex-col">
    //   <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-16 bg-white">
    //     <span className="text-orange-400 font-semibold text-2xl md:block hidden transition-all hover:text-orange-500">
    //       Logo
    //     </span>
    //     <span className="text-orange-400 font-semibold text-2xl md:hidden block transition-all hover:text-orange-500">
    //       L.
    //     </span>
    //   </div>

    //   <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-white py-4 px-3 relative">
    //     {navLinks.map((link) => (
    //       <button
    //         key={link.title}
    //         className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-200 px-2 py-3 cursor-pointer transition-colors ${
    //           link.active ? "bg-orange-300" : "bg-transparent"
    //         }`}
    //         aria-label={link.title}
    //       >
    //         {link.icon}
    //         <span className="font-medium text-sm md:block hidden">
    //           {link.title}
    //         </span>
    //       </button>
    //     ))}

    //     <button
    //       className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200 transition-all"
    //       aria-label="Log Out"
    //     >
    //       <IoLogOutOutline />
    //       <span className="font-medium text-sm md:block hidden">Log Out</span>
    //     </button>
    //   </div>
    // </div>
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[72px] h-screen  items-center left-0 z-20`
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
                      className={` flex items-center space-x-2 px-5 mr-8 rounded-r-full 
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
          )}

          {isSideBarOpen ? (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className="flex items-center mt-2 absolute bottom-16 text-lg font-bold  rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500"
            >
              <IoEyeOffOutline className=" min-w-[20px]" />
              {isSideBarOpen && <span> Hide Sidebar </span>}
            </div>
          ) : (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className="absolute p-5"
            >
              <IoEyeOutline className=" min-w-[20px]" />
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
