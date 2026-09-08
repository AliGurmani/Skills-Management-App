import Link from "next/link";
import { skills, type SKILLS } from "./skills";

const SkillsPage = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="w-full bg-gray-800 text-white p-4 rounded flex items-center justify-between mb-8">
        <h1>Skills Page</h1>

        {/* New Skill Link */}
        <Link
          href="/skills/new"
          className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
        >
          + New Skill
        </Link>
      </div>

      <ul className="flex gap-4">
        {skills.map((skill: SKILLS) => (
          <Link
            href={`/skills/${skill.id}`}
            key={skill.id}
            className="w-64 p-4 bg-gray-700 rounded shadow-md relative"
          >
            <li key={skill.id} className="space-y-1">
              {/* Skill Card */}
              {/* Badge */}
              <span className="inline-block px-3 py-1 text-xs font-semibold text-green-500 bg-green-200 rounded-full">
                {skill.category}
              </span>

              {/* ID */}
              <p className="text-sm text-gray-400 absolute top-2 right-2">
                {skill.id}
              </p>

              {/* Skill Name */}
              <h2 className="text-lg font-bold text-white">{skill.name}</h2>

              {/* Description */}
              <p className="text-gray-300">{skill.description}</p>

              {/* Timestamps */}
              {/* <p className="text-gray-300">Created At: {skill.createdAt}</p> */}
              {/* <p className="text-gray-300">Updated At: {skill.updatedAt}</p> */}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SkillsPage;
