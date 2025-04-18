import { useReducer } from "react";

// Define the types
type Item = {
  id: number;
  name: string;
  price: number;
};

type CartState = {
  items: Item[];
  total: number;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" };

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
};

// Reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case "REMOVE_ITEM":
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (!itemToRemove) return state;
      return {
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - itemToRemove.price,
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

// Sample items
const sampleItems: Item[] = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 699 },
  { id: 3, name: "Headphones", price: 199 },
];

export default function Home() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
              <button
                onClick={() => dispatch({ type: "ADD_ITEM", payload: item })}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {state.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            <ul className="space-y-2 mb-4">
              {state.items.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-4">
                    <span>${item.price}</span>
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: item.id })
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
              <p className="font-bold">Total: ${state.total}</p>
              <button
                onClick={() => dispatch({ type: "CLEAR_CART" })}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
