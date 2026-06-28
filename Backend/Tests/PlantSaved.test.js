const { PlantSaved } = require("../Scheme/PlantSaved")
const { Account } = require("../Auth/Account")

let plantSaved
let account 
beforeAll(() => {
  plantSaved = new PlantSaved();
  account = new Account();
});

// Test if plant has been successfully deleted from user profile with a mock plant ID
test("Plant deleted successfully from user profile", async ()=>{
  let g = {
        "plantApiId": 2320,
        "userId": "17",
        "commonName": "APPLE",
        "scientificName": "scientific name",
        "plantType": "Fruit",
        "plantCareLevel": "High",
        "sunlight": "Full sun",
        "watering": "Frequent",
        "imageURL": "URL",
        "dateAdded": "2026-06-01"
}
    const result = await plantSaved.AddNewDocument(g)
    const result1 = await plantSaved.RemoveItemPlantList(result.data.id)
    expect(await result1.status).toBe(200)
    expect(await result1.data).toMatch(/Delete Successful/)
  
});

// Test if the user failed to add a plant to the database
test("User failed to add plant to database",async ()=>{
    let g = {
        "plantApiId": 2320,
        "userId": "17",
        "scientificName": "scientific name",
        "plantType": "Fruit",
        "plantCareLevel": "High",
        "sunlight": "Full sun",
        "watering": "Frequent",
        "imageURL": "URL",
        "dateAdded": "2026-06-01"
}
    const result = await plantSaved.AddNewDocument(g)
    expect(await result.status).toBe(400)
   });

// jest.mock("../Scheme/PlantSaved")

// const dataFromAPI = require("../Scheme/PlantSaved")

// test("Plant deleted from user profile", async ()=>{
//     dataFromAPI.mockResolvedValue({ data: "Mock plant" });

//     const result5 = await dataFromAPI();
//     expect (result).toEqual({ data: "Mock plant" });
// });


// test("Plant deleted from user profile", async ()=>{
//     const result5 = jest.fn().mockResolvedValue({ success:true });
//     const response = await result5();
    
//     await expect(response.sucess).toBe(true);

// });
    

// Test if the user failed to add a plant to the database - DELETE
// test("Test if new plant was not added", async () => {
//     const result3 = jest.fn()

//     result3.mockResolvedValue({ data: "Mocked Plant" });
    
//     const result4 = await plantSaved();
//     expect(await result4).toEqual({ data: "Mocked Plant" });
// });




// Test if we can get a users plant ID
test("Get users list of plants", async ()=>{
    const result = await account.LoginIn("test12@gi.com","G/2%,J];Muge<<8M")
    const result2 = await plantSaved.GetCurrentUserSavedPlantList()
    expect(await result2.status).toBe(200)
    expect(result2?.data).toBeDefined()

});

// Test if plant saved successfully to user profile

test("New plant saved successfully to database",async ()=>{
    let g = {
        "plantApiId": 2320,
        "userId": "17",
        "commonName": "APPLE",
        "scientificName": "scientific name",
        "plantType": "Fruit",
        "plantCareLevel": "High",
        "sunlight": "Full sun",
        "watering": "Frequent",
        "imageURL": "URL",
        "dateAdded": "2026-06-01"
}
    const result = await plantSaved.AddNewDocument(g)
    expect(await result.status).toBe(200)
    if (result.status == 200){
        await plantSaved.RemoveItemPlantList(result.data.id)
    }

   });


