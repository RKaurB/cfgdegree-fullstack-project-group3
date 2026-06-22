const express = require("express");
const {PlantSaved} = require("../Scheme/PlantSaved")
const router = express.Router();
const plantSave = new PlantSaved()

router.post("/AddNewPlant", async (req,res)=>{
    try{
        let result = await plantSave.AddNewDocument(req.body)
        res.status(result.status).json(result)
    }catch(error){
        res.status(500).json({status:500,message: "Server Error"})
    }
})

router.get("/GetAllSavedPlantList", async (req,res)=>{
    try{
        let result = await plantSave.GetCurrentUserSavedPlantList()
        res.status(result.status).json(result)

    }catch(error){
        res.status(500).json({status:500,message: "Server Error"})
    }
})

router.get("/GetSavedPlant/:id",async (req,res)=>{
    try{
        let id = req.params.id
        let result = await plantSave.GetCurrentUserSingleSavePlant(id)
        res.status(result.status).json(result)
    }catch(error){
        res.status(500).json({status:500,message: "Server Error"})
    }
})


router.delete("/RemovePlantFromList/:id", async (req,res)=>{
    try{
        let id = req.params.id
        let result = await plantSave.RemoveItemPlantList(id)
        res.status(result.status).json(result)
    }catch(error){
        res.status(500).json({status:500,message: "Server Error"})
    }
})

module.exports = router;