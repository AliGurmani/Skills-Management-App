type SkillPageProps = {
  params: {
    id: string;
  };
};

const SkillPage = async ({ params }: SkillPageProps) => {
  const { id } = await params;

  return <div>Skill Page {id}</div>;
};

export default SkillPage;
