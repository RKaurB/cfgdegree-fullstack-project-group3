require("dotenv").config();

// Test: verify .env variables loading correctly
// console.log(process.env.PERENUAL_API_KEY);

// Import search function
const { searchPlants } = require("./Services/PerenualService");

// Test Perenual search endpoint
const testSearch = async () => {

    const data = await searchPlants("carrot");

    // console.log(data);
    console.log(JSON.stringify(data, null, 2));

};

testSearch();