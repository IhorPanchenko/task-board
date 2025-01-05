import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import BoardHome from "./components/Board/BoardHome";
import EmptyBoard from "./components/EmptyBoard/EmptyBoard";
import boardsSlice from "./redux/boardsSlice";

const App = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden overflow-x-scroll">
      {boards.length > 0 ? (
        <>
          <Header
            boardModalOpen={isBoardModalOpen}
            setBoardModalOpen={setIsBoardModalOpen}
          />

          <BoardHome
            setIsBoardModalOpen={setIsBoardModalOpen}
            isBoardModalOpen={isBoardModalOpen}
          />
        </>
      ) : (
        <EmptyBoard type="add" />
      )}
    </div>
  );
};

export default App;
