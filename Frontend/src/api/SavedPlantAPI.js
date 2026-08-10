// Use placeholder image when plant has no API image
import plantPlaceholder from "../assets/images/plant-placeholder.png";

let url = "http://localhost:3000/garden/";

export async function AddNewPlantToDashboard(prop, currentUserID) {
  let fullUrl = `${url}AddNewPlant`;
  let date = new Date();
  let stringDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  console.log({
    userId: currentUserID,
    plantApiId: prop.id,
    commonName: prop?.commonName,
    scientificName: prop?.scientificName,
    imageURL: prop.image || plantPlaceholder,
    plantType: prop?.type,
    dateAdded: stringDate,
  });
  let res = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      userId: currentUserID,
      plantApiId: prop.id,
      commonName: prop?.commonName,
      scientificName: prop?.scientificName,
      // Use API image when available, else save local placeholder image
      imageURL: prop.image || plantPlaceholder,
      plantType: prop?.type,
      dateAdded: stringDate,
    }),
  });
  return res;
}
export async function GetSavedPlantList() {
  let fullUrl = `${url}GetAllSavedPlantList`;
  let res = await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
export async function GetAPlantINFO(id) {
  let fullUrl = `${url}GetSavedPlant/${id}`;
  let res = await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
export async function RemovePlantFromGarden(id) {
  let fullUrl = `${url}RemovePlantFromList/${id}`;
  let res = await fetch(fullUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
