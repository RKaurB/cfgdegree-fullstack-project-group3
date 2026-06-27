const {Account} = require("./Auth/Account")
const {PlantSaved} = require("./Scheme/PlantSaved")
let account = new Account(); 
let plantSaved = new PlantSaved()


account.LoginIn("test12@gi.com","G/2%,J];Muge<<8M").then((res)=>{
      let g = {
        "plantApiId": 2320,
        "userId": `${res.UID}`,
        "commonName": "APPLE",
        "scientificName": "scientific name",
        "plantType": "Fruit",
        "plantCareLevel": "High",
        "sunlight": "Full sun",
        "watering": "Frequent",
        "imageURL": "URL",
        "dateAdded": "2026-06-01"
}
   plantSaved.AddNewDocument(g).then((res1)=>{
    console.log(res1)

   })
  /*plantSaved.GetCurrentUserSavedPlantList().then((res1)=>{
    console.log(res1.data)
})*/
}).catch((error)=>{
    console.log(error)


})

