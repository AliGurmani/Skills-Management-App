"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const SignUpForm = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { isLoading, isAuthenticated, register } = useAuth();

  // Redirect to dashboard if user is already logged in
  if (!isLoading && isAuthenticated) {
    router.push("/dashboard");
    return null; // Prevent rendering the form while redirecting
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({ email, password, name });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during sign up.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full p-4 bg-gray-700 rounded">
      {/* Feedback Messages */}
      {message && (
        <p
          role="alert"
          aria-live="polite"
          className="sr-only bg-green-500 text-white p-2 rounded"
        >
          {message}
        </p>
      )}
      {error && (
        <div role="alert" className="bg-red-500 text-white p-2 rounded">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} method="post" className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-100"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-100"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-100"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-100"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </form>

      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px bg-gray-400"></div>

        <span className="text-sm text-gray-300">OR</span>

        <div className="flex-1 h-px bg-gray-400"></div>
      </div>

      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link href="/sign-in" className="text-green-500 hover:text-green-700">
          Sign In
        </Link>
      </p>
    </section>
  );
};

export default SignUpForm;
