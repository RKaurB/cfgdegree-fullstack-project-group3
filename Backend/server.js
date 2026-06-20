require("dotenv").config({ path: '../.env' });
const express = require("express")
const {Account} = require("./Auth/Account")
const cors = require('cors');
// Import Plant API routes
const plantRoutes = require("./Routes/PlantRoutes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// All plant endpoints start with /api/plants - handled by PlantRoutes.js
app.use("/api/plants", plantRoutes);
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

app.listen(process.env.BACKEND_PORT,(err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listen At PORT ${process.env.BACKEND_PORT}`);
});



