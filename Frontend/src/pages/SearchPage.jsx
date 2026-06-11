import { useState } from "react";

import SearchBar from "../components/SearchBar.jsx";
import SearchResults from "../components/SearchResults.jsx";
import PlantDetailsModal from "../components/PlantDetailsModal.jsx";
import mockPlants from "../data/mockPlants.js";
import "../styles/plantDiscovery.css";

function SearchPage() {
  // Stores the user's search input
  const [query, setQuery] = useState("");

  // Stores the plant clicked by the user
  // If null its closed
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Filter plants based on search input
  const filteredPlants = mockPlants.filter((plant) =>
    plant.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      {/* Page title */}
      <h1>🌿 Discover Beginner Friendly Plants</h1>

      {/* Search input */}
      <SearchBar query={query} setQuery={setQuery} />

      {/* Grid of plant cards */}
      <SearchResults
        plants={filteredPlants}
        onViewDetails={setSelectedPlant}
      />

      {/* Modal appears when a plant selected */}
      {selectedPlant && (
        <PlantDetailsModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </div>
  );
}

export default SearchPage;