import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type Skill = {
  id: string;
  name: string;
  category?: string;
  description: string;
  content?: string;
  isPublic?: boolean;
  createdAt: string;
};

type SkillPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const getSkill = async (id: string): Promise<Skill | null> => {
  try {
    const requestHeaders = await headers();

    const host = requestHeaders.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    if (!host) {
      console.error("Host header is missing");
      return null;
    }

    const response = await fetch(
      `${protocol}://${host}/api/skills/${encodeURIComponent(id)}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          cookie: requestHeaders.get("cookie") ?? "",
        },
      },
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      console.error(
        "Failed to fetch skill:",
        response.status,
        response.statusText,
      );

      return null;
    }

    const data = await response.json();

    return data.skill ?? data;
  } catch (error) {
    console.error("Failed to fetch skill:", error);

    return null;
  }
};

const SkillPage = async ({ params }: SkillPageProps) => {
  const { id } = await params;

  const skill = await getSkill(id);

  if (!skill) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <main className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-indigo-400">
              Skill Details
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              {skill.name}
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              View the details and instructions for this skill.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-5 text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:bg-gray-700 hover:text-white"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            {/* Description */}
            <section className="rounded-2xl border border-gray-800 bg-[#111318]">
              <div className="border-b border-gray-800 px-6 py-4">
                <h2 className="text-base font-semibold text-gray-100">
                  Description
                </h2>
              </div>

              <div className="px-6 py-5">
                <p className="text-sm leading-7 text-gray-400">
                  {skill.description}
                </p>
              </div>
            </section>

            {/* Skill Content */}
            {skill.content && (
              <section className="rounded-2xl border border-gray-800 bg-[#111318]">
                <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
                  <div>
                    <h2 className="text-base font-semibold text-gray-100">
                      Skill Content
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      Instructions and configuration for this skill.
                    </p>
                  </div>

                  <span className="rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1 text-xs font-medium text-gray-400">
                    Markdown
                  </span>
                </div>

                <div className="p-5">
                  <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl border border-gray-800 bg-[#080808] p-5 font-mono text-sm leading-7 text-gray-300">
                    {skill.content}
                  </pre>
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Information */}
            <section className="rounded-2xl border border-gray-800 bg-[#111318]">
              <div className="border-b border-gray-800 px-5 py-4">
                <h2 className="text-sm font-semibold text-gray-100">
                  Skill Information
                </h2>
              </div>

              <div className="divide-y divide-gray-800">
                <div className="px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Name
                  </p>

                  <p className="mt-1 break-words text-sm text-gray-200">
                    {skill.name}
                  </p>
                </div>

                {skill.category && (
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Category
                    </p>

                    <div className="mt-2">
                      <span className="inline-flex rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1 text-xs font-medium text-gray-300">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Visibility
                  </p>

                  <div className="mt-2">
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
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Created
                  </p>

                  <p className="mt-1 text-sm text-gray-300">
                    {new Date(skill.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </section>

            {/* Actions */}
            <section className="rounded-2xl border border-gray-800 bg-[#111318] p-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                Actions
              </p>

              <div className="space-y-2">
                <Link
                  href={`/dashboard/skills/${skill.id}/edit`}
                  className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
                >
                  Edit Skill
                </Link>

                <Link
                  href="/dashboard"
                  className="flex w-full items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white"
                >
                  Back to Dashboard
                </Link>

                {skill.isPublic && (
                  <Link
                    href="/dashboard/skills"
                    className="flex w-full items-center justify-center rounded-lg border border-gray-800 px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-gray-900 hover:text-gray-200"
                  >
                    Browse Public Skills
                  </Link>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkillPage;
