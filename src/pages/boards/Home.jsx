import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Board } from "../../data/Board";
import { IoAddOutline } from "react-icons/io5";
import Task from "../../components/Task/Task";
import AddModal from "../../components/Modals/AddModal";
import { onDragEnd } from "../../helpers/onDragEnd";

const handleAddTask = (taskData, columns, setColumns, selectedColumn) => {
  const updatedColumns = { ...columns };
  updatedColumns[selectedColumn].items = [
    ...updatedColumns[selectedColumn].items,
    taskData,
  ];
  setColumns(updatedColumns);
};

const Home = () => {
  const [columns, setColumns] = useState(Board);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");

  const openModal = (columnId) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex items-start justify-between px-5 pb-8 gap-8">
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="w-full flex flex-col gap-0" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-72 w-64 gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-3 w-full bg-white rounded-lg shadow-sm text-[#555555] font-medium text-sm">
                      {column.name}
                    </div>
                    {column.items.map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => <Task provided={provided} task={task} />}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div
                onClick={() => openModal(columnId)}
                className="flex cursor-pointer items-center justify-center gap-1 py-3 md:w-72 w-64 bg-white rounded-lg shadow-sm text-[#555555] font-medium text-sm"
              >
                <IoAddOutline color={"#555555"} />
                Add Task
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={(taskData) =>
          handleAddTask(taskData, columns, setColumns, selectedColumn)
        }
      />
    </>
  );
};

export default Home;
