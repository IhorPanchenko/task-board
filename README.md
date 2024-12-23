# Task-Board App - React + Vite + Drag and Drop

This project is a simple Watchlist App built with **React**, **Vite**, and **Tailwind CSS**. It allows users to manage tasks within different columns using **React Beautiful DnD** for drag-and-drop functionality, and includes a modal for adding new tasks. It also includes dynamic theming with color helpers and random images.

## Features:

- **Drag and Drop**: Allows tasks to be rearranged between different columns using the `react-beautiful-dnd` library.
- **Dynamic Color Themes**: Uses helper functions to generate random colors and apply dynamic theming to tasks.
- **Task Management**: Users can add tasks to different columns using a modal.
- **Responsive Layout**: Built with **Tailwind CSS** for a responsive layout, ensuring the app works well on both mobile and desktop devices.

## Project Structure:

- **Components**: Custom React components for rendering the task list, individual tasks, and modals.
- **Helpers**: Utility functions such as `onDragEnd` for handling the drag-and-drop logic and `getRandomColors` for dynamic theming.
- **Data**: Contains initial data for the columns and tasks in the app.
- **Modals**: A reusable modal component for adding new tasks.

## Setup

To get started, clone the repository and install the necessary dependencies:

```bash
git clone <repository-url>
cd <project-folder>
npm install

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles the React app in production mode and optimizes the build for the best performance.

### `npm run preview`

Preview the production build.

---

## Libraries and Tools Used:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A next-generation, fast build tool for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Beautiful DnD**: A drag-and-drop library for React that provides intuitive drag-and-drop capabilities.
- **React Icons**: A library for easily integrating icons into React components.
- **React Modal**: A reusable modal for adding tasks.

---

## Custom Helpers:

- **`getRandomColors`**: A utility function to return random color schemes.
- **`getRandomImage`**: A function that returns a random image from [Picsum](https://picsum.photos) for dynamic task visuals.
- **`onDragEnd`**: A function that manages the drag-and-drop state update for the columns.

```
