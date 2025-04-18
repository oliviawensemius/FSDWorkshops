import { useState } from "react";
import { useDollarContext } from "../context/DollarContext";

export function AddDollars() {
  const [amount, setAmount] = useState("");
  const { addDollars } = useDollarContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount)) {
      addDollars(numAmount);
      setAmount("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="px-3 py-2 border rounded-md"
        step="0.01"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Dollars
      </button>
    </form>
  );
}
