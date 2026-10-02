import Link from "next/link";

function Header() {
  return (
    <div className="w-full bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl font-bold">
        <Link href="/">Skills Agent App</Link>
      </h1>

      {/* Navigation */}
      <nav className="space-x-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/skills">Browse Skills</Link>
          </li>
        </ul>
      </nav>

      <nav className="space-x-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link href="/sign-up">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
