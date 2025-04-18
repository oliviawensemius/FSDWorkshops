import { useDollarContext } from "../context/DollarContext";

export function DisplayDollars() {
  const { total, resetDollars } = useDollarContext();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
      <button
        onClick={resetDollars}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  );
}
