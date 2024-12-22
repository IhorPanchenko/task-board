import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Board } from "../../data/Board";
import { IoAddOutline } from "react-icons/io5";
import Task from "../../components/Task/Task";

const Boards = () => {
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

  const handleAddTask = (taskData) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="w-full flex flex-col">
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-3 w-full bg-white rounded-lg shadow-sm text-[#555555] font-medium text-sm">
                      {column.name}
                    </div>

                    {column.items.map((task, index) => {
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <>
                            <Task provided={provided} task={task} />
                          </>
                        )}
                      </Draggable>;
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div className="flex cursor-pointer items-center justify-center gap-1 py-3 md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555555] font-medium text-sm">
                <IoAddOutline color={"#555555"} />
                Add Task
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Boards;
