const { initializeApp } = require('firebase/app')
const { getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        updateProfile,
        deleteUser
} = require('firebase/auth')
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite')
const dotenv = require('dotenv')
dotenv.config()

 class FirebaseDB{
    #db;
    #auth;
    constructor(){
      const firebaseConfig = {
            apiKey: `${process.env.ApiKey}`,
            authDomain: "fullstackgroup3-610c2.firebaseapp.com",
            projectId: "fullstackgroup3-610c2",
            storageBucket: "fullstackgroup3-610c2.firebasestorage.app",
            messagingSenderId: "667266312602",
            appId: `${process.env.AppID}`,
            measurementId: `${process.env.MeasurementId}`
        }   
        const app = initializeApp(firebaseConfig);
        this.#db = getFirestore(app)
        this.#auth = getAuth(app)
    }

    //Auth
    async createUserUsingEmail(name,email,password) {
        try{
            const userCredential = await createUserWithEmailAndPassword(this.#auth,email,password);
            await updateProfile(userCredential.user,{
                displayName:`${name}`
            })

            return {user:userCredential.user}
        }catch(error){
            return {
                errorCode: error?.code,
                errorMessage:error?.message
            }
        }
    }
    async checkIfUserIsSign(email){
        const user = await this.#auth.currentUser
        if(user == null) return false;
        return (user.email === email);
    }
    async loginUserUsingEmail(email,password){

        try{
            const userCredential = await  signInWithEmailAndPassword(this.#auth,email,password);
            //userCredential.
    
            return {user:userCredential?.user}
        }catch(error){

            return {
                errorCode: error?.code,
                errorMessage:error?.message
            }
        }
    }
    async Signout(){
        try{
            await signOut(this.#auth)
        }catch(error){
        return{
            errorCode: error?.code,
            errorMessage:error?.message
        }
        }
    }

    async DeleteCurrentUser(){
        const user = this.#auth.currentUser;
        try{
            deleteUser(user)
        }catch(error){

        }
        
    }
    //////Collection
            
}
module.exports = {FirebaseDB}