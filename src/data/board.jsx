import { v4 } from "uuid";
import taskImage from "../assets/images/bg.jpg";
import { getRandomColors } from "../helpers/getRandomColors";

export const Board = {
  backlog: {
    name: "Backlog",
    items: [
      {
        id: v4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        deadline: 50,
        image: taskImage,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
      {
        id: v4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
  pending: {
    name: "Pending",
    items: [
      {
        id: v4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "high",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
      {
        id: v4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        deadline: 50,
        image: taskImage,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
  todo: {
    name: "To Do",
    items: [
      {
        id: v4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        deadline: 50,
        image: taskImage,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
  doing: {
    name: "Doing",
    items: [
      {
        id: v4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
      {
        id: v4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
  done: {
    name: "Done",
    items: [
      {
        id: v4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "high",
        deadline: 50,
        image: taskImage,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
};
