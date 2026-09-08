export type SKILLS = {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export const skills: SKILLS[] = [
  {
    id: "1",
    name: "JavaScript",
    description: "A programming language used for web development.",
    category: "Programming Language",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "React",
    description:
      "A JavaScript library for building user interfaces, maintained by Facebook.",
    category: "Frontend Framework",
    createdAt: "2023-01-02T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "TypeScript",
    description:
      "A superset of JavaScript that adds static typing and other features.",
    category: "Programming Language",
    createdAt: "2023-01-03T00:00:00Z",
    updatedAt: "2023-01-03T00:00:00Z",
  },
  {
    id: "4",
    name: "Node.js",
    description:
      "A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side development.",
    category: "Backend Framework",
    createdAt: "2023-01-04T00:00:00Z",
    updatedAt: "2023-01-04T00:00:00Z",
  },
  {
    id: "5",
    name: "Python",
    description:
      "A high-level programming language known for its readability and versatility.",
    category: "Programming Language",
    createdAt: "2023-01-05  T00:00:00Z",
    updatedAt: "2023-01-05T00:00:00Z",
  },
];
