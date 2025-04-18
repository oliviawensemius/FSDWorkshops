import { Geist } from "next/font/google";
import { DollarProvider } from "../context/DollarContext";
import { AddDollars } from "../components/AddDollars";
import { DisplayDollars } from "../components/DisplayDollars";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <DollarProvider>
      <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <main className="max-w-md mx-auto flex flex-col gap-8 items-center">
          <h1 className="text-2xl font-bold">Dollar Value Tracker</h1>
          <DisplayDollars />
          <AddDollars />
        </main>
      </div>
    </DollarProvider>
  );
}
