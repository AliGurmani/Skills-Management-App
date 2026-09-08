import { skills, type SKILLS } from "./skills";

const SkillsPage = () => {
  return (
    <div>
      <h1>Skills Page</h1>
      <ul>
        {skills.map((skill: SKILLS) => (
          <li key={skill.id}>
            <h2>{skill.name}</h2>
            <p>{skill.description}</p>
            <p>Category: {skill.category}</p>
            <p>Created At: {skill.createdAt}</p>
            <p>Updated At: {skill.updatedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsPage;
