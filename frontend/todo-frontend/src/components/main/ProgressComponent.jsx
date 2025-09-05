import styles from "./ProgressComponent.module.css";
import { useState, useEffect } from "react";

/**
 * ProgressComponent
 *
 * Shows user's progress in completing tasks.
 * Features:
 * - Dynamic progress bar
 * - Motivational messages based on completion percentage
 * - Smooth animations for progress changes
 * - Responsive and clean design
 */
const ProgressComponent = ({ tasks }) => {
  const [progress, setProgress] = useState(0);

  // Update progress whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      const completedCount = tasks.filter((task) => task.completed).length;
      setProgress(Math.round((completedCount / tasks.length) * 100));
    } else {
      setProgress(0);
    }
  }, [tasks]);

  // Generate motivational message based on progress
  const getMessage = (progress, tasks) => {
    if (progress === 0) {
      return <p className={styles.progressMessage}>No tasks completed yet. Take your time and start small!</p>;
    } else if (progress < 80) {
      return <p className={styles.progressMessage}>You’ve completed {progress}% of your tasks. Keep going, you’re doing great!</p>;
    } else if (progress >= 80 && progress < 100) {
      const remaining = tasks.length - Math.round((progress / 100) * tasks.length);
      return <p className={styles.progressMessage}>Almost there! Only {remaining} {remaining === 1 ? "task" : "tasks"} left. You got this!</p>;
    } else if (progress === 100) {
      return <p className={styles.progressMessage}>You made it!! You completed all your tasks.</p>;
    }
  };

  return (
    <div className={styles.progressWrapper}>
      <h3 className={styles.progressTitle}>How You’re Doing Today:</h3>
      {getMessage(progress, tasks)}
      <div className={styles.progressBar}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressComponent;
