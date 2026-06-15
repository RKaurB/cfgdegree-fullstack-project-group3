// Import Express
const express = require("express");

// Create router object (to group together plant endpoints)
const router = express.Router();

// Import PlantService functions
const { searchPlants, getPlantDetails } = require("../Services/PlantService");

router.get("/search", async(req, res) => {

    try {

        // Read query parameter from URL, e.g. /search?q=carrot)
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



module.exports = router;