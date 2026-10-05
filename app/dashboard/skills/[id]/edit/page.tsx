"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type Skill = {
  id: number;
  name: string;
  description: string;
  content: string;
  isPublic: boolean;
  category?: string;
};

const EditSkillPage = () => {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, isLoading } = useAuth();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  // Fetch existing skill
  useEffect(() => {
    if (isLoading || !isAuthenticated || !id) {
      return;
    }

    const fetchSkill = async () => {
      try {
        setIsFetching(true);
        setError("");

        const response = await fetch(`/api/skills/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch skill");
        }

        const skill: Skill = data.skill ?? data;

        setName(skill.name ?? "");
        setDescription(skill.description ?? "");
        setContent(skill.content ?? "");
        setIsPublic(skill.isPublic ?? false);
      } catch (err) {
        console.error("Fetch skill error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while loading the skill.",
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchSkill();
  }, [id, isAuthenticated, isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!name.trim() || !description.trim() || !content.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/skills/${id}/edit`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          content: content.trim(),
          isPublic,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update skill");
      }

      setMessage("Skill updated successfully.");

      router.push(`/dashboard/skills/${id}`);
      router.refresh();
    } catch (err) {
      console.error("Update skill error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while updating the skill.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#080808]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-800 border-t-indigo-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <main className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-8">
        {/* Header */}
        <div className="mb-6">
          <p className="mb-2 text-sm font-medium text-indigo-400">
            Skill Management
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Edit Skill
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Update the skill details and Markdown instructions.
          </p>
        </div>

        {/* Form */}
        <section className="rounded-2xl border border-gray-800 bg-[#111318] shadow-xl shadow-black/10">
          <div className="border-b border-gray-800 px-6 py-5">
            <h2 className="text-base font-semibold text-gray-100">
              Skill Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Modify the information below and save your changes.
            </p>
          </div>

          <div className="p-6">
            {/* Success */}
            {message && (
              <div
                aria-live="polite"
                className="mb-5 rounded-lg border border-emerald-900 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-400"
              >
                {message}
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-400"
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. web-design-guidelines"
                  className="block w-full rounded-lg border border-gray-700 bg-[#080808] px-4 py-2.5 text-sm text-gray-100 outline-none transition placeholder:text-gray-600 hover:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Use a short and descriptive name for the skill.
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of what this skill does"
                  className="block w-full rounded-lg border border-gray-700 bg-[#080808] px-4 py-2.5 text-sm text-gray-100 outline-none transition placeholder:text-gray-600 hover:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Content */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="content"
                    className="text-sm font-medium text-gray-300"
                  >
                    Skill Content
                    <span className="ml-1 text-red-400">*</span>
                  </label>

                  <span className="rounded-md border border-gray-700 bg-gray-900 px-2 py-1 text-[11px] font-medium text-gray-400">
                    Markdown
                  </span>
                </div>

                <textarea
                  id="content"
                  name="content"
                  rows={14}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your skill instructions..."
                  className="block w-full resize-y rounded-lg border border-gray-700 bg-[#080808] px-4 py-3 font-mono text-sm leading-6 text-gray-200 outline-none transition placeholder:text-gray-600 hover:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Update your skill metadata and instructions using Markdown.
                </p>
              </div>

              {/* Visibility */}
              <div className="rounded-lg border border-gray-800 bg-[#080808] p-4">
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
                    className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-900 accent-indigo-600"
                  />

                  <div>
                    <span className="block text-sm font-medium text-gray-200">
                      Make this skill public
                    </span>

                    <span className="mt-1 block text-sm text-gray-500">
                      Public skills appear in the skill library and can be
                      viewed by anyone.
                    </span>
                  </div>
                </label>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-800 pt-6 sm:flex-row sm:justify-end">
                <Link
                  href={`/dashboard/skills/${id}`}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:bg-gray-700 hover:text-white"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-w-36 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}

                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditSkillPage;
