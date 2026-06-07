const { FirebaseDB } = require("../Database/Firebase")

class Account{
    constructor(){
        this.firebase = new FirebaseDB()
    }

    async LoginIn(email,password){
        try{
                const user = await this.firebase.loginUserUsingEmail(email,password);
                const token = await user.user?.getIdToken()
                if(token == null){
                return{
                    status : 400,
                    message: user.errorCode
                }
                }
                return {
                    status: 200,
                    name:user.user?.displayName,
                    email:user.user?.email,
                    ID: token,
                    message:"Login Successfully"
                }

        }catch(error){
            return {
                status:500,
                message:error
            }
        }
    }
    async SignUp(name,email,password){
        try{
            const user = await this.firebase.createUserUsingEmail(name,email,password);
            const token = await user.user?.getIdToken()
            if(token == null){
                return{
                    status : 409,
                    message: user.errorCode
                }
            }
            return {
                name:user.user?.displayName,
                email:user.user?.email,
                ID: token,
                status: 201,
                message: "Account is created"
            }

        }catch(error){
            return {
                status:500,
                message:error
            }
        }
    }
    async SignoutCurrentAccount(){
        try{
            await this.firebase.Signout();
        }catch(error){
        return error
        }
    }
    async DeleteCurrentAccount(){
        try{
            await this.firebase.DeleteCurrentUser()
        }catch(error){
            console.error(error)
        }
    }
    
}

module.exports = {Account}
