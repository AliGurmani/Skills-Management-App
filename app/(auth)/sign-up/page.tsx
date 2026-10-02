import SignUpForm from "@/components/SignUpForm";

const SignUp = () => {
  return (
    <div className="w-1/3 p-8 space-y-4">
      {/* Header */}
      <h1 className="text-xl font-semibold">Sign Up</h1>

      <SignUpForm />
    </div>
  );
};

export default SignUp;
