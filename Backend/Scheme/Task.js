const { Scheme } = require("./Scheme");
const { where, and, Timestamp } = require("firebase/firestore/lite");
class Task extends Scheme {
  constructor() {
    super([
      "userId",
      "savedPlantID",
      "commonName",
      "frequencyDays",
      "dueDate",
      "completed",
      "completedDate",
      "createdDate",
      "taskName",
    ]);
    this.tablename = "Task";
  }

  async AddNewDocument(props) {
    let res = await super.AddNewDocument(props, this.tablename);
    return res;
  }

  async GetCurrentUserTaskList() {
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
  async GetCurrentUserListWithActiveOrComplete(completed) {
    try {
      let res =
        await this.firebase.GetCollectionThatContainCurrentUserWithCustomQuery(
          this.tablename,
          where("completed", "==", completed),
        );
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
  }
  async UpdateCurrentUserTaskForCompletion(plantTaskID, completedValue) {
    try {
      let date = null;
      if (completedValue == true) {
        let dateFull = new Date();
        date = `${dateFull.getFullYear()}-${dateFull.getMonth() + 1}-${dateFull.getDate()}`;
      }
      let props = {
        completed: completedValue,
        completedDate: date,
      };
      let res = await this.firebase.UpdateDocumentFromCollection(
        this.tablename,
        plantTaskID,
        props,
      );
      return res;
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
  }

  async DeleteCurrentUserAllSavedPlantTasks(plantID) {
    try {
      //   // Temp debugging test
      //   console.log("\nDELETE TASKS FOR PLANT:", plantID);
      let res = await this.firebase.RemoveMulipleDocFromCollection(
        this.tablename,
        where("savedPlantID", "==", plantID),
      );
      //   // Temp debugging test
      //    console.log("\nDELETE TASK RESULT:", res);
      return res;
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
  }
}

module.exports = { Task };
