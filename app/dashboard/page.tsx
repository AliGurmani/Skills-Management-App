"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Skill {
  id: number | string;
  name: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const { user, isAuthenticated, isLoading } = useAuth();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      fetchUserSkills();
    }
  }, [user]);

  const fetchUserSkills = async () => {
    try {
      setLoadingSkills(true);
      setError("");

      const response = await fetch("/api/skills", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch skills");
      }

      setSkills(data.skills || []);
    } catch (error) {
      console.error("Failed to fetch skills:", error);

      setError(
        error instanceof Error ? error.message : "Failed to load your skills.",
      );
    } finally {
      setLoadingSkills(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#080808]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-800 border-t-indigo-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const publicSkills = skills.filter((skill) => skill.isPublic).length;
  const privateSkills = skills.filter((skill) => !skill.isPublic).length;

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <main className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Welcome back, {user?.name}!
            </p>
          </div>

          <Link
            href="/dashboard/skills/new"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          >
            + Create Skill
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap items-stretch">
          <div className="min-w-[120px] border-r border-gray-800 px-5 first:pl-0">
            <p className="text-xs font-medium text-gray-500">Total Skills</p>

            <p className="mt-2 text-3xl font-semibold text-white">
              {skills.length}
            </p>
          </div>

          <div className="min-w-[120px] border-r border-gray-800 px-5">
            <p className="text-xs font-medium text-gray-500">Public</p>

            <p className="mt-2 text-3xl font-semibold text-indigo-500">
              {publicSkills}
            </p>
          </div>

          <div className="min-w-[120px] px-5">
            <p className="text-xs font-medium text-gray-500">Private</p>

            <p className="mt-2 text-3xl font-semibold text-pink-500">
              {privateSkills}
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Your Skills</h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage and access the skills you have created.
              </p>
            </div>

            {skills.length > 0 && (
              <Link
                href="/dashboard/skills"
                className="text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
              >
                Browse all skills →
              </Link>
            )}
          </div>

          {/* Loading Skills */}
          {loadingSkills && (
            <div className="mt-5 flex min-h-[250px] items-center justify-center rounded-xl border border-gray-800 bg-[#111318]">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-800 border-t-indigo-500" />
            </div>
          )}

          {/* Error */}
          {!loadingSkills && error && (
            <div className="mt-5 rounded-xl border border-red-900 bg-red-950/30 px-5 py-4">
              <p className="text-sm text-red-400">{error}</p>

              <button
                type="button"
                onClick={fetchUserSkills}
                className="mt-3 text-sm font-medium text-red-300 transition hover:text-red-200"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loadingSkills && !error && skills.length === 0 && (
            <div className="mt-5 flex min-h-[275px] items-center justify-center rounded-xl border border-gray-800 bg-[#171b22] px-6 py-12">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center text-4xl">
                  📝
                </div>

                <h3 className="mt-4 text-lg font-semibold text-white">
                  No skills yet
                </h3>

                <p className="my-2 text-sm text-gray-400">
                  Create your first agent skill to get started.
                </p>

                <Link
                  href="/dashboard/skills/new"
                  className="mt-3 inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  Create Skill
                </Link>
              </div>
            </div>
          )}

          {/* Skill Cards */}
          {!loadingSkills && !error && skills.length > 0 && (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {skills.map((skill) => (
                <Link
                  key={skill.id}
                  href={`/dashboard/skills/${skill.id}`}
                  className="group flex min-h-[230px] flex-col rounded-2xl border border-gray-800 bg-[#111318] p-6 transition duration-200 hover:-translate-y-1 hover:border-gray-700 hover:bg-[#151820] hover:shadow-xl hover:shadow-black/20"
                >
                  {/* Top */}
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

                  {/* Content */}
                  <div className="mt-5">
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
        </section>
      </main>
    </div>
  );
}
