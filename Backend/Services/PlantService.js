// Import PerenualService functions
// These functions communicate directly with Perenual API
// const { searchPlants, getPlantDetails } = require("./PerenualService");
const {
    searchPlants: searchPerenualPlants
} = require("./PerenualService");

// Search plants and return simplified Garden Buddy response
async function searchPlants(searchTerm) {

    // User must enter a search term, cannot be blank or empty spaces
    if (!searchTerm || searchTerm.trim() === "") {
        throw new Error(
            "Search term is required"
        );
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

        // Default values used when data not provided by Perenual
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

        // Return simplified Garden Buddy plant data
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
        }

    });

}

module.exports = { searchPlants }




