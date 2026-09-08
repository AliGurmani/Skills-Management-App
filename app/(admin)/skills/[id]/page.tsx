import Link from "next/link";
import { getSkillById, type SKILLS } from "../../../data/skills";

type SkillPageProps = {
  params: {
    id: string;
  };
};

const SkillPage = async ({ params }: SkillPageProps) => {
  const { id } = await params;

  const skill: SKILLS | undefined = await getSkillById(id);

  if (!skill) {
    return (
      <div className="p-8">
        <h1>Skill not found</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="w-full bg-gray-800 text-white p-4 rounded flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold">Skill Details</h1>

        {/* Back To Skills Link */}
        <Link
          href="/skills"
          className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
        >
          Back to Skills
        </Link>
      </div>

      {/* Skill Details */}
      <div className="p-4 bg-gray-700 rounded">
        <div className="space-y-1 mb-4">
          <p>
            <strong>Name:</strong> {skill.name}
          </p>
          <p>
            <strong>Category:</strong> {skill.category}
          </p>
          <div>
            <strong>Description:</strong>
            <p>{skill.description}</p>
          </div>

          <p>
            <strong>Created At:</strong> {skill.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillPage;
