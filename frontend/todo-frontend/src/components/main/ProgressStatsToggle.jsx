import styles from "./ProgressStatsToggle.module.css";
const ProgressStatsToggle = () => {
  return (
    <div className={styles.toggleButtonsWrapper}>
      <div className={styles.toggleButtonsContainer}>
        <button onClick={() => setActiveView("progress")}>Progress</button>
        <button onClick={() => setActiveView("stats")}>Task Stats</button>
      </div>
    </div>
  );
};

export default ProgressStatsToggle;
