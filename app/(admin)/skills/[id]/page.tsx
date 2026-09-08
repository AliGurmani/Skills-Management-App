import Link from "next/link";

type SkillPageProps = {
  params: {
    id: string;
  };
};

const SkillPage = async ({ params }: SkillPageProps) => {
  const { id } = await params;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="w-full bg-gray-800 text-white p-4 rounded flex items-center justify-between mb-8">
        <h1>Skills Details Page ({id})</h1>

        {/* Back To Skills Link */}
        <Link
          href="/skills"
          className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
        >
          Back to Skills
        </Link>
      </div>
    </div>
  );
};

export default SkillPage;
