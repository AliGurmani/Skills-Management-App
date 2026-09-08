import CreateSkillForm from "@/app/components/CreateSkillForm";

const NewSkill = () => {
  return (
    <div className="p-8 space-y-4">
      {/* Header */}
      <h1 className="text-xl font-semibold">New Skill</h1>

      <CreateSkillForm />
    </div>
  );
};

export default NewSkill;
