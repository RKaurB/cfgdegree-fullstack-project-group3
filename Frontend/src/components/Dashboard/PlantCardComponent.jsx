import styles from "./PlantCard.module.css";

export default function PlantCardComponent({
  name,
  date,
  image,
  onView,
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

      <p className={styles.date}>{date}</p>

      <h3 className={styles.name}>{name}</h3>

      <button
        className={styles.viewButton}
        onClick={onView}
      >
        View
      </button>
    </div>
  );
}