import { deleteById, fetchTasks } from "../api/todos";
import { useEffect } from "react";
import styles from "./Todolist.module.css";
import NoTasksMessage from "./NoTasksMessage";

const TodoList = ({ setTasks, tasks }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const handleDelete = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task._id !== taskId)
    );
  };
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

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    loadTasks();
  }, [setTasks]);

  if (!tasks || tasks.length === 0) {
    return (
      <div className={styles.noTasksContainer}>
        <NoTasksMessage />
      </div>
    );
  }

  return (
    <div className={styles.toDo}>
      {tasks.map((task) => {console.log("Task:", task.title, "Description:", task.description);
       return (

        <div key={task._id} className={styles.card}>
          <div className={styles.leftSection}>
            <h3 className={styles.title}>{task.title}</h3>
            <p className={styles.description}>{task.description}</p>
            <div className={styles.checkboxContainer}>
              <label
                htmlFor={`task-${task._id}`}
                className={styles.checkboxLabel}
              >
                Completed:
              </label>
              <input
                type="checkbox"
                id={`task-${task._id}`}
                checked={task.completed}
                onChange={() => handleToggle(task._id, !task.completed)}
                className={styles.checkbox}
              />
            </div>
          </div>

          <div className={styles.rightSection}>
            <button
              className={styles.deleteButton}
              onClick={() => {
                deleteById(task._id);
                handleDelete(task._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )})}
    </div>
  );
};

export default TodoList;
