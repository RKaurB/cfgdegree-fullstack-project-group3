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
  // Tracks whether plant details could not be loaded
  const [error, setError] = useState(false);
  const currentUsername = useSelector((state) => state.user.id);
  const nav = useNavigate();

  useEffect(() => {
    // Fetch full plant details from Perenual API
    const fetchPlantDetails = async () => {
      try {
        // Testing - temp delay to test loading spinner
        await new Promise((resolve) => setTimeout(resolve, 4000));

        // GetPlantByIdAPI(plant.id).then(async (res) => {
        const res = await GetPlantByIdAPI(plant.id);

        if (res.status === 200) {
          const data = await res.json();

          // Temp test
          console.log(data);

          // Save returned plant info into state
          setPlantDetail(data);
        } else {
          // Else if API request fails, tell React component that plant details couldn't be loaded
          setError(true);
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

  // If plant details are still loading, show loading indicator inside modal
  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <LoadingSection text="Loading plant details..." />
        </div>
      </div>
    );
  }

  // If loading finished but no plant details returned, don't try to display plant info
  // if (plantDetail === null) {
  //   return null;
  // }

  // If API couldn't provide plant details, display appropriate message to user
  if (error) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>

          <h2>Plant details unavailable</h2>
          <p>We could not retrieve the details for this plant right now.</p>
        </div>
      </div>
    );
  }

  // Display placeholder image by default
  let imageToDisplay = plantPlaceholder;
  // If API returns a plant image, display that instead
  if (plantDetail.image) {
    imageToDisplay = plantDetail.image;
  }

  // Display normal Plant Details modal
  return (
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
          <img src={imageToDisplay} alt={plantDetail.commonName} />

          {/* Title */}
          <h2>{plantDetail.commonName}</h2>

          {/* Plant info */}
          <p>🌱 Difficulty: {plantDetail.maintenance}</p>
          <p>☀️ Light: {plantDetail.sunlight.join(", ")}</p>
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
  );
}

export default PlantDetailsModal;
