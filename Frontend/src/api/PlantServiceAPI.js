let url = import.meta.env.VITE_API_URL
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
