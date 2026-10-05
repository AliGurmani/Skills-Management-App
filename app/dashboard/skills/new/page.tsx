"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { createSkill } from "@/actions/skills";

const CreateSkillForm = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState(
    "---\nname: my-skill\ndescription: What this skill does\n---\n\n# Skill Title\n\nInstructions for how to use this skill...\n",
  );

  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-indigo-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!name.trim() || !description.trim() || !content.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createSkill(
        {
          name: name.trim(),
          description: description.trim(),
          content: content.trim(),
          isPublic,
        },
        user!.id,
      );

      if (result.success) {
        setMessage("Skill created successfully.");
        router.push("/dashboard");
      } else {
        setError(result.error || "Failed to create skill.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the skill.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 py-6 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Create Skill
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Create a reusable skill with custom Markdown instructions.
          </p>
        </div>

        {/* Form Card */}
        <section className="rounded-xl border border-gray-800 bg-gray-900 shadow-lg shadow-black/10">
          <div className="border-b border-gray-800 px-6 py-5">
            <h2 className="text-base font-semibold text-gray-100">
              Skill Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Configure the basic information and instructions for your skill.
            </p>
          </div>

          <div className="p-6">
            {/* Success */}
            {message && (
              <div
                aria-live="polite"
                className="mb-5 rounded-lg border border-emerald-800 bg-emerald-950/50 px-4 py-3 text-sm text-emerald-400"
              >
                {message}
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-400"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Name
                  <span className="ml-1 text-red-400">*</span>
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. web-design-guidelines"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    block w-full rounded-lg
                    border border-gray-700
                    bg-gray-950
                    px-4 py-2.5
                    text-sm text-gray-100
                    outline-none
                    transition
                    placeholder:text-gray-600
                    hover:border-gray-600
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-500/20
                  "
                />

                <p className="mt-2 text-xs text-gray-500">
                  Choose a short and descriptive name.
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Description
                  <span className="ml-1 text-red-400">*</span>
                </label>

                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Brief description of what this skill does"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="
                    block w-full rounded-lg
                    border border-gray-700
                    bg-gray-950
                    px-4 py-2.5
                    text-sm text-gray-100
                    outline-none
                    transition
                    placeholder:text-gray-600
                    hover:border-gray-600
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-500/20
                  "
                />
              </div>

              {/* Markdown */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="content"
                    className="text-sm font-medium text-gray-300"
                  >
                    Skill Content
                    <span className="ml-1 text-red-400">*</span>
                  </label>

                  <span className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-[11px] font-medium text-gray-400">
                    Markdown
                  </span>
                </div>

                <textarea
                  id="content"
                  name="content"
                  rows={14}
                  placeholder="Enter your skill instructions..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="
                    block w-full
                    resize-y
                    rounded-lg
                    border border-gray-700
                    bg-gray-950
                    px-4 py-3
                    font-mono
                    text-sm
                    leading-6
                    text-gray-200
                    outline-none
                    transition
                    placeholder:text-gray-600
                    hover:border-gray-600
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-500/20
                  "
                />

                <p className="mt-2 text-xs text-gray-500">
                  Write your skill metadata and instructions using Markdown.
                </p>
              </div>

              {/* Public Skill */}
              <div className="rounded-lg border border-gray-800 bg-gray-950/60 p-4">
                <label
                  htmlFor="isPublic"
                  className="flex cursor-pointer items-start gap-3"
                >
                  <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="
                      mt-1 h-4 w-4
                      cursor-pointer
                      rounded
                      border-gray-600
                      bg-gray-900
                      accent-indigo-600
                    "
                  />

                  <div>
                    <span className="block text-sm font-medium text-gray-200">
                      Make this skill public
                    </span>

                    <span className="mt-1 block text-sm text-gray-500">
                      Public skills appear in the gallery and can be viewed by
                      anyone.
                    </span>
                  </div>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-800 pt-6 sm:flex-row sm:justify-end">
                <Link
                  href="/dashboard/skills"
                  className="
                    inline-flex items-center justify-center
                    rounded-lg
                    border border-gray-700
                    bg-gray-800
                    px-5 py-2.5
                    text-sm font-medium text-gray-300
                    transition
                    hover:border-gray-600
                    hover:bg-gray-700
                    hover:text-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-gray-600
                  "
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    inline-flex min-w-32
                    items-center justify-center gap-2
                    rounded-lg
                    bg-indigo-600
                    px-5 py-2.5
                    text-sm font-medium text-white
                    transition
                    hover:bg-indigo-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500/40
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isSubmitting && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}

                  {isSubmitting ? "Creating..." : "Create Skill"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateSkillForm;
