const { initializeApp } = require('firebase/app')
const { getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        updateProfile,
        deleteUser,
} = require('firebase/auth')
const { getFirestore,collection, getDocs,addDoc, query,where,deleteDoc } = require('firebase/firestore/lite')
const dotenv = require('dotenv')
dotenv.config()

 class FirebaseDB{
    #db;
    #auth;
    constructor(){
      const firebaseConfig = {
            apiKey: `${process.env.FIREBASE_APIKEY}`,
            authDomain: "fullstackgroup3-610c2.firebaseapp.com",
            projectId: "fullstackgroup3-610c2",
            storageBucket: "fullstackgroup3-610c2.firebasestorage.app",
            messagingSenderId: "667266312602",
            appId: `${process.env.FIREBASE_APPID}`,
            measurementId: `${process.env.FIREBASE_MeasurementID}`
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

    async AddDataToCollection(tablename, data){
        try{
            const res = await await addDoc(collection(this.#db,tablename),data)
            return { 
                successful:true,
                data:res,
            }
        }
        catch(error){
            return {
                successful:false,
                error: error
            }
        }
        
    }

    async GetCollectionThatContainCurrentUser(tablename){
        try{
            const col = collection(this.#db,tablename);
            const user = await this.#auth.currentUser.uid
            if(user == null) {
                return {
                    staatus:404,
                    error:"You are not login in"
                }
            }
            //query(citiesRef, where("state", "==", "CA"));
            let q =  query(col,where("userId","==",`${user}`))
            const querySnapshot = await getDocs(q);
            return {
                status:200,
                data: querySnapshot,
            }
        }catch(error){
            return{
                statas: 500,
                error: error
            }
        }



    }

    async RemoveDocumentFromCollection(tablename,ID){
        try{
            let res = await deleteDoc(doc(db,tablename, ID));
            return {
                status:200,
                data: "Delete Successful",
            }
        }catch(error){
            return{
                statas: 500,
                error: error
            }
        }
    }

    
            
}
module.exports = {FirebaseDB}