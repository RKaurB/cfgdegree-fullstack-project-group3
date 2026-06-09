function PlantDetailsModal({ plant, onClose }) {
  return (
    <>
      {/* Modal overlay background */}
      <div className="modal-overlay" onClick={onClose}>

        {/* Modal box content */}
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Close button */}
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>

          {/* Plant image */}
          <img src={plant.image} alt={plant.name} />

          {/* Title */}
          <h2>{plant.name}</h2>

          {/* Plant info */}
          <p>🌱 Difficulty: {plant.difficulty}</p>
          <p>☀️ Light: {plant.light}</p>
          <p>💧 Water: {plant.water}</p>

          {/* Description */}
          <p className="description">
            {plant.description || "No description available."}
          </p>

          {/* Action button */}
          <button className="btn-garden-dark">
            + Add to My Garden
          </button>

        </div>
      </div>
    </>
  );
}

export default PlantDetailsModal;