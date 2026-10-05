import Link from "next/link";

export default function NotFoundDesign() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-6">
      <section className="text-center -translate-y-4 sm:-translate-y-8">
        <h1 className="text-[72px] leading-none sm:text-[92px] md:text-[104px] font-extrabold tracking-[-0.06em] text-[#635bff]">
          404
        </h1>

        <h2 className="mt-6 text-[24px] sm:text-[28px] font-bold tracking-[-0.02em]">
          Page Not Found
        </h2>

        <p className="mt-3 text-[15px] sm:text-[17px] text-[#9d9da3]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-7 sm:gap-9">
          <Link
            href="/"
            className="rounded-[4px] bg-[#635bff] px-6 py-3 text-[14px] sm:text-[16px] font-semibold text-white transition hover:bg-[#756fff]"
          >
            Go Home
          </Link>

          <Link
            href="/skills"
            className="text-[14px] sm:text-[16px] font-semibold text-[#d8d8dc] transition hover:text-white"
          >
            Browse Skills
          </Link>
        </div>
      </section>
    </main>
  );
}
