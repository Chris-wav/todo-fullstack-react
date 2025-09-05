import React from "react";
import styles from "./NoTasksMessage.module.css";

/**
 * NoTasksMessage Component
 *
 * Displays a friendly, calm message when the task list is empty.
 * Features:
 * - Subtle styling to encourage relaxation
 * - Emoji for visual appeal
 * - Responsive and polished appearance
 */
const NoTasksMessage = () => {
  return (
    <div className={styles.messageContainer}>
      🌿 You have no tasks yet! Take a deep breath and relax... 🌸
    </div>
  );
};

export default NoTasksMessage;
