import { v4 } from "uuid";
import { getRandomColor } from "../helpers/getRandomColor";
import { getRandomImage } from "../helpers/getRandomImage";

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
        image: getRandomImage(200, 300, v4()),
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColor() },
          { title: "Front", ...getRandomColor() },
        ],
      },
      {
        id: v4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColor() },
          { title: "Front", ...getRandomColor() },
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
          { title: "Test", ...getRandomColor() },
          { title: "Front", ...getRandomColor() },
        ],
      },
      {
        id: v4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        deadline: 50,
        image: getRandomImage(200, 300, v4()),
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColor() },
          { title: "Front", ...getRandomColor() },
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
        image: getRandomImage(200, 300, v4()),
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColor() },
          { title: "Front", ...getRandomColor() },
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
          { title: "Test", ...getRandomColor() },
          { title: "Front", ...getRandomColor() },
        ],
      },
      {
        id: v4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColor() },
          { title: "Front", ...getRandomColor() },
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
        image: getRandomImage(200, 300, v4()),
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColor() },
          { title: "Front", ...getRandomColor() },
        ],
      },
    ],
  },
};
