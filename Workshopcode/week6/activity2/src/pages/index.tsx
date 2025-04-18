import WhackAMole from "../components/WhackAMole";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Whack-a-Mole Game
        </h1>

        <WhackAMole />
      </main>
    </div>
  );
}
