export const onDragEnd = ({ source, destination }, columns, setColumns) => {
  if (!destination) return;

  const sourceColumn = columns[source.droppableId];
  const destColumn = columns[destination.droppableId];

  const sourceItems = [...sourceColumn.items];
  const destItems = [...destColumn.items];

  // If the drag happens between different columns
  if (source.droppableId !== destination.droppableId) {
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns((prevColumns) => ({
      ...prevColumns,
      [source.droppableId]: { ...sourceColumn, items: sourceItems },
      [destination.droppableId]: { ...destColumn, items: destItems },
    }));
  } else {
    // If the drag happens within the same column
    const [removed] = sourceItems.splice(source.index, 1);
    sourceItems.splice(destination.index, 0, removed);

    setColumns((prevColumns) => ({
      ...prevColumns,
      [source.droppableId]: { ...sourceColumn, items: sourceItems },
    }));
  }
};
