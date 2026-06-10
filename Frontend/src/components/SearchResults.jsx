import PlantCard from "./PlantCard.jsx";

function SearchResults({ plants, onViewDetails }) {
  return (
    <div className="grid">
      {/* If no plants match search, show message */}
      {plants.length === 0 ? (
        <p>No plants found 🌱</p>
      ) : (
        // Loop through filtered plants and render a card for each one
        plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onViewDetails={onViewDetails}
          />
        ))
      )}
    </div>
  );
}

export default SearchResults;
