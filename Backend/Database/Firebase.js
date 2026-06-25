const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser,
} = require("firebase/auth");
const {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  and,
  limit,
} = require("firebase/firestore/lite");
const dotenv = require("dotenv");
dotenv.config();

class FirebaseDB {
  #db;
  #auth;
  constructor() {
    const firebaseConfig = {
      apiKey: `${process.env.FIREBASE_APIKEY}`,
      authDomain: "fullstackgroup3-610c2.firebaseapp.com",
      projectId: "fullstackgroup3-610c2",
      storageBucket: "fullstackgroup3-610c2.firebasestorage.app",
      messagingSenderId: "667266312602",
      appId: `${process.env.FIREBASE_APPID}`,
      measurementId: `${process.env.FIREBASE_MeasurementID}`,
    };
    const app = initializeApp(firebaseConfig);
    this.#db = getFirestore(app);
    this.#auth = getAuth(app);
  }

  //Auth
  async createUserUsingEmail(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.#auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, {
        displayName: `${name}`,
      });

      return { user: userCredential.user };
    } catch (error) {
      return {
        errorCode: error?.code,
        errorMessage: error?.message,
      };
    }
  }
  async checkIfUserIsSign(email) {
    const user = await this.#auth.currentUser;
    if (user == null) return false;
    return user.email === email;
  }
  async loginUserUsingEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.#auth,
        email,
        password,
      );
      return { user: userCredential?.user };
    } catch (error) {
      return {
        errorCode: error?.code,
        errorMessage: error?.message,
      };
    }
  }

  async Signout(){
    try{
        let res =  await signOut(this.#auth)
        return{
            status: 200,
            message:"User Sign Out Successful"
           }
        }catch(error){
        return{
            errorCode: error?.code,
            errorMessage:error?.message
        }
    }
  }

  async DeleteCurrentUser() {
    const user = this.#auth.currentUser;
    try {
      await deleteUser(user);
    } catch (error) {
      return {
        errorCode: error?.code,
        errorMessage: error?.message,
      };
    }
  }


  //////Collection

  async AddDataToCollection(tablename, data) {
    try {
      const res = await addDoc(collection(this.#db, tablename), data);
      return {
        status: 200,
        data: res,
      };
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
}

  async GetCollectionThatContainCurrentUser(tablename) {
    try {
      const col = collection(this.#db, tablename);

      const user = await this.#auth.currentUser?.uid;

      if (user == null) {
        return {
          status: 404,
          error: "You are not login in",
        };
      }
      let q = query(col, where("userId", "==", `${user}`));
      const querySnapshot = await getDocs(q);
      let data = this.ConvertQuerySnapshotToJson(querySnapshot);
      return {
        status: 200,
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
  }

  async GetCollectionThatContainCurrentUserWithCustomQuery(tablename, custom) {
    try {
      const col = collection(this.#db, tablename);
      const user = await this.#auth.currentUser?.uid;
      if (user == null) {
        return {
          status: 404,
          error: "You are not login in",
        };
      }
      //query(citiesRef, where("state", "==", "CA"));
      let q = query(col, and(where("userId", "==", `${user}`), custom));
      const querySnapshot = await getDocs(q);
      let data = this.ConvertQuerySnapshotToJson(querySnapshot);
      return {
        status: 200,
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
  }

  // Get collection using custom query
  // (Does NOT require logged-in Firebase user)
  async GetCollectionWithCustomQuery(tablename, custom) {
    try {
      // Reference to collection
      const col = collection(this.#db, tablename);
      // Run custom query
      const q = query(col, custom);
      // Get matching documents
      const querySnapshot = await getDocs(q);
      // Convert Firebase docs to JSON
      let data = this.ConvertQuerySnapshotToJson(querySnapshot);

      return { status: 200, data: data };
    } catch (error) {
      return { status: 500, error: error };
    }
  }

  async RemoveDocumentFromCollection(tablename, ID) {
    try {
      let res = await deleteDoc(doc(this.#db, tablename, ID));
      return {
        status: 200,
        data: "Delete Successful",
      };
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
  }
  async RemoveMulipleDocFromCollection(tablename, custom) {
    try {
      // let res = await this.GetCollectionThatContainCurrentUserWithCustomQuery(tablename,custom)

      /* 
            TODO: Added to support Postman testing for task deletion, DOES NOT filter by authenticated User.
            Review once Firebase Authentication fully integrated, to ensure Users can only access/delete their own tasks!
            */
      let res = await this.GetCollectionWithCustomQuery(tablename, custom);
      if (res.status != 200) {
        return res;
      }
      // // Temp debugging test
      // console.log("\nTASKS FOUND:");
      // console.log(res.data);

      for (const item of res.data || []) {
        await deleteDoc(doc(this.#db, tablename, item.id));
      }
      return {
        status: 200,
        message: "Delete Successful",
      };
    } catch (error) {
      return {
        status: 500,
        error: error.message || error,
      };
    }
  }

  async UpdateDocumentFromCollection(tablename, ID, props) {
    try {
      let res = await updateDoc(doc(this.#db, tablename, ID), props);
      return {
        status: 200,
        data: "Delete Successful",
      };
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
  }

  ConvertQuerySnapshotToJson(data) {
    let output = [];

    for (let d of data.docs) {
      let docs = d.data();
      docs["id"] = d.id;
      output.push(docs);
    }
    return output;
  }
}
module.exports = { FirebaseDB };
