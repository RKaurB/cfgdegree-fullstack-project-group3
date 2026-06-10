require("dotenv").config();

// Test: verify .env variables loading correctly
// console.log(process.env.PERENUAL_API_KEY);

// Import search function
const { searchPlants } = require("./Services/PerenualService");

/* 
// Test Perenual search endpoint
const testSearch = async () => {
  try {
    const data = await searchPlants("cilantro");
    // const data = await searchPlants("tarragon");
    // const data = await searchPlants("rosemary");
    // const data = await searchPlants("fennel");
    // const data = await searchPlants("dahlia");
    // const data = await searchPlants("qwerty123");
    // console.log(data);
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
};
testSearch(); 
*/


// Import plant details function
const { getPlantDetails } = require("./Services/PerenualService");

// Test Perenual plant details endpoint
const testPlantDetails = async () => {

    try {

        // Test using valid id 2320 carrot
        const data = await getPlantDetails(2320);
        // console.log(data);
        console.log(JSON.stringify(data, null, 2));

    } catch (error) {

        console.error(error);

    }
    
}

testPlantDetails();