import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";

const boardsSlice = createSlice({
  name: "boards",
  initialState: data.boards,
  reducers: {
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        name: payload.name,
        isActive,
        columns: [],
      };
      board.columns = payload.newColumns;
      state.push(board);
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      board.name = payload.name;
      board.columns = payload.newColumns;
    },
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      state.splice(state.indexOf(board), 1);
    },
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, subtasks, status };

      const board = state.find((board) => board.isActive);
      if (!board) {
        console.error("No active board found.");
        return;
      }

      board.columns = board.columns || [];

      const column = board.columns[newColIndex] || {
        name: status,
        tasks: [],
      };

      column.tasks = column.tasks || [];

      if (!board.columns[newColIndex]) {
        board.columns[newColIndex] = column;
      }

      column.tasks.push(task);
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === prevColIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newCol = board.columns.find((col, index) => index === newColIndex);
      newCol.tasks.push(task);
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);

      if (!board) {
        console.error("No active board found.");
        return;
      }

      const prevCol = board.columns[prevColIndex];
      if (!prevCol || !prevCol.tasks) {
        console.error("Invalid previous column or tasks are not initialized.");
        return;
      }

      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      if (!task) {
        console.error("No task found to move.");
        return;
      }

      const targetCol = board.columns[colIndex];
      if (!targetCol) {
        console.error("Target column does not exist.");
        return;
      }

      targetCol.tasks = targetCol.tasks || [];
      targetCol.tasks.push(task);
    },
    setSubtaskCompleted: (state, action) => {
      const { colIndex, taskIndex, subtaskIndex } = action.payload;

      const board = state.find((board) => board.isActive);
      if (!board) return;

      const col = board.columns[colIndex];
      if (!col) return;

      const task = col.tasks[taskIndex];
      if (!task) return;

      const subtask = task.subtasks[subtaskIndex];
      if (!subtask) return;

      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);

      if (!board) {
        console.error("No active board found.");
        return;
      }

      const columns = board.columns;
      const col = columns[payload.colIndex];

      if (!col) {
        console.error("Column not found.");
        return;
      }

      if (payload.colIndex === payload.newColIndex) return;

      const task = col.tasks[payload.taskIndex];
      if (!task) {
        console.error("Task not found.");
        return;
      }

      task.status = payload.status;

      col.tasks = col.tasks.filter((_, i) => i !== payload.taskIndex);

      const newCol = columns[payload.newColIndex];
      if (!newCol) {
        console.error("Target column not found.");
        return;
      }

      if (!newCol.tasks) {
        newCol.tasks = [];
      }

      newCol.tasks.push(task);
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    },
  },
});

export default boardsSlice;
