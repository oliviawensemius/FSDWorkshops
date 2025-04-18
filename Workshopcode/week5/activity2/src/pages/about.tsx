import Header from "../components/Header";

export default function About() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="max-w-2xl mx-auto row-start-2">
        <h1 className="text-3xl font-bold mb-4">About Our Website</h1>
      </main>
    </div>
  );
}
