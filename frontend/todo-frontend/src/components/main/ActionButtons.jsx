import styles from "./ActionButtons.module.css";

/**
 * ActionButtons component provides two main actions:
 * 1. Open the modal to add a new task
 * 2. Clear all completed tasks
 * Props:
 *  - setIsAddTaskModalOpen: function to toggle AddTask modal
 *  - handleClearClick: function to handle clearing completed tasks
 */
const ActionButtons = ({ setIsAddTaskModalOpen, handleClearClick }) => {
  return (
    <div className={styles.actionButtonsContainer}>
      <button
        className={styles.addBtn}
        onClick={() => setIsAddTaskModalOpen(true)}
      >
        + Add Task
      </button>
      <button className={styles.clearBtn} onClick={handleClearClick}>
        Clear Completed
      </button>
    </div>
  );
};

export default ActionButtons;
