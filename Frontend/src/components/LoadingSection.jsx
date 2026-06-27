// Reusable loading component for pages that retrieve data from the backend/API.
import styles from "../styles/LoadingSection.module.css";

function LoadingSection({ text = "Loading..." }) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>{text}</p>
    </div>
  );
}

export default LoadingSection;