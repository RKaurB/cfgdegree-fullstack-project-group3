const { Scheme } = require("./Scheme.js");
const { Task } = require("./Task");
const { generateTasks } = require("../Services/SchedulingService.js");
const { where, and, documentId } = require("firebase/firestore/lite");

class PlantSaved extends Scheme {
  constructor() {
    super([
      "userId",
      "plantApiId",
      "commonName",
      "scientificName",
      "imageURL",
      "plantType",
      "dateAdded",
    ]);
    this.tablename = "PlantSaved";
    // Add Task instance
    this.task = new Task();
  }

//   async AddNewDocument(props) {
//     let res = await super.AddNewDocument(props, this.tablename);
//     return res;
//   }

//   async AddNewDocument(props) {

//     let res = await super.AddNewDocument(props, this.tablename);

//     if (res.status !== 200) {
//         return res;
//     }
//     console.log("Plant saved successfully");

//     const generatedTask = generateTasks(props, props.dateAdded);
//     console.log("Generated tasks:");
//     console.log(generateTasks);

//     return res;
//   }

  async AddNewDocument(props) {

    // Save plant
    let res = await super.AddNewDocument(props, this.tablename);

    // If save fails, then stop
    if (res.status !== 200) {
        return res;
    }
    console.log("\nPLANT SAVED\n");
    console.log(props);

    // Generate Tasks
    const generatedTasks = generateTasks(props, props.dateAdded);
    console.log("\nGENERATED TASKS\n");
    console.log(generatedTasks);

    return res;

  }


  async GetCurrentUserSavedPlantList() {
    try {
      let res = await this.firebase.GetCollectionThatContainCurrentUser(
        this.tablename,
      );
      return res;
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
  }
  async GetCurrentUserSingleSavePlant(ID) {
    try {
      let res =
        await this.firebase.GetCollectionThatContainCurrentUserWithCustomQuery(
          this.tablename,
          where(documentId(), "==", ID),
        );
      return res;
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
  }
  async RemoveItemPlantList(plantID) {
    try {
      let res = await this.firebase.RemoveDocumentFromCollection(
        this.tablename,
        plantID,
      );
      return res;
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
}

module.exports = { PlantSaved };

/*4. Save tasks
Tasks are stored in Firebase.

Example:

{
"userId": 3,
"plantID": 2320,
"plantName": "carrot",
"taskType": "Check soil and water if dry",
"frequencyDays": 1,
"dueDate": "2026-06-02",
"completed": false
}

{
"plantId": 2320,
"userId": "3",
"plantName": "Carrot",
"plantType": "Vegetable",
"plantCareLevel": "High",
"sunlight": "Full sun",
"watering": "Frequent",
"imageURL": "URL",
"dateAdded": "2026-06-01"
}


*/
