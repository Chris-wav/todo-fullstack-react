import { insertTask } from "../api/todos";
import styles from "./AddTaskModal.module.css";
import { toast } from "react-toastify";

/**
 * AddTaskModal Component
 * Provides a modal to add a new task.
 * Props:
 *  - isOpen: boolean, controls visibility of modal
 *  - onClose: function, closes modal
 *  - setTasks: function, updates tasks state in parent
 */
const AddTaskModal = ({ isOpen, onClose, setTasks }) => {
  if (!isOpen) return null;

  const showToast = (message) => toast(message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value.trim();
    const description = e.target.elements.description.value.trim();
    const completed = e.target.elements.completed.checked;

    if (!title) {
      showToast("❌ Failed to add task. Please enter a title.");
      return;
    }

    try {
      const response = await insertTask(title, description, completed);
      const newTask = response.data;

      // Add new task to parent state
      setTasks((prevTasks) => [...prevTasks, newTask]);
      showToast("✅ Task added successfully!");
      onClose();
    } catch (error) {
      showToast("❌ Failed to add task.");
      console.error(error);
    }
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleSubmit} className={styles.addForm}>
          <label className={styles.label}>
            Title:
            <input name="title" type="text" className={styles.input} />
          </label>

          <label className={styles.label}>
            Description:
            <textarea name="description" className={styles.textarea}></textarea>
          </label>

          <label className={styles.label}>
            Completed:
            <input
              type="checkbox"
              name="completed"
              className={styles.checkbox}
            />
          </label>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitBtn}>
              Add Task
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
