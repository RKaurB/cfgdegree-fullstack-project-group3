import React, { useState,useEffect } from "react"; 
import PlantCard from "../components/Dashboard/PlantCardComponent";
import { mockPlants } from "../data/types/SamplePlantDB";
import styles from "../../src/styles/Dashboard.module.css";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import {GetSavedPlantList,RemovePlantFromGarden} from "../api/SavedPlantAPI"
async function UserSavedList(){
  let res = await GetSavedPlantList()
  if(Math.floor(res.status/100)==2){
    let resJson = await res.json();
    console.log(JSON.stringify(resJson))
    return resJson?.data
  }
  return mockPlants
}

function Dashboard() {
  //Get Current username who login 
  const currentUsername = useSelector((state) => state.user.username)
  // For redirecting pages
  const navigate = useNavigate();

  // Temporary placeholder for user
  const placeholderUserName = "User"; 

  //Check if user have a name
  let userName = placeholderUserName
  if(currentUsername) userName = currentUsername

  // Added local state to hold data 
  const [plants, setPlants] = useState(mockPlants);

  // Modal visibility states (visible popup)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Hold the complete selected plant object instead of just text
  const [plantToDelete, setPlantToDelete] = useState(null);

  useEffect(() => {
      UserSavedList().then((res)=>{
        setPlants(res)
      })
  }, []);
  // Redirecting to care schedule pages
  const handleView = (plantName) => {
    navigate(`/schedule?plant=${encodeURIComponent(plantName)}`);
  };

  // Display popup and store the target plant object
  const openDeleteModal = (plant) => {
    setPlantToDelete(plant); // Stores the whole object {id, name, etc}
    setIsModalOpen(true); 
  };

  // Run this when user clicks "delete" inside the modal 
  const confirmDelete = () => {
    if (plantToDelete) {
     // Filter through 'plants' state using the saved object ID
     RemovePlantFromGarden(plantToDelete.id).then((res)=>{
      if(res.status == 200){
          const updatedPlants = plants.filter((p) => p.id !== plantToDelete.id);
          setPlants(updatedPlants);
        return;
      }
      alert("Fail To Delete Plant ")

     })
  
    }
    setIsModalOpen(false); // Close the popup container
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Garden</h1>

      <div className={styles.welcomeBar}>
        <span className={styles.welcomeText}>
          Hello <span className={styles.highlightUser}>{userName}</span>, welcome to your garden! 🌱
        </span>
        <button
          className={styles.addButton}
          onClick={() => navigate("/search")}
        >
          Add New Plant
        </button>
      </div>

      <div className={styles.grid}>
        {plants.map((plant) => (
          <PlantCard
            key={plant?.id}
            name={plant.commonName}
            date={plant.dateAdded}
            image={plant.imageURL}
            onView={() => handleView(plant.commonName)} 
            // Passing the entire 'plant' object so the app gets both ID and Name
            onDelete={() => openDeleteModal(plant)}
          />
        ))}
      </div>
      
      {/* Popup box for delete confirmation */}
      {isModalOpen && plantToDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3 className={styles.modalTitle}>Confirm Delete</h3>
            <p className={styles.modalText}>
              Are you sure you want to remove <strong>{plantToDelete.name}</strong> from your garden?
            </p>
            <div className={styles.modalButtons}>
              <button 
                className={styles.cancelButton} 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmButton} 
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;