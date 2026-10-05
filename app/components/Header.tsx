"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      setOpen(false);

      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="w-full border-b border-gray-800 bg-[#111318] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Skills Agent App
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-6">
            {isAuthenticated && (
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
            )}

            <li>
              <Link
                href="/dashboard/skills"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Browse Skills
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-sm font-semibold text-white">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </button>

            {open && (
              <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-xl shadow-black/30">
                {/* User */}
                <div className="border-b border-gray-800 px-4 py-3">
                  <p className="text-sm font-semibold text-white">
                    {user?.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {user?.email}
                  </p>
                </div>

                {/* Links */}
                <div className="py-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/skills/new"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white"
                  >
                    Create Skill
                  </Link>

                  <div className="my-1 border-t border-gray-800" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center px-4 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-950/30 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <nav>
            <ul className="flex items-center gap-3">
              <li>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-300 transition hover:text-white"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  href="/sign-up"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
