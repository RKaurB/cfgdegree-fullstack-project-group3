import { initializeApp } from 'firebase/app';
import {getAuth,
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut,
        updateProfile,
    }from 'firebase/auth'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import dotenv from 'dotenv'
dotenv.config()

export class FirebaseDB{
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


    //Database 

    //User 

            
}