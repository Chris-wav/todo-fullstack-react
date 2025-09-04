import { clearAllCompletedCall } from "../api/todos";
import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({ tasks, setTasks, setIsClearCompleted }) => {
  const completedTasksHandler = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Clear Completed Tasks?</h3>
        <p className={styles.modalMessage}>
          This will remove {completedCount} completed{" "}
          {completedCount === 1 ? "task" : "tasks"}. Are you sure?
        </p>
        <div className={styles.modalButtons}>
          <button
            className={styles.cancelButton}
            onClick={() => setIsClearCompleted(false)}
          >
            Cancel
          </button>
          <button
            className={styles.confirmButton}
            onClick={async () => {
              if (completedCount > 0) {
                completedTasksHandler();
                await clearAllCompletedCall();
              }
              setIsClearCompleted(false);
            }}
            disabled={completedCount === 0}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
