import React from "react";
import styles from "./PlantCard.module.css";

export default function PlantCardComponent({
  name,
  date,
  image,
  onView,
  onDelete
}) {
  return (
    <div className={styles.card}>
      {image && (
        <img
          src={image}
          alt={name}
          className={styles.image}
        />
      )}

      <p className={styles.date}>Added : {date}</p>

      <h3 className={styles.name}>{name}</h3>
      <div className={styles.buttonGroup}>
        <button
        className={styles.viewButton}
        onClick={onView}
      >
        View
      </button>

      {/* Calling onDelete prop */}
       <button 
        className={styles.deleteButton} 
        onClick={onDelete} 
        title="Remove plant"
      >
        Delete
      </button>
      </div>
      

    </div>
  );
}