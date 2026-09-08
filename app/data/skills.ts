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

// Get a skill by its ID
export const getSkillById = async (id: string): Promise<SKILLS | undefined> => {
  return skills.find((skill) => skill.id === id);
};

// Get all skills
export const getAllSkills = async (): Promise<SKILLS[]> => {
  return skills;
};

// Add a new skill
export const addSkill = (newSkill: SKILLS): void => {
  skills.push(newSkill);
};

// Update an existing skill
export const updateSkill = (updatedSkill: SKILLS): void => {
  const index = skills.findIndex((skill) => skill.id === updatedSkill.id);
  if (index !== -1) {
    skills[index] = updatedSkill;
  }
};

// Delete a skill by its ID
export const deleteSkill = (id: string): void => {
  const index = skills.findIndex((skill) => skill.id === id);
  if (index !== -1) {
    skills.splice(index, 1);
  }
};
