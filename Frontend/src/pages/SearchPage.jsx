import { useState,useEffect } from "react";

import SearchBar from "../components/SearchBar.jsx";
import SearchResults from "../components/SearchResults.jsx";
import PlantDetailsModal from "../components/PlantDetailsModal.jsx";
import LoadingSection from "../components/LoadingSection.jsx";
import "../styles/plantDiscovery.css";
import {SearchPlantAPI} from"../api/PlantServiceAPI.js";


function SearchPage() {
  // Stores the user's search input
  const [query, setQuery] = useState("");

  // Change only when user click search button
  const [searchTerm, setSearchTerm] = useState("");

  // Stores the plant clicked by the user
  // If null its closed
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [filterPlantList,setFilteredPlantList] = useState([])

  // Tracks whether plant search results are loading
  const [loading, setLoading] = useState(false);

  // Tracks whether user has searched
  const [hasSearched, setHasSearched] = useState(false);
  
  useEffect(() => {
    // If user hasn't yet searched, stop here and don't fetch anything
    if (!hasSearched) return;

    const fetchPlants = async () => {
      try {
        setLoading(true);

        const res = await SearchPlantAPI(searchTerm.toLowerCase());
        const data = await res.json();

          if (res?.status == 200) {
            setFilteredPlantList(data);
          } else {
            setFilteredPlantList([]);
          }
      } catch {
        setFilteredPlantList([]);
        return;
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlants();

    return () => {
      console.log("Clean up");
    };
  }, [searchTerm, hasSearched]);

  const handleSearch = () => {
    setHasSearched(true);
    setSearchTerm(query);
  };

  return (
    <div className="container">
      {/* Page title */}
      <h1>🌿 Discover Beginner Friendly Plants</h1>

      {/* Search input */}
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      
      {/* Grid of plant cards */}
      {/* Show loading indicator while searching */}
      {loading && <LoadingSection text="Searching for plants..." />}
      {/* Show plant results after searching */}
      {!loading && (
        <SearchResults 
          plants={filterPlantList}
          onViewDetails={setSelectedPlant} 
          hasSearched={hasSearched}
        />
      )}

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