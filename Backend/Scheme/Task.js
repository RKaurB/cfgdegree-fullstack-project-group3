const {Scheme} = require("./Scheme")
class Task extends Scheme{
    constructor(){
        super([])
        this.tablename = Task
    }
    
    async AddNewDocument(props){
            try{
                if(!super.checkIfParameterAvailable(props)){
                    return {

                        status : 400,
                        message: "Missing Fields"
                    }
                }

                let res = await super.firebase.AddDataToCollection(this.tablename,props);
                return res;
            }catch(error){
                return{
                        status : 500,
                        message: error
                }
            }

        
    }

}