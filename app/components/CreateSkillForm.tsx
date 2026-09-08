"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createSkill } from "../actions/skills";

const initialState = {
  message: "",
  error: null,
};

const CreateSkillForm = () => {
  const [state, formAction, pending] = useActionState(
    createSkill,
    initialState,
  );

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
      <form action={formAction} className="space-y-4">
        {/* Name */}
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
            className="p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-100"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-100"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="flex justify-end items-center gap-4">
          {/* Submit Button */}
          {pending ? (
            <button
              type="submit"
              className="bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed"
              disabled
            >
              Creating...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded cursor-pointer"
            >
              Create Skill
            </button>
          )}

          {/* Cancel Link */}
          <Link
            href="/skills"
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CreateSkillForm;
