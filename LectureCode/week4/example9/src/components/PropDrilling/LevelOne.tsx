import LevelTwo from "./LevelTwo";

type LevelOneProps = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export default function LevelOne({
  count,
  increment,
  decrement,
}: LevelOneProps) {
  return (
    <div className="p-4 border-2 border-blue-500 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Level One (Prop Drilling)</h2>
      <p className="mb-4">Count: {count}</p>
      <LevelTwo count={count} increment={increment} decrement={decrement} />
    </div>
  );
}
