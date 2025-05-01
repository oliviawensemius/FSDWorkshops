import { useState, useEffect } from "react";
import { tutorialApi, Tutorial } from "../services/api";

export default function TutorialList() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTutorialId, setEditingTutorialId] = useState<number | null>(
    null
  );
  const [editTutorial, setEditTutorial] = useState<Partial<Tutorial>>({});

  const [newTutorial, setNewTutorial] = useState({
    title: "",
    description: "",
    content: "",
    difficulty: "",
    author: "",
  });

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const data = await tutorialApi.getAllTutorials();
      setTutorials(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tutorials");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTutorial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await tutorialApi.createTutorial(newTutorial);
      setNewTutorial({
        title: "",
        description: "",
        content: "",
        difficulty: "",
        author: "",
      });
      fetchTutorials();
    } catch (err) {
      setError("Failed to create tutorial");
    }
  };

  const handleDeleteTutorial = async (id: number) => {
    try {
      await tutorialApi.deleteTutorial(id);
      fetchTutorials();
    } catch (err) {
      setError("Failed to delete tutorial");
    }
  };

  const handleUpdateTutorial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTutorialId) return;

    try {
      await tutorialApi.updateTutorial(editingTutorialId, editTutorial);
      setEditingTutorialId(null);
      setEditTutorial({});
      fetchTutorials();
    } catch (err) {
      setError("Failed to update tutorial");
    }
  };

  const startEditing = (tutorial: Tutorial) => {
    setEditingTutorialId(tutorial.id);
    setEditTutorial({
      title: tutorial.title,
      description: tutorial.description,
      content: tutorial.content,
      difficulty: tutorial.difficulty,
      author: tutorial.author,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tutorial Management</h1>

      {/* Create Tutorial Form */}
      <form onSubmit={handleCreateTutorial} className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Create New Tutorial</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newTutorial.title}
            onChange={(e) =>
              setNewTutorial({ ...newTutorial, title: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={newTutorial.author}
            onChange={(e) =>
              setNewTutorial({ ...newTutorial, author: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Difficulty"
            value={newTutorial.difficulty}
            onChange={(e) =>
              setNewTutorial({ ...newTutorial, difficulty: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={newTutorial.description}
            onChange={(e) =>
              setNewTutorial({ ...newTutorial, description: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Content"
            value={newTutorial.content}
            onChange={(e) =>
              setNewTutorial({ ...newTutorial, content: e.target.value })
            }
            className="p-2 border rounded col-span-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Tutorial
        </button>
      </form>

      {/* Tutorials List */}
      <div className="grid gap-4">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="p-4 border rounded">
            {editingTutorialId === tutorial.id ? (
              <form onSubmit={handleUpdateTutorial} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={editTutorial.title}
                    onChange={(e) =>
                      setEditTutorial({
                        ...editTutorial,
                        title: e.target.value,
                      })
                    }
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    value={editTutorial.author}
                    onChange={(e) =>
                      setEditTutorial({
                        ...editTutorial,
                        author: e.target.value,
                      })
                    }
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Difficulty"
                    value={editTutorial.difficulty}
                    onChange={(e) =>
                      setEditTutorial({
                        ...editTutorial,
                        difficulty: e.target.value,
                      })
                    }
                    className="p-2 border rounded"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={editTutorial.description}
                    onChange={(e) =>
                      setEditTutorial({
                        ...editTutorial,
                        description: e.target.value,
                      })
                    }
                    className="p-2 border rounded"
                    required
                  />
                  <textarea
                    placeholder="Content"
                    value={editTutorial.content}
                    onChange={(e) =>
                      setEditTutorial({
                        ...editTutorial,
                        content: e.target.value,
                      })
                    }
                    className="p-2 border rounded col-span-2"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTutorialId(null);
                      setEditTutorial({});
                    }}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl">{tutorial.title}</h3>
                  <p className="text-gray-600">By: {tutorial.author}</p>
                  <p className="text-gray-600">
                    Difficulty: {tutorial.difficulty}
                  </p>
                  <p className="text-gray-600 mt-2">{tutorial.description}</p>
                  <div className="mt-2 p-2 bg-gray-100 rounded">
                    <p className="text-gray-800">{tutorial.content}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(tutorial)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTutorial(tutorial.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
