import LevelThree from "./LevelThree";

type LevelTwoProps = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export default function LevelTwo({
  count,
  increment,
  decrement,
}: LevelTwoProps) {
  return (
    <div className="p-4 border-2 border-green-500 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Level Two (Prop Drilling)</h2>
      <LevelThree count={count} increment={increment} decrement={decrement} />
    </div>
  );
}
