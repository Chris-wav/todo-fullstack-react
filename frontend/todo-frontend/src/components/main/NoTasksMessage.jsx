import React from "react";
import styles from "./NoTasksMessage.module.css";

const NoTasksMessage = () => {
  return (
    <div className={styles.messageContainer}>
      🌿 You have no tasks yet! Take a deep breath and relax... 🌸
    </div>
  );
};

export default NoTasksMessage;