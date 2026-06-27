import React, { useState,useEffect } from "react"; 
import PlantCard from "../components/Dashboard/PlantCardComponent";
import { mockPlants } from "../data/types/SamplePlantDB";
import styles from "../../src/styles/Dashboard.module.css";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import {GetSavedPlantList,RemovePlantFromGarden} from "../api/SavedPlantAPI"
import LoadingSection from "../components/LoadingSection";


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
  // const [plants, setPlants] = useState([]); // to test the empty state
  const [plants, setPlants] = useState(mockPlants); // uncomment this to back to the grid layout

  // Search/filter plants 
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPlants = plants.filter((plant) => 
    plant.commonName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // task to be completed (2 plants)
  const tasksDueToday = plants.slice(0, 2); 
  const pendingTasksCount = tasksDueToday.length;

//===Modal state to delete plant====
  // Modal visibility states (visible popup)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Hold the complete selected plant object instead of just text
  const [plantToDelete, setPlantToDelete] = useState(null);

  // Loading State
  const [loading, setLoading] = useState(true);
  
  // useEffect(() => {
  //     UserSavedList().then((res)=>{
  //       setPlants(res);
  //       setLoading(false);
  //     });
  // }, []);

useEffect(() => {
  UserSavedList().then((res) => {
    if (res && res.length > 0) {
      setPlants(res);
    } else {
      setPlants(mockPlants);
    }

    setLoading(false);
  });
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
    setPlantToDelete(null); 
  };
  
// Loading Section
if (loading) {
  return <LoadingSection text="Loading your garden..." />;
}
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Garden 🌱</h1>

    {/* Welcome Bar */}
      <div className={styles.welcomeBar}>
        <span className={styles.welcomeText}>
          Hello <span className={styles.highlightUser}>{userName}</span>, welcome back!
        </span>

        {/* {Button only appeared if the there are plants} */}
        {plants.length > 0 && (
          <button 
            aria-label="Add Plant"
            className={styles.addButton}
            onClick={() => navigate("/search")}
          >
            Add Plant
          </button>
        )}
      </div>
      
     {/* Empty state logic */}
      {plants.length === 0 ? (
        
        /* Condition if Garden is empty*/
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🪴</div>
          <h4 className={styles.emptyTitle}>Your Garden is Empty</h4>
          <p className={styles.emptyText}>
            Start your garderning journey by adding your first plant.
          </p>
          <button 
            aria-label="Add First Plant"
            className={styles.emptyButton}
            onClick={() => navigate("/search")}
          >
            Add First Plant
          </button>
        </div>

      ) : (

        /*If Garden has plants */
        <div>
          
          {/* Quick Stats*/}
          <h2 className={styles.sectionTitle}>Garden Overview</h2>
          <div className={styles.statsContainer}>
            <div className={styles.statsCard}>
              <span className={styles.statsIcon}>🪴</span>
              <div className={styles.statsInfo}>
                <h5>Total Plants</h5>
                <p>{plants.length}</p>
              </div>
            </div>

            <div className={styles.statsCard}>
              <span className={styles.statsIcon}>⏰</span>
              <div className={styles.statsInfo}>
                <h5>Tasks Today</h5>
                <p>{pendingTasksCount}</p>
              </div>
            </div>
          </div>

          {/* Today's Task List*/}
          <h2 className={styles.sectionTitle}>Action Required</h2>
          {pendingTasksCount > 0 && (
            <div className={styles.taskSection}>
              <div className={styles.taskListWrapper}>
                {tasksDueToday.map((plant) => (
                  <div 
                    key={plant.id}
                    className={styles.taskRow}
                    onClick={() => handleView(plant.name)}
                  >
                    <span className={styles.taskText}>
                      💧 Water <b>{plant.name}</b>
                    </span>
                    <span className={styles.taskLinkText}>
                      View →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          
      {/* Plants grid */}
      <h2 className={styles.sectionTitle}>Your Plants</h2>
      
      {/* Search bar (if user have too many plants to scroll) */}
         <div className={styles.searchSection}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="🔍 Search plants by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
      
      {filteredPlants.length === 0 ? (
            <p className={styles.noResultsText}>No plants match your search. 🔍</p>
          ) : (
      <div className={styles.grid}>
        {filteredPlants.map((plant) => (
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
    )}
  </div>
)}

      {/* Popup box for delete confirmation */}
      {isModalOpen && plantToDelete && (
        <div 
        className={styles.modalOverlay}
        onClick={() => setIsModalOpen(false)}
        >
          <div className={styles.modalBox}
          onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.modalTitle}>Delete Plant?</h3>
            <p className={styles.modalText}>
              Remove <b>{plantToDelete.commonName}</b> from your garden?
            </p>

            <div className={styles.modalButtons}>
              <button 
                className={styles.cancelButton} 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>

              <button aria-label="Delete"
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