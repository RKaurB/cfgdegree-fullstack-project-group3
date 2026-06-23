import { useSelector } from 'react-redux'
  let url = "http://localhost:3000/garden/"

  export async function AddNewPlantToDashboard(prop){
      const currentUsername = useSelector((state) => state.user.username)
      let fullUrl = `${url}AddNewPlant`
      let date = new Date();
      let stringDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      let res = await fetch(fullUrl,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            userId: currentUsername,
            plantAPI:prop.plantAPI,
            commonName:prop?.commonName,
            scientificName:prop?.scientificName,
            imageURL:prop?.imageURL,
            plantType:prop?.plantType,
            dateAdded: stringDate
        })
      } 
    );
    return res;    
  }
  export async function GetSavedPlantList(){
    let fullUrl = `${url}GetAllSavedPlantList`
    let res = await fetch(fullUrl,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      } 
    );
    return res;    
  }
    export async function GetAPlantINFO(id){
    let fullUrl = `${url}GetAllSavedPlantList/${id}`
    let res = await fetch(fullUrl,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      } 
    );
    return res;    
  }
     export async function RemovePlantFromGarden(id){
    let fullUrl = `${url}RemovePlantFromList/${id}`
    let res = await fetch(fullUrl,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
      } 
    );
    return res;    
  }
