import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import boardsSlice from "../redux/boardsSlice";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import EmptyBoard from "../components/EmptyBoard/EmptyBoard";

const Layout = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  const [boardModalOpen, setBoardModalOpen] = useState(false);

  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden overflow-x-scroll">
      {boards.length > 0 ? (
        <>
          <Header
            boardModalOpen={boardModalOpen}
            setBoardModalOpen={setBoardModalOpen}
          />
          <Sidebar />
          {/* <div className="md:pl-64 pl-16 pr-5 pt-20 w-full h-full overflow-y-auto">
            <Outlet />
          </div> */}
        </>
      ) : (
        <EmptyBoard type="add" />
      )}
    </div>
  );
};

export default Layout;
