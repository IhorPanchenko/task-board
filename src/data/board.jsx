import { v4 } from "uuid";
import { getRandomColors } from "../helpers/getRandomColors";
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
        image: getRandomImage(200, 300, v4()),
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
        image: getRandomImage(200, 300, v4()),
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
        image: getRandomImage(200, 300, v4()),
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
};
