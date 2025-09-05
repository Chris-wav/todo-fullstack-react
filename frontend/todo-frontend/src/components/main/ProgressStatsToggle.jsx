import styles from "./ProgressStatsToggle.module.css";

/**
 * ProgressStatsToggle
 *
 * Simple toggle button to switch the display of progress statistics.
 * Props:
 * - progressIsActive: boolean indicating current toggle state
 * - setProgressIsActive: function to update toggle state
 */
const ProgressStatsToggle = ({ setProgressIsActive, progressIsActive }) => {
  return (
    <div className={styles.toggleWrapper}>
      <button
        className={`${styles.toggleButton} ${
          progressIsActive ? styles.active : ""
        }`}
        onClick={() => setProgressIsActive(!progressIsActive)}
      >
        Progress
      </button>
    </div>
  );
};

export default ProgressStatsToggle;
