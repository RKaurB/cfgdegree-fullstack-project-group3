import { useState,useEffect } from "react";

import SearchBar from "../components/SearchBar.jsx";
import SearchResults from "../components/SearchResults.jsx";
import PlantDetailsModal from "../components/PlantDetailsModal.jsx";
import LoadingSection from "../components/LoadingSection.jsx";
// import mockPlants from "../data/mockPlants.js";
import "../styles/plantDiscovery.css";
// import {SearchPlantAPI,GetPlantByIdAPI} from"../api/PlantServiceAPI.js";
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

  // Filter plants based on search input
  // const filteredPlants = mockPlants.filter((plant) =>
  //   plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);

        const res = await SearchPlantAPI(searchTerm.toLowerCase());
        const data = await res.json();

        // SearchPlantAPI(searchTerm.toLowerCase()).then(async (res) => {
        //   let data = await res.json();
          if (res?.status == 200) {
            setFilteredPlantList(data);
            // setLoading(false);
            // return;
          } else {
            setFilteredPlantList([]);
            // setLoading(false);
          }
      // } catch (e) {
      } catch {
        setFilteredPlantList([]);
        // setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    };
    
    // setFilteredPlantList([]);
    fetchPlants();

    return () => {
      console.log("Clean up");
    };
  }, [searchTerm]);

  const handleSearch = () => {
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
        <SearchResults plants={filterPlantList} onViewDetails={setSelectedPlant} />
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