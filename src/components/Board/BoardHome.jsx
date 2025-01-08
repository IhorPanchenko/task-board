import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../Sidebar/Sidebar";
import BoardColumn from "./BoardColumn";
import EmptyBoard from "../EmptyBoard/EmptyBoard";
import AddEditBoardModal from "../modals/AddEditBoardModal";

const BoardHome = () => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const boards = useSelector((state) => state.boards);
  const board = useMemo(
    () => boards.find((board) => board.isActive) || {},
    [boards]
  );
  const columns = useMemo(() => board?.columns || [], [board]);

  const isDesktop = windowSize[0] >= 768;

  const handleWindowSize = useCallback(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  }, [handleWindowSize]);

  const renderColumns = () =>
    columns.length > 0 ? (
      columns.map((col) => (
        <BoardColumn key={col.id || col.name} colIndex={columns.indexOf(col)} />
      ))
    ) : (
      <EmptyBoard type="edit" />
    );

  return (
    <div
      className={`flex h-screen gap-6 overflow-x-auto overflow-y-hidden ${
        isDesktop && isSideBarOpen ? "ml-[261px]" : "overflow-x-hidden"
      } bg-[#f4f7fd] dark:bg-[#20212c]`}
    >
      {/* Sidebar */}
      {isDesktop && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      <div className="flex mt-20 pt-4 overflow-y-auto">
        {/* Board Columns */}
        {columns.length > 0 ? (
          <>
            {renderColumns()}

            <div
              onClick={() => setIsBoardModalOpen(true)}
              className="flex justify-center items-center mx-5 mt-12 mb-2 min-w-72
            bg-[#e9effa] dark:bg-[#2b2c3740] text-[#828fa3] font-bold text-2xl 
            hover:text-[#635fc7] transition duration-300 cursor-pointer rounded-lg"
            >
              + New Column
            </div>
          </>
        ) : (
          <EmptyBoard type="edit" />
        )}
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
};

export default BoardHome;
