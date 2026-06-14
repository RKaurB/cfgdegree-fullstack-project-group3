// Search for plants using the Perenual API
const searchPlants = async (query) => {
    
    // Get API key from .env
    const apiKey = process.env.PERENUAL_API_KEY;

    // Send GET request to Perenual search endpoint
    const response = await fetch(
        `https://perenual.com/api/v2/species-list?key=${apiKey}&q=${query}`
    )

    // Check API request successful
    if (!response.ok) {
        throw new Error(
            "Unable to retrieve data from Perenual API"
        );
    }

    // Convert JSON response into JS object
    const data = await response.json();

    return data;

}


// Get detailed info for a specific plant
const getPlantDetails = async(id) => {

    // Get API key from .env
    const apiKey = process.env.PERENUAL_API_KEY;

    // Send GET request to Perenual details endpoint
    const response = await fetch(
        `https://perenual.com/api/v2/species/details/${id}?key=${apiKey}`
    );

    // Check API request successful
    if (!response.ok) {
        throw new Error(
            "Unable to retrieve data from Perenual API"
        );
    }

    // Convert JSON response into JS object
    const data = await response.json();

    return data;

}


// Export function
module.exports = { searchPlants, getPlantDetails };