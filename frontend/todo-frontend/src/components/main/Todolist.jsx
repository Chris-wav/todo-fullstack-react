import { fetchTasks } from "../api/todos";
import { useEffect } from "react";
import styles from "./Todolist.module.css";
import NoTasksMessage from "./NoTasksMessage";

const TodoList = ({ setTasks, tasks }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  // Toggle completed status
  const handleToggle = async (taskId, newCompleted) => {
    console.log("Toggling task:", taskId, "to completed:", newCompleted);
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: newCompleted }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update task ${taskId}`);
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: newCompleted } : task
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    loadTasks();
  }, [setTasks]);

  // Αν δεν υπάρχουν tasks, εμφανίζει όμορφο μήνυμα
  if (!tasks || tasks.length === 0) {
    return (
      <div className={styles.noTasksContainer}>
        <NoTasksMessage />
      </div>
    );
  }

  return (
    <div className={styles.toDo}>
      {tasks.map((task) => (
        <div key={task._id} className={styles.card}>
          <div className={styles.detailsContainer}>
            <h3 className={styles.title}>{task.title}</h3>
            <p className={styles.description}>{task.description}</p>
          </div>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task._id, !task.completed)}
              className={styles.checkbox}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
