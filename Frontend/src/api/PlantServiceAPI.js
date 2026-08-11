 let url = "https://garden-buddy-l8k7.onrender.com/api/plants/"
  export async function SearchPlantAPI(name){
    let fullUrl = `${url}search?q=${name}`
      let res = await fetch(fullUrl,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      }
    );
    return res;
  }

  export async function GetPlantByIdAPI(id){
    let fullUrl = `${url}${id}`
      let res = await fetch(fullUrl,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      }
    );
    return res;
  }
