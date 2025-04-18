import { useQuery } from "@tanstack/react-query";

interface DogResponse {
  url: string;
}

async function fetchDog(): Promise<DogResponse> {
  const response = await fetch("https://random.dog/woof.json");
  if (!response.ok) {
    throw new Error("Failed to fetch dog");
  }
  return response.json();
}

export default function DogQuery() {
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["dog"],
    queryFn: fetchDog,
  });

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Random Dog Viewer (TanStack Query)
        </h1>

        <div className="flex flex-col items-center gap-4">
          {isLoading ? (
            <p className="text-lg">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : (
            <>
              <img
                src={data?.url}
                alt="Random dog"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-500">
                Last fetched: {new Date(dataUpdatedAt).toLocaleTimeString()}
              </p>
            </>
          )}

          <button
            onClick={() => refetch()}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Get Another Dog
          </button>
        </div>
      </main>
    </div>
  );
}
