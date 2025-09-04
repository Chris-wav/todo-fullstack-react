import styles from "./ActionButtons.module.css";

const ActionButtons = ({
  setIsAddTaskModalOpen,
  handleClearClick,
}) => {
  return (
    <div className={styles.actionButtonsContainer}>
      <button
        className={styles.addBtn}
        onClick={() => setIsAddTaskModalOpen(true)}
      >
        + Add task
      </button>
      <button className={styles.voiceButton} onClick={handleClearClick}>
        Clear Completed Tasks
      </button>
    </div>
  );
};

export default ActionButtons;
