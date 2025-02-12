import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import Header from "./components/Header/Header";
import BoardHome from "./components/Board/BoardHome";
import EmptyBoard from "./components/EmptyBoard/EmptyBoard";

const App = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  useEffect(() => {
    if (!activeBoard && boards.length > 0) {
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    }
  }, [dispatch, activeBoard, boards.length]);

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-[#f4f7fd] dark:bg-[#20212c]">
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
