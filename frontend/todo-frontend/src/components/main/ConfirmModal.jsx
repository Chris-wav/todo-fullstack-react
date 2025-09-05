import { clearAllCompletedCall } from "../api/todos";
import styles from "./ConfirmModal.module.css";

/**
 * ConfirmModal Component
 *
 * This modal asks the user for confirmation before deleting all completed tasks.
 * Features:
 * - Counts completed tasks dynamically
 * - Disables confirm button if no completed tasks
 * - Smooth UX with polished animations (see corresponding CSS)
 * - Easy to reuse and maintain
 *
 * Props:
 * @param {Array} tasks - Array of task objects
 * @param {Function} setTasks - State setter for tasks
 * @param {Function} setIsClearCompleted - State setter to open/close modal
 */
const ConfirmModal = ({ tasks, setTasks, setIsClearCompleted }) => {
  // Handler to remove completed tasks from local state
  const completedTasksHandler = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  // Count how many tasks are completed
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Modal header */}
        <h3 className={styles.modalTitle}>Clear Completed Tasks?</h3>

        {/* Modal message with dynamic completed tasks count */}
        <p className={styles.modalMessage}>
          This will remove {completedCount} completed{" "}
          {completedCount === 1 ? "task" : "tasks"}. Are you sure?
        </p>

        {/* Action buttons */}
        <div className={styles.modalButtons}>
          {/* Cancel button closes modal without changes */}
          <button
            className={styles.cancelButton}
            onClick={() => setIsClearCompleted(false)}
          >
            Cancel
          </button>

          {/* Confirm button deletes completed tasks */}
          <button
            className={styles.confirmButton}
            onClick={async () => {
              if (completedCount > 0) {
                completedTasksHandler(); // update local state
                await clearAllCompletedCall(); // update backend
              }
              setIsClearCompleted(false); // close modal
            }}
            disabled={completedCount === 0} // prevent action if none
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
