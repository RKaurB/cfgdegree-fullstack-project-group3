import {FirebaseDB} from "../Database/Firebase.js"
export class Account{
    constructor(){
        this.firebase = new FirebaseDB()
    }

    async LoginIn(email,password,isGoogle){
        try{
            if(!isGoogle){
                const user = await this.firebase.loginUserUsingEmail(email,password);
                return {
                    name:user.user?.displayName,
                    email:user.user?.email
                }
            }
        }catch(error){
            return error
        }
    }
       async SignUp(name,email,password){
        try{
            const user = await this.firebase.createUserUsingEmail(name,email,password);
            return {
                name:user.user?.displayName,
                email:user.user?.email
            }

        }catch(error){
            return error;
        }
    }
    async SignoutCurrentAccount(){
        try{
            await this.firebase.Signout();
        }catch(error){
        return error
        }
    }
    
}