import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg">
          This is a simple example of a React application with multiple pages
          and client-side navigation.
        </p>
        <div className="flex gap-4">
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
