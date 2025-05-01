import { useEffect, useState } from "react";

interface DogResponse {
  url: string;
}

export default function Home() {
  const [dogUrl, setDogUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [useAsyncAwait, setUseAsyncAwait] = useState<boolean>(true);

  // Fetch using async/await
  const fetchDogAsyncAwait = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://random.dog/woof.json");

      if (!response.ok) {
        throw new Error("Failed to fetch dog");
      }

      const data: DogResponse = await response.json();
      setDogUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Fetch using then/catch
  const fetchDogThenCatch = () => {
    setLoading(true);
    setError(null);

    fetch("https://random.dog/woof.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch dog");
        }
        return response.json();
      })
      .then((data: DogResponse) => {
        setDogUrl(data.url);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Choose which fetch method to use
  const fetchDog = () => {
    if (useAsyncAwait) {
      fetchDogAsyncAwait();
    } else {
      fetchDogThenCatch();
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Random Dog Viewer
        </h1>

        <div className="flex justify-center mb-4">
          <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
            <button
              onClick={() => setUseAsyncAwait(true)}
              className={`px-4 py-2 rounded-md ${
                useAsyncAwait
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              async/await
            </button>
            <button
              onClick={() => setUseAsyncAwait(false)}
              className={`px-4 py-2 rounded-md ${
                !useAsyncAwait
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              then/catch
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4 text-sm bg-gray-100 p-2 rounded">
            Currently using: <strong>{useAsyncAwait ? "async/await" : "then/catch"}</strong>
          </p>

          <div className="flex flex-col items-center gap-4">
            {loading ? (
              <div className="flex items-center justify-center h-64 w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg w-full">
                <p className="font-bold">Error:</p>
                <p>{error}</p>
              </div>
            ) : (
              <div className="overflow-hidden">
                <img
                  src={dogUrl}
                  alt="Random dog"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            )}

            <button
              onClick={fetchDog}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Another Dog"}
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Comparison: async/await vs then/catch</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-blue-600">async/await</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>More readable and resembles synchronous code</li>
                <li>Easier to understand code flow</li>
                <li>Better for complex sequences of asynchronous operations</li>
                <li>Uses try/catch blocks for error handling (familiar syntax)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-green-600">then/catch</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>More explicit about the promise chain</li>
                <li>Works in older JavaScript environments</li>
                <li>Can be more concise for simple operations</li>
                <li>Chaining multiple operations is visually distinct</li>
              </ul>
            </div>

            <p className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
              <strong>Which is better?</strong> In modern JavaScript, async/await is generally preferred for readability and error handling, but both approaches are valid and sometimes using then/catch makes more sense for certain use cases.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
