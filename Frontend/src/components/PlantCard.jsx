import "./PlantCard.css";
import plantPlaceholder from "../assets/images/plant-placeholder.png";

function PlantCard({ plant, onViewDetails }) {
  const handleClick = () => {
    // seen on console when clicked
    console.log("Plant clicked:", plant);

    // Calls function
    if (onViewDetails) {
      onViewDetails(plant);
    }
  };

  // Display placeholder image by default
  let imageToDisplay = plantPlaceholder;
  // If API returns a plant image, display that instead
  if (plant.image) {
    imageToDisplay = plant.image;
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={imageToDisplay} alt={plant.commonName} />

      <h3>{plant.commonName}</h3>

      <button
        className="btn-garden-dark"
        onClick={(e) => {
          e.stopPropagation(); // prevents double clicking
          handleClick(); // opens modal
        }}
      >
        View Details
      </button>
    </div>
  );
}

export default PlantCard;
