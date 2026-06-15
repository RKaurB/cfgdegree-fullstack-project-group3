// Import PerenualService functions that communicate with Perenual API
const {
  searchPlants: searchPerenualPlants,
  getPlantDetails: getPerenualPlantDetails,
} = require("./PerenualService");

// Search plants and return simplified Garden Buddy response
async function searchPlants(searchTerm) {
  // User must enter a search term, cannot be blank or empty spaces
  if (!searchTerm || searchTerm.trim() === "") {
    throw new Error("Search term is required");
  }

  // Call Perenual service and return raw plant data from API
  const plants = await searchPerenualPlants(searchTerm);

  // If no plant data is returned, return an empty array instead
  if (!plants.data) {
    return [];
  }

  // map() loops through every plant returned by the API
  // and creates a new simplified plant object for Garden Buddy
  return plants.data.map((plant) => {
    // Default values used if data not provided by Perenual
    let scientificName = "Unknown";
    let image = null;

    // Use first scientific name if available
    if (plant.scientific_name) {
      scientificName = plant.scientific_name[0];
    }

    // Use thumbnail image if available
    if (plant.default_image) {
      image = plant.default_image.thumbnail;
    }

    // Return simplified Garden Buddy plant search results data
    return {
      // Perenual plant ID
      id: plant.id,
      // Common plant name displayed to users
      // (Garden Buddy common name, mapped from Perenual common_name)
      commonName: plant.common_name || "Unknown",
      // Garden Buddy scientific name
      // (first value from Perenual scientific_name array)
      scientificName: scientificName,
      // Garden Buddy thumbnail image for search results
      // (mapped from Perenual default_image.thumbnail)
      image: image,
    };
  });
}

// Retrieve detailed information for a specific plant
// and return simplified Garden Buddy response
async function getPlantDetails(id) {
  // Request detailed plant data from Perenual API
  const plant = await getPerenualPlantDetails(id);

  // Default values used if data not provided by Perenual
  let scientificName = "Unknown";
  let image = null;

  // Use first scientific name if available
  if (plant.scientific_name) {
    scientificName = plant.scientific_name[0];
  }

  // Use regular image if available
  if (plant.default_image) {
    image = plant.default_image.regular_url;
  }

  // Return simplified Garden Buddy plant details
  return {
    // Perenual plant ID
    id: plant.id,
    // Common plant name displayed to users
    commonName: plant.common_name || "Unknown",
    // Garden Buddy scientific name
    scientificName: scientificName,
    // Plant type (to be used for Scheduling)
    type: plant.type || null,
    // General plant care effort level returned by Perenual
    // (e.g. Low, Moderate, or High)
    maintenance: plant.maintenance || "Unknown",
    // Watering requirements
    watering: plant.watering || "Unknown",
    // Sunlight requirements
    sunlight: plant.sunlight || [],
    // Garden Buddy regular image for plant details
    // (mapped from Perenual default_image.regular_url)
    image: image,
    // Plant description
    description: plant.description || "Information unavailable",
  };
}

module.exports = { searchPlants, getPlantDetails };
