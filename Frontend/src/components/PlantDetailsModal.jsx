import {GetPlantByIdAPI} from "../api/PlantServiceAPI";
import { AddNewPlantToDashboard } from "../api/SavedPlantAPI";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'



function PlantDetailsModal({ plant, onClose }) {
  const [plantDetail,setPlantDetail] = useState(null)
  const currentUsername = useSelector((state) => state.user.id)
  const nav = useNavigate();

  useEffect(()=>{
      const fetchdata = () =>{GetPlantByIdAPI(plant.id).then(async (res)=>{
        if(res.status == 200){
          let data = await res.json()
          setPlantDetail(data)
        }
      })}
      fetchdata();
  },[])

  const AddItemGarden = ()=>{
    if(plantDetail == null) return;
        AddNewPlantToDashboard(plantDetail,currentUsername).then(async (res)=>{
      let data = await res.json();
      if(res.ok){
        nav("/dashboard");
      }else{
        alert("Fail to Add Plant To Garden")
      }
      console.log(data)
    })
  }

  return (plantDetail && (
    <>
      {/* Modal overlay background */}
      <div className="modal-overlay" onClick={onClose}>

        {/* Modal box content */}
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Close button */}
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>

          {/* Plant image */}
          <img src={plantDetail.image} alt={plantDetail.commonName} />

          {/* Title */}
          <h2>{plantDetail.commonName}</h2>

          {/* Plant info */}
          <p>🌱 Difficulty: {plantDetail.maintenance}</p>
          <p>☀️ Light: {plantDetail.sunlight}</p>
          <p>💧 Water: {plantDetail.watering}</p>

          {/* Description */}
          <p className="description">
            {plantDetail.description || "No description available."}
          </p>

          {/* Action button */}
          <button className="btn-garden-dark" onClick={AddItemGarden}>
            + Add to My Garden
          </button>

        </div>
      </div>
    </>
));
}

export default PlantDetailsModal;