import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Board } from "../../data/Board";
import { IoAddOutline } from "react-icons/io5";
import Task from "../../components/Task/Task";
import AddModal from "../../components/Modals/AddModal";
import { onDragEnd } from "../../helpers/onDragEnd";
import Sidebar from "../../components/Sidebar/Sidebar";
import BoardColumn from "../../components/Board/BoardColumn";

const handleAddTask = (taskData, columns, setColumns, selectedColumn) => {
  const updatedColumns = { ...columns };
  updatedColumns[selectedColumn].items = [
    ...updatedColumns[selectedColumn].items,
    taskData,
  ];
  setColumns(updatedColumns);
};

const Home = ({ boardModalOpen, setBoardModalOpen }) => {
  // const [columns, setColumns] = useState(Board);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedColumn, setSelectedColumn] = useState("");
  // const openModal = (columnId) => {
  //   setSelectedColumn(columnId);
  //   setModalOpen(true);
  // };
  // const closeModal = () => {
  //   setModalOpen(false);
  // };
  // return (
  //   <>
  //     <DragDropContext
  //       onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
  //     >
  //       <div className="flex w-full gap-8 px-5 pb-8">
  //         {Object.entries(columns).map(([columnId, column]) => (
  //           <div className="flex flex-col w-full gap-3" key={columnId}>
  //             <Droppable droppableId={columnId} key={columnId}>
  //               {(provided) => (
  //                 <div
  //                   ref={provided.innerRef}
  //                   {...provided.droppableProps}
  //                   className="flex flex-col md:w-72 w-64 gap-3 items-center py-5"
  //                 >
  //                   <div className="flex items-center justify-center w-full py-3 bg-white rounded-lg shadow-sm text-[#555555] font-medium text-sm">
  //                     {column.name}
  //                   </div>
  //                   {column.items.map((task, index) => (
  //                     <Draggable
  //                       key={task.id.toString()}
  //                       draggableId={task.id.toString()}
  //                       index={index}
  //                     >
  //                       {(provided) => <Task provided={provided} task={task} />}
  //                     </Draggable>
  //                   ))}
  //                   {provided.placeholder}
  //                 </div>
  //               )}
  //             </Droppable>
  //             <div
  //               onClick={() => openModal(columnId)}
  //               className="flex cursor-pointer items-center justify-center gap-1 py-3 w-full bg-white rounded-lg shadow-sm text-[#555555] font-medium text-sm hover:bg-gray-100 transition-colors"
  //             >
  //               <IoAddOutline color={"#555555"} />
  //               Add Task
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </DragDropContext>
  //     <AddModal
  //       isOpen={modalOpen}
  //       onClose={closeModal}
  //       setOpen={setModalOpen}
  //       handleAddTask={(taskData) =>
  //         handleAddTask(taskData, columns, setColumns, selectedColumn)
  //       }
  //     />
  //   </>
  // );
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  useEffect(() => {
    const handleWindowSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  });

  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? " bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]"
          : "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 "
      }
    >
      {windowSize[0] >= 768 && <Sidebar />}

      {columns.map((col, index) => (
        <BoardColumn key={index} colIndex={index} />
      ))}
    </div>
  );
};

export default Home;
