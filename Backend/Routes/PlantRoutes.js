// Import Express
const express = require("express");

// Create router object (to group together plant endpoints)
const router = express.Router();

// Import PlantService functions
const { searchPlants, getPlantDetails } = require("../Services/PlantService");

// GET /api/plants/search?q=carrot
// Searches plants using query (search term) input by User
// (e.g. http://localhost:3000/api/plants/search?q=carrot)
router.get("/search", async (req, res) => {

    try {

        // Extract search term from URL query parameter 
        // (e.g. /api/plants/search?q=carrot)
        const searchTerm = req.query.q;

        // Search term must be provided
        if (!searchTerm) {
            return res.status(400).json({message: "Search term is required"});
        }

        // Call PlantService
        const plants = await searchPlants(searchTerm);

        // Return successful response
        res.status(200).json(plants);

    } catch (error) {

        console.error(error);
        res.status(500).json({message: "Failed to search plants"});

    }

});


// GET /api/plants/:id
// Returns details for the User's selected plant
// (e.g. http://localhost:3000/api/plants/2320)
router.get("/:id", async (req, res) => {

    try {

        // Extract ID from URL (e.g. /api/plants/2320)
        const plantId = req.params.id;

        // Call PlantService
        const plant = await getPlantDetails(plantId);

        // Return plant data
        res.status(200).json(plant);

    } catch (error) {

        console.error(error);
        res.status(500).json({message: "Failed to retrieve plant details"});

    }

});


module.exports = router;