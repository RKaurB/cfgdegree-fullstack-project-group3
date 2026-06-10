// Search for plants using the Perenual API
const searchPlants = async (query) => {
    
    // Get API key from .env
    const apiKey = process.env.PERENUAL_API_KEY;

    // Send GET request to Perenual search endpoint
    const response = await fetch(
        `https://perenual.com/api/v2/species-list?key=${apiKey}&q=${query}`
    )

    // Convert JSON response into JS object
    const data = await response.json();

    return data;

}

// Export function
module.exports = { searchPlants };