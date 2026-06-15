const {Account} = require("./Auth/Account")
const {PlantSaved} = require("./Database/Scheme/PlantSaved")
let account = new Account(); 
let plantSaved = new PlantSaved()


account.LoginIn("test12@gi.com","G/2%,J];Muge<<8M").then((res)=>{
       /* let g = {
        "plantId": 2320,
        "userId": `${res.UID}`,
        "plantName": "Carrot",
        "scientificName": "scientific name",
        "plantType": "Vegetable",
        "plantCareLevel": "High",
        "sunlight": "Full sun",
        "watering": "Frequent",
        "imageURL": "URL",
        "dateAdded": "2026-06-01"
}
   plantSaved.AddNewDocument(g).then((res1)=>{
    console.log(res1)

   })&*/

   plantSaved.GetCurrentUserSavedPlantList().then((res1)=>{
    res1.data.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
   })
}).catch((error)=>{
    console.log(error)


})

