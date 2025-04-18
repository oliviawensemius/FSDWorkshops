import { useState, useMemo } from "react";

// Generate a large list of items
const generateItems = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    value: `Item ${i + 1}`,
  }));
};

const items = generateItems(10000000);

export default function Home() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // With useMemo - this will only recalculate when searchTerm changes
  const filteredItems = useMemo(() => {
    console.log("Filtering items...");
    return items.filter((item) =>
      item.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  // Without useMemo - this will recalculate on every render
  // Comment and uncomment to see the difference (swap between the two to see the difference when clicking the increment counter button)
  // const filteredItems = items.filter((item) =>
  //   item.value.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">useMemo Example</h1>

        <div className="mb-4">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            Increment Counter: {count}
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items..."
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <p className="mb-2">Filtered Items: {filteredItems.length}</p>
          <div className="max-h-96 overflow-y-auto">
            <ul>
              {/* Only show the first 10 items - just so we don't have to render all items */}
              {filteredItems.slice(0, 10).map((item) => (
                <li key={item.id} className="py-1">
                  {item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
