import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoEllipsisVertical,
} from "react-icons/io5";
import logo from "../../assets/logo.svg";
import boardsSlice from "../../redux/boardsSlice";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import ElipsisMenu from "../ElipsisMenu/ElipsisMenu";
import DeleteBoardModal from "../modals/DeleteBoardModal";

const Header = ({ boardModalOpen, setBoardModalOpen }) => {
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState({
    openDropdown: false,
    isDeleteModalOpen: false,
    openAddEditTask: false,
    isElipsisOpen: false,
    boardType: "add",
  });

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = useCallback(() => {
    setBoardModalOpen(true);
    setModalState((prevState) => ({ ...prevState, isElipsisOpen: false }));
  }, [setBoardModalOpen]);

  const setOpenDeleteModal = useCallback(() => {
    setModalState((prevState) => ({
      ...prevState,
      isDeleteModalOpen: true,
      isElipsisOpen: false,
    }));
  }, []);

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard());
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    setModalState((prevState) => ({ ...prevState, isDeleteModalOpen: false }));
  };

  const onDropdownClick = () => {
    setModalState((prevState) => ({
      ...prevState,
      openDropdown: !prevState.openDropdown,
      isElipsisOpen: false,
      boardType: "add",
    }));
  };

  const toggleAddEditTask = () => {
    setModalState((prevState) => ({
      ...prevState,
      openAddEditTask: !prevState.openAddEditTask,
    }));
  };

  const renderModals = () => {
    const { openDropdown, isDeleteModalOpen, openAddEditTask, boardType } =
      modalState;

    return (
      <>
        {openDropdown && (
          <HeaderDropdown
            setOpenDropdown={(state) =>
              setModalState((prevState) => ({
                ...prevState,
                openDropdown: state,
              }))
            }
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
            setIsAddTaskModalOpen={toggleAddEditTask}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteBoardModal
            type="board"
            title={board ? board.name : "No Active Board"}
            onDeleteBtnClick={onDeleteBtnClick}
            setIsDeleteModalOpen={(state) =>
              setModalState((prevState) => ({
                ...prevState,
                isDeleteModalOpen: state,
              }))
            }
          />
        )}
      </>
    );
  };

  return (
    <div className="fixed left-0 right-0 p-4 z-50 bg-white dark:bg-[#2b2c37]">
      <header className="flex items-center justify-between dark:text-white">
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-bold md:text-3xl">
            Task Board
          </h3>

          <div className="flex items-center">
            <h3 className="md:ml-20 text-xl md:text-2xl font-bold max-w-48 truncate">
              {board ? board.name : "No Active Board"} {/* Fallback value */}
            </h3>

            <div
              onClick={onDropdownClick}
              className="w-3 ml-2 md:hidden cursor-pointer"
            >
              {modalState.openDropdown ? (
                <IoChevronUpOutline />
              ) : (
                <IoChevronDownOutline />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <button
            onClick={toggleAddEditTask}
            className="hidden md:block button"
            aria-label="Add New Task"
          >
            + Add New Task
          </button>

          <button
            onClick={toggleAddEditTask}
            className="md:hidden py-1 px-3 button"
            aria-label="Add New Task"
          >
            +
          </button>

          <IoEllipsisVertical
            onClick={() => {
              setModalState((prevState) => ({
                ...prevState,
                boardType: "edit",
                isElipsisOpen: !prevState.isElipsisOpen,
                openDropdown: false,
              }));
            }}
            className="w-6 h-6 text-gray-500 cursor-pointer"
          />

          {modalState.isElipsisOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>
      </header>

      {/* Render all modals here */}
      {renderModals()}
    </div>
  );
};

export default Header;
