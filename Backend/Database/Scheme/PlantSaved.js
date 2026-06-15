const {FirebaseDB} = require("../Firebase.js")
class PlantSaved{
    constructor(){
        this.firebase = new FirebaseDB()
        this.tablename = "PlantSaved"
        this.fields = ["userId","plantId","plantName","scientificName","imageURL","plantType",]
    }

    async AddNewDocument(props){
        try{
            if(!this.#checkIfParameterAvailable(props)){
                return {

                    status : 400,
                    message: "Missing Fields"
                }
            }

            let res = await this.firebase.AddDataToCollection(this.tablename,props);
            if(!res.successful){
                return{
                    status : 500,
                    message: res?.error
                }
            }
            return{
                status:200,
                data: res?.data
            }
        }catch(error){
            return{
                    status : 500,
                    message: error
            }
        }

        
    }

    async GetCurrentUserSavedPlantList(){
        try{
            let res = await this.firebase.GetCollectionThatContainCurrentUser(this.tablename)
            return res;
        }
        catch(error){
            return {
                status:500,
                message: error,
            }
        }
    }
    async RemoveItemPlantList(plantID){
        try{
             let res = await this.firebase.RemoveDocumentFromCollection(this.tablename,plantID)
        }catch(error){

        }

    }

    #checkIfParameterAvailable(obj) {
        for (let i = 0; i < this.fields.length; i++) {
            if (obj?.[this.fields[i]] == null || obj?.[this.fields[i]] == "") return false;
        }

        return true;
    }
}

module.exports = {PlantSaved}


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