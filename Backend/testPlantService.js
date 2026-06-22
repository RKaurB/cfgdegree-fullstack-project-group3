
require("dotenv").config();

const { searchPlants, getPlantDetails } = require("./Services/PlantService");

async function runTest() {

    console.log("\n===== TEST PLANT SEARCH =====\n");
    const searchResults = await searchPlants("carrot");
    // Successfully returns search results
    // const results = await searchPlants("");
    // const results = await searchPlants(" ");
    // Returns error: Search term is required
    // const results = await searchPlants("test123");
    // Returns empty array
    console.log(searchResults);

    console.log("\n===== TEST PLANT DETAILS =====\n");
    const plantDetails = await getPlantDetails(2320);
    console.log(plantDetails);
    
    console.log("\n===== TEST INVALID PLANT ID =====\n");
    const invalidPlant = await getPlantDetails(99999999999);
    // Returns Error: Unable to retrieve data from Perenual API
    // const invalidPlant = await getPlantDetails("abc123")
    // Returns Error: Unable to retrieve data from Perenual API
    console.log(invalidPlant);

}

runTest();