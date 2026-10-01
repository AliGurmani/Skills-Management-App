"use client";

import { useActionState } from "react";
import { login } from "../actions/auth/login";

const initialState = {
  message: "",
  error: null,
};

const SignInForm = () => {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <section className="w-1/3 p-4 bg-gray-700 rounded">
      {/* Feedback Messages */}
      {state.message && (
        <p
          aria-live="polite"
          className="sr-only bg-green-500 text-white p-2 rounded"
        >
          {state.message}
        </p>
      )}
      {state.error && (
        <div className="bg-red-500 text-white p-2 rounded">{state.error}</div>
      )}

      {/* Form */}
      <form action={formAction} method="post" className="space-y-4">
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
            className="p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Sign In
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
