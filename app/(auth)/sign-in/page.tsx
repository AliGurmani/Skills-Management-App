import SignInForm from "@/app/components/SignInForm";

const SignIn = () => {
  return (
    <div className="p-8 space-y-4">
      {/* Header */}
      <h1 className="text-xl font-semibold">Sign In</h1>

      <SignInForm />
    </div>
  );
};

export default SignIn;
