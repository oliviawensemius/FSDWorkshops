import { useFetch } from "../hooks/useFetch";

interface DogResponse {
  url: string;
}

export default function DogFetcher() {
  const { data, loading, error, refetch } = useFetch<DogResponse>(
    "https://random.dog/woof.json"
  );

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Random Dog Viewer (Custom Hook)
        </h1>

        <div className="flex flex-col items-center gap-4">
          {loading ? (
            <p className="text-lg">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <img
              src={data?.url}
              alt="Random dog"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          )}

          <button
            onClick={refetch}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Get Another Dog
          </button>
        </div>
      </main>
    </div>
  );
}
