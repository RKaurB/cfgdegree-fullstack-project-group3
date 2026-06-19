import PlantCard from "../components/Dashboard/PlantCardComponent";
import { mockPlants } from "../data/types/SamplePlantDB";
import styles from "../../src/Dashboard.module.css";
import { useSelector } from 'react-redux'

function Dashboard() {
  const username = useSelector((state) => state.user.username)
  const handleView = (id) => {
    console.log("View plant", id);
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Garden</h1>

      <div className={styles.welcomeBar}>
        <span>Hello {username}, welcome to your garden!</span>

        <button className={styles.addButton}>
          Add New Plant
        </button>
      </div>

      <div className={styles.grid}>
        {mockPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            name={plant.name}
            date={plant.date}
            image={plant.image}
            onView={() => handleView(plant.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;