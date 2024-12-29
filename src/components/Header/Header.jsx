import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoEllipsisVertical,
} from "react-icons/io5";
import logo from "../../assets/logo.svg";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import ElipsisMenu from "../ElipsisMenu/ElipsisMenu";
import DeleteBoardModal from "../modals/DeleteBoardModal";
import boardsSlice from "../../redux/boardsSlice";

const Header = ({ boardModalOpen, setBoardModalOpen }) => {
  const dispatch = useDispatch();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isElipsisOpen, setIsElipsisOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard());
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    setIsDeleteModalOpen(false);
  };

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisOpen(false);
    setBoardType("add");
  };

  return (
    <>
      {/* <nav className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] gap-2 fixed flex items-center justify-between pl-2 pr-6 h-20 top-0 md:left-[230px] left-16 border-b border-slate-300 bg-white">
        
        <div className="flex items-center gap-3 cursor-pointer">
          <IoPersonOutline color="#fb923c" size="1.75rem" />
          <span className="text-orange-400 font-semibold md:text-lg text-sm whitespace-nowrap">
            Board Name
          </span>
          <IoChevronDownOutline color="#fb923c" size="1rem" />
        </div>

        
        <div className="flex items-center gap-2 md:w-[700px] w-32 bg-gray-100 rounded-lg px-3 py-3">
          <IoSearchOutline color="#999999" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 outline-none text-sm"
          />
        </div>

        
        <div className="md:flex hidden items-center gap-4">
          {[
            { icon: IoShareSocialOutline, label: "Share" },
            { icon: IoSettingsOutline, label: "Settings" },
            { icon: IoNotificationsOutline, label: "Notifications" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200 transition-colors"
              aria-label={label}
            >
              <Icon color="#444444" />
            </button>
          ))}
        </div>
      </nav> */}

      <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
        <header className="flex justify-between dark:text-white items-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={logo} alt="logo" className="h-6 w-6" />
            <h3 className="hidden md:inline-block font-bold md:text-3xl">
              Task Board
            </h3>

            <div className="flex items-center">
              <h3 className="truncate max-w-48 md:text-2xl text-xl font-bold md:ml-20">
                {board.name}
              </h3>

              <div
                onClick={onDropdownClick}
                className="w-3 ml-2 md:hidden cursor-pointer"
              >
                {openDropdown ? (
                  <IoChevronUpOutline />
                ) : (
                  <IoChevronDownOutline />
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 items-center md:space-x-6">
            <button
              onClick={() => {
                setOpenAddEditTask((state) => !state);
              }}
              className="hidden md:block button"
            >
              + Add New Task
            </button>

            <button
              onClick={() => {
                setOpenAddEditTask((state) => !state);
              }}
              className="button py-1 px-3 md:hidden"
            >
              +
            </button>

            <IoEllipsisVertical
              onClick={() => {
                setBoardType("edit");
                setOpenDropdown(false);
                setIsElipsisOpen((state) => !state);
              }}
              className="w-6 h-6 text-gray-500 cursor-pointer"
            />

            {isElipsisOpen && (
              <ElipsisMenu
                type="Boards"
                setOpenEditModal={setOpenEditModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            )}
          </div>
        </header>

        {openDropdown && (
          <HeaderDropdown
            setOpenDropdown={setOpenDropdown}
            setBoardModalOpen={setBoardModalOpen}
          />
        )}

        {boardModalOpen && (
          <AddEditBoardModal
            type={boardType}
            setIsBoardModalOpen={setBoardModalOpen}
          />
        )}

        {openAddEditTask && (
          <AddEditTaskModal
            type="add"
            device="mobile"
            setIsAddTaskModalOpen={setOpenAddEditTask}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteBoardModal
            type="board"
            title={board.name}
            onDeleteBtnClick={onDeleteBtnClick}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        )}
      </div>
    </>
  );
};

export default Header;
