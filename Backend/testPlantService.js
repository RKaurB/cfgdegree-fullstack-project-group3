require("dotenv").config();

const { searchPlants } = require("./Services/PlantService");

async function runTest() {

    const results = await searchPlants("carrot");
    // Successfully returns search results
    // const results = await searchPlants("");
    // const results = await searchPlants(" ");
    // Returns error: Search term is required
    // const results = await searchPlants("test123");
    // Returns empty array

    console.log(results);

}

runTest();