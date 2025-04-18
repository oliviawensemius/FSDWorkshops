import { useEffect, useState } from "react";

interface Pet {
  id: number;
  name: string;
  type: string;
}

const initialPets: Pet[] = [
  { id: 1, name: "Daisy", type: "Dog" },
  { id: 2, name: "Saphira", type: "Cat" },
];

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet>({
    id: 0,
    name: "",
    type: "Dog",
  });

  useEffect(() => {
    // Load pets from localStorage on component mount
    const storedPets = localStorage.getItem("pets");
    if (storedPets) {
      setPets(JSON.parse(storedPets));
    } else {
      // Initialize with default data if nothing in localStorage
      setPets(initialPets);
      localStorage.setItem("pets", JSON.stringify(initialPets));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPet.id || !selectedPet.name) return;

    // Check if pet with this ID exists
    const existingPet = pets.find((pet) => pet.id === selectedPet.id);

    let updatedPets;
    if (existingPet) {
      // Update existing pet
      updatedPets = pets.map((pet) =>
        pet.id === selectedPet.id ? selectedPet : pet
      );
    } else {
      // Create new pet
      updatedPets = [...pets, selectedPet];
    }

    setPets(updatedPets);
    localStorage.setItem("pets", JSON.stringify(updatedPets));

    // Reset form
    setSelectedPet({
      id: 0,
      name: "",
      type: "Dog",
    });
  };

  // Determine if we're updating or creating
  const isUpdating = pets.some((pet) => pet.id === selectedPet.id);

  return (
    <div className="p-8">
      {/* Pet Table */}
      <table className="w-full mb-8 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td className="border border-gray-300 p-2">{pet.id}</td>
              <td className="border border-gray-300 p-2">{pet.name}</td>
              <td className="border border-gray-300 p-2">{pet.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pet Form */}
      <div className="border border-gray-300 p-4 rounded">
        <h2 className="text-xl mb-4">Pet</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="number"
              value={selectedPet.id || ""}
              onChange={(e) =>
                setSelectedPet({ ...selectedPet, id: parseInt(e.target.value) })
              }
              placeholder="ID"
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={selectedPet.name}
              onChange={(e) =>
                setSelectedPet({ ...selectedPet, name: e.target.value })
              }
              placeholder="Name"
              className="border p-2 rounded"
            />
            <select
              value={selectedPet.type}
              onChange={(e) =>
                setSelectedPet({ ...selectedPet, type: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isUpdating ? "Update Pet" : "Create Pet"}
          </button>
        </form>
      </div>
    </div>
  );
}
