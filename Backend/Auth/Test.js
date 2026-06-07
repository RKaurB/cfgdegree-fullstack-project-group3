const {Account} = require("./Account")
let account = new Account(); 

account.LoginIn("test12@gi.com","G/2%,J];Muge<<8M").then((res)=>{
    console.log(res)
}).catch((error)=>{
    console.log(error)
})

/*account.SignUp("HGHJE","test12@gi.com","G/2%,J];Muge<<8M").then((res)=>{
    console.log(res)
}).catch((error)=>{
    console.log(error)
})*/