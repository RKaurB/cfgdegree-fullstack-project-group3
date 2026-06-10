require("dotenv").config();
const { searchPlants } = require("./Services/PerenualService");
const express = require("express")
const {Account} = require("./Auth/Account")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const account = new Account();
app.post("/login", async (req,res)=>{
    const fieldInput  =  ["email","password"];
    if(!checkIfParameterAvailable(req.body,fieldInput)){
        res.status(400).send({ message: "Bad Request" });
        return;
    }
    const {email, password} = await req.body;
    const result = await account.LoginIn(email,password);
    res.status(result.status).send(result);
})

app.post("/register",async (req,res)=>{
    const fieldInput = ["name","email","password"]
    if(!checkIfParameterAvailable(req.body,fieldInput)){
        res.status(400).send({ message: "Bad Request" });
        return;
    }
    const {name,email, password} = await req.body;
    const result = await account.SignUp (name,email,password);
    res.status(result.status).send(result);

})

app.post("/signout", async ()=>{
  
})


function checkIfParameterAvailable(obj, field) {
  for (let i = 0; i < field.length; i++) {
    if (obj?.[field[i]] == null || obj?.[field[i]] == "") return false;
  }

  return true;
}

app.listen(3000,(err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listen At PORT 3000`);
});

// Test: verify .env variables loading correctly
// console.log(process.env.PERENUAL_API_KEY);

// Import search function


/* 
// Test Perenual search endpoint
const testSearch = async () => {
  try {

    const data = await searchPlants("cilantro");
    // const data = await searchPlants("tarragon");
    // const data = await searchPlants("rosemary");
    // const data = await searchPlants("fennel");
    // const data = await searchPlants("dahlia");
    // const data = await searchPlants("qwerty123");

    // console.log(data);
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {

    console.error(error);

  }

};

testSearch(); 
*/

