"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type Skill = {
  id: string;
  name: string;
  description: string;
  content?: string;
  category?: string;
  isPublic: boolean;
  createdAt: string;
  userId?: string;
};

const SkillsPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [search, setSearch] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsFetching(true);
        setError("");

        const response = await fetch("/api/skills", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch skills");
        }

        setSkills(data.skills ?? data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading skills.",
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchSkills();
  }, []);

  const visibleSkills = useMemo(() => {
    let filtered = skills.filter((skill) => {
      if (skill.isPublic) return true;

      if (isAuthenticated && skill.userId === user?.id) {
        return true;
      }

      return false;
    });

    if (search.trim()) {
      const query = search.toLowerCase();

      filtered = filtered.filter(
        (skill) =>
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query) ||
          skill.category?.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [skills, search, isAuthenticated, user?.id]);

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <main className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Skills
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Browse public skills and discover reusable workflows.
            </p>
          </div>

          {isAuthenticated && (
            <Link
              href="/dashboard/skills/new"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            >
              + Create Skill
            </Link>
          )}
        </div>

        {/* Search / Summary */}
        <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Available Skills
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {visibleSkills.length} skill
              {visibleSkills.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {/* Search */}
          <div className="w-full lg:max-w-md">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search skills..."
                className="w-full rounded-lg border border-gray-800 bg-[#111318] py-3 pl-12 pr-4 text-sm text-gray-100 outline-none transition placeholder:text-gray-600 hover:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading || isFetching ? (
          <div className="mt-6 flex min-h-[300px] items-center justify-center rounded-xl border border-gray-800 bg-[#111318]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-800 border-t-indigo-500" />
          </div>
        ) : error ? (
          <div className="mt-6 rounded-xl border border-red-900 bg-red-950/30 px-5 py-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : visibleSkills.length === 0 ? (
          <div className="mt-6 flex min-h-[275px] items-center justify-center rounded-xl border border-gray-800 bg-[#171b22] px-6 py-12">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center text-4xl">
                🔎
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">
                No skills found
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Try searching with a different keyword.
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-4 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Skill Cards */
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleSkills.map((skill) => (
              <Link
                key={skill.id}
                href={`/skills/${skill.id}`}
                className="group flex min-h-[230px] flex-col rounded-2xl border border-gray-800 bg-[#111318] p-6 transition duration-200 hover:-translate-y-1 hover:border-gray-700 hover:bg-[#151820] hover:shadow-xl hover:shadow-black/20"
              >
                {/* Card Top */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 bg-gray-900 text-lg">
                    ⚡
                  </div>

                  {skill.isPublic ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-900 bg-emerald-950/40 px-2.5 py-1 text-xs font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Public
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-900 px-2.5 py-1 text-xs font-medium text-gray-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                      Private
                    </span>
                  )}
                </div>

                {/* Category */}
                {skill.category && (
                  <div className="mt-4">
                    <span className="inline-flex rounded-md border border-gray-800 bg-gray-900 px-2.5 py-1 text-xs font-medium text-gray-500">
                      {skill.category}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-100 transition group-hover:text-indigo-400">
                    {skill.name}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                    {skill.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                    <span className="text-xs text-gray-600">
                      {new Date(skill.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    <span className="text-sm font-medium text-indigo-400 transition group-hover:text-indigo-300">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SkillsPage;
