import styles from "./ProgressStatsToggle.module.css";
const ProgressStatsToggle = ({ setProgressIsActive, progressIsActive }) => {
  return (
    <div className={styles.toggleButtonsWrapper}>
      <div className={styles.toggleButtonsContainer}>
        <button onClick={() => setProgressIsActive(!progressIsActive)}>
          Progress
        </button>
      </div>
    </div>
  );
};

export default ProgressStatsToggle;
