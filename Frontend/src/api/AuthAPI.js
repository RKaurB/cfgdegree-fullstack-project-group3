  let url = "http://localhost:3000/"
  export async function LoginAPI(email,pass){
    let fullUrl = `${url}login`
      let res = await fetch(fullUrl,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:email,
          password:pass
        })
      }
    );
    return res;
  }

  export async function RegisterAPI(name,email,pass){
    let fullUrl = `${url}register`
      let res = await fetch(fullUrl,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:name,  
          email:email,
          password:pass
        })
      }
    );
    return res;
  }

    export async function SignOutAPI(){
    let fullUrl = `${url}signout`
      let res = await fetch(fullUrl,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        }
      }
    );
    return res;
  }

  export default LoginAPI;
