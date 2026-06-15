const {FirebaseDB} = require("../Database/Firebase")
class Scheme{
    constructor(fields){
        this.firebase = new FirebaseDB()
        this.fields = fields;
    }

    checkIfParameterAvailable(obj) {
        for (let i = 0; i < this.fields.length; i++) {
            if (obj?.[this.fields[i]] == null || obj?.[this.fields[i]] == "") return false;
        }

        return true;
    }
}
module.exports = {Scheme};