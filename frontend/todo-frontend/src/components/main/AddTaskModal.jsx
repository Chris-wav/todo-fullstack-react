import { insertTask } from "../api/todos";
import styles from "./AddTaskModal.module.css";

const AddTaskModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const description = e.target.elements.description.value;
    const completed = e.target.elements.completed.checked;

    insertTask(title, description, completed);
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleSubmit} className={styles.addForm}>
          <label className={styles.label}>
            Title
            <input name="title" type="text" className={styles.input} />
          </label>

          <label className={styles.label}>
            Description
            <textarea name="description" className={styles.textarea}></textarea>
          </label>

          <label className={styles.label}>
            Completed
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
