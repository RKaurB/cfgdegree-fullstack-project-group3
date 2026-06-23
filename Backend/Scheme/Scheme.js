const {FirebaseDB} = require("../Database/Firebase")
class Scheme{
    constructor(fields){
        this.firebase = new FirebaseDB()
        this.fields = fields;
    }
    async AddNewDocument(props,tablename){
            try{
                if(!this.checkIfParameterAvailable(props)){
                    return {

                        status : 400,
                        message: "Missing Fields"
                    }
                }

                let res = await this.firebase.AddDataToCollection(tablename,props);
                return res;
            }catch(error){
                return{
                        status : 500,
                        message: error
                }
            }

 
    }

    checkIfParameterAvailable(obj) {
        for (let i = 0; i < this.fields.length; i++) {
            if (obj?.[this.fields[i]] == null || obj?.[this.fields[i]] == "") return false;
        }

        return true;
    }
}
module.exports = {Scheme};