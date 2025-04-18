// Import necessary React hooks
import { useEffect, useState } from "react";

// Define the shape of the data we expect from the dog API
interface DogResponse {
  url: string; // The URL of the dog image
}

export default function Home() {
  // State management using React hooks
  const [dogUrl, setDogUrl] = useState<string>(""); // Stores the URL of the current dog image
  const [loading, setLoading] = useState<boolean>(true); // Tracks if we're currently fetching data
  const [error, setError] = useState<string | null>(null); // Stores any error messages that occur

  // Function to fetch a random dog image from the API
  const fetchDog = async () => {
    try {
      setLoading(true); // Show loading state
      setError(null); // Clear any previous errors

      // Make API request to get random dog image
      const response = await fetch("https://random.dog/woof.json");

      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Failed to fetch dog");
      }

      // Parse the JSON response
      const data: DogResponse = await response.json();

      // Update the dog URL in state
      setDogUrl(data.url);
    } catch (err) {
      // Handle any errors that occur during the fetch
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      // Always set loading to false when the operation is complete
      setLoading(false);
    }
  };

  // useEffect hook runs when the component mounts (empty dependency array)
  useEffect(() => {
    fetchDog();
  }, []);

  // The JSX that defines what the component renders
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Random Dog Viewer
        </h1>

        <div className="flex flex-col items-center gap-4">
          {/* Conditional rendering based on loading and error states */}
          {loading ? (
            <p className="text-lg">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <img
              src={dogUrl}
              alt="Random dog"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          )}

          {/* Button to fetch a new dog image */}
          <button
            onClick={fetchDog}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Get Another Dog
          </button>
        </div>
      </main>
    </div>
  );
}
