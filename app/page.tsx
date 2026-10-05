import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <header className="border-b border-gray-800/80 bg-gray-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Skill<span className="text-indigo-500">Hub</span>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/dashboard/skills"
              className="hidden text-sm font-medium text-gray-400 transition hover:text-white sm:block"
            >
              Browse Skills
            </Link>

            <Link
              href="/sign-in"
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
              Build. Share. Reuse.
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Turn your knowledge into
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                reusable skills
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              Create structured skills, keep them private or share them
              publicly, and discover reusable instructions built by others.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/skills"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Browse Skills
              </Link>

              <Link
                href="/skills/create"
                className="rounded-xl border border-gray-700 bg-gray-900 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:bg-gray-800"
              >
                Create Your Skill
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="border-y border-gray-800 bg-gray-900/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              01
            </div>

            <h3 className="text-lg font-semibold">Create Skills</h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Write reusable instructions in Markdown and organize your
              knowledge in a simple structured format.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              02
            </div>

            <h3 className="text-lg font-semibold">Share Publicly</h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Make selected skills public and allow others to discover and reuse
              your workflows.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              03
            </div>

            <h3 className="text-lg font-semibold">Discover More</h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Browse and search public skills to find useful workflows, prompts,
              and reusable knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
              Simple workflow
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to manage reusable skills
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-400">
              Create skills in Markdown, manage visibility, edit your own
              skills, and explore public knowledge from one clean interface.
            </p>

            <Link
              href="/skills"
              className="mt-7 inline-flex text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Explore the skill library →
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-2xl shadow-black/30">
            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>

              <pre className="overflow-hidden text-sm leading-7 text-gray-400">
                {`---
name: security-review
description: Review an application
---

# Security Review

1. Analyze authentication
2. Review access control
3. Check input validation
4. Report findings`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/20 to-purple-600/10 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold">
            Start building your skill library
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400">
            Save your reusable knowledge, organize it, and share the best parts
            with others.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Create Account
            </Link>

            <Link
              href="/skills"
              className="rounded-xl border border-gray-700 bg-gray-900 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:bg-gray-800"
            >
              Browse Public Skills
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} SkillHub</p>

          <div className="flex gap-5">
            <Link href="/dashboard/skills" className="hover:text-gray-300">
              Skills
            </Link>

            <Link href="/sign-in" className="hover:text-gray-300">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
