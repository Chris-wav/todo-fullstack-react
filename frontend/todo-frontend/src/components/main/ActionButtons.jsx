import styles from "./ActionButtons.module.css";
import { clearAllCompletedCall } from "../api/todos";

const ActionButtons = ({ setIsAddTaskModalOpen, setTasks }) => {
  const completedTasksHandler = () =>
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.completed === false)
    );

  return (
    <div className={styles.actionButtonsContainer}>
      <button
        className={styles.addBtn}
        onClick={() => setIsAddTaskModalOpen(true)}
      >
        + Add task
      </button>
      <button
        className={styles.voiceButton}
        onClick={async () => {
          await clearAllCompletedCall();
          completedTasksHandler();
        }}
      >
        Clear Completed Tasks
      </button>
    </div>
  );
};

export default ActionButtons;
