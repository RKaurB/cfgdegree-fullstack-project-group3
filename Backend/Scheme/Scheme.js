const { FirebaseDB } = require("../Database/Firebase");
class Scheme {
  constructor(fields) {
    this.firebase = new FirebaseDB();
    this.fields = fields;
  }
  async AddNewDocument(props, tablename) {
    try {
      if (!this.checkIfParameterAvailable(props)) {
        return {
          status: 400,
          message: "Missing Fields",
        };
      }

      let res = await this.firebase.AddDataToCollection(tablename, props);
      return res;
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }

//   checkIfParameterAvailable(obj) {
//     for (let i = 0; i < this.fields.length; i++) {
//       if (obj?.[this.fields[i]] == null || obj?.[this.fields[i]] == "")
//         return false;
//     }

//     return true;
//   }

  // Check all required fields exist and contain values
  checkIfParameterAvailable(obj) {
    // Loop through every required field in this.fields
    for (let i = 0; i < this.fields.length; i++) {
        // Get current field name from array
        const fieldName = this.fields[i];
        // Get value stored in that field object
        const fieldValue = obj[fieldName];
        // Show field name and value
        // console.log("Checking field:", fieldName);
        // console.log("Value:", fieldValue);
        // Check if field missing (null or empty)
        if (fieldValue === null || fieldValue === "" || fieldValue === undefined) {
            return false;
        }
    }
    // If all fields pass validation
    return true;
  }

}
module.exports = { Scheme };
