import "./PlantCard.css";

function PlantCard({ plant, onViewDetails }) {
  const handleClick = () => {
    // seen on console when clicked 
    console.log("Plant clicked:", plant);

    // Calls function
    if (onViewDetails) {
      onViewDetails(plant);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      
      <img src={plant.image} alt={plant.name} />

      <h3>{plant.name}</h3>

      <p>🌱 Difficulty: {plant.difficulty}</p>
      <p>☀️ Light: {plant.light}</p>
      <p>💧 Water: {plant.water}</p>

      <button
  className="btn-garden-dark"
  onClick={(e) => {
    e.stopPropagation(); // prevents double clicking 
    handleClick();       // opens modal
  }}
>
  View Details
</button>
    </div>
  );
}

export default PlantCard;