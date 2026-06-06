import { initializeApp } from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword }from 'firebase/auth'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

class FirebaseDB{
    #db;
    #auth;
    constructor(){
      const firebaseConfig = {
            apiKey: "AIzaSyASj27ho_BDwAO-RjlEEi4eZksepZt0Qqs",
            authDomain: "fullstackgroup3-610c2.firebaseapp.com",
            projectId: "fullstackgroup3-610c2",
            storageBucket: "fullstackgroup3-610c2.firebasestorage.app",
            messagingSenderId: "667266312602",
            appId: "1:667266312602:web:14f126f1cb3ef401007223",
            measurementId: "G-Q4BZQE6KJ8"
        }   
        const app = initializeApp(firebaseConfig);
        this.#db = getFirestore(app)
        this.#auth = getAuth(app)
    }

    async createUserUsingEmail(email,password) {
        try{
            const userCredential = await createUserWithEmailAndPassword(this.#auth,email,password);
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
            
}