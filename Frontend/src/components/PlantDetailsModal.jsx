import { GetPlantByIdAPI } from "../api/PlantServiceAPI";
import { AddNewPlantToDashboard } from "../api/SavedPlantAPI";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSection from "./LoadingSection";
// Placeholder image used when Perenual API does not provide plant photo
import plantPlaceholder from "../assets/images/plant-placeholder.png";

function PlantDetailsModal({ plant, onClose }) {
  const [plantDetail, setPlantDetail] = useState(null);
  // Tracks whether still waiting for Perenual API response
  const [loading, setLoading] = useState(true);
  const currentUsername = useSelector((state) => state.user.id);
  const nav = useNavigate();

  useEffect(() => {
    // Fetch full plant details from Perenual API
    const fetchPlantDetails = async () => {
      try {
        // Testing - temp delay to test loading spinner
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // GetPlantByIdAPI(plant.id).then(async (res) => {
        const res = await GetPlantByIdAPI(plant.id);

        if (res.status === 200) {
          const data = await res.json();

          // Save returned plant info into state
          setPlantDetail(data);
        }
      } catch (error) {
        console.error("Failed to load plant details:", error);
      } finally {
        // Stop showing loading spinner once request finishes
        setLoading(false);
      }
    };

    fetchPlantDetails();
  }, [plant.id]);

  const AddItemGarden = () => {
    if (plantDetail === null) return;
    AddNewPlantToDashboard(plantDetail, currentUsername).then(async (res) => {
      let data = await res.json();
      if (res.ok) {
        nav("/dashboard");
      } else {
        alert("Fail to Add Plant To Garden");
      }
      console.log(data);
    });
  };
  // Display loading component instead of modal while waiting for API response
  if (loading) {
    return <LoadingSection text="Loading plant details..." />;
  }

  return (
    plantDetail && (
      <>
        {/* Modal overlay background */}
        <div className="modal-overlay" onClick={onClose}>
          {/* Modal box content */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>

            {/* Plant image */}
            <img src={plantDetail.image} alt={plantDetail.commonName} />

            {/* Title */}
            <h2>{plantDetail.commonName}</h2>

            {/* Plant info */}
            <p>🌱 Difficulty: {plantDetail.maintenance}</p>
            <p>☀️ Light: {plantDetail.sunlight}</p>
            <p>💧 Water: {plantDetail.watering}</p>

            {/* Description */}
            <p className="description">
              {plantDetail.description || "No description available."}
            </p>

            {/* Action button */}
            <button className="btn-garden-dark" onClick={AddItemGarden}>
              + Add to My Garden
            </button>
          </div>
        </div>
      </>
    )
  );
}

export default PlantDetailsModal;
