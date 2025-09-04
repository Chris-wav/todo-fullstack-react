import { useState, useRef } from "react";
import "./App.css";
import Header from "./components/header/Header";
import DateComp from "./components/main/DateComp";
import TodoList from "./components/main/TodoList";
import ActionButtons from "./components/main/ActionButtons";
import ProgressStatsToggle from "./components/main/ProgressStatsToggle";
import AddTaskModal from "./components/main/AddTaskModal";
import ProgressComponent from "./components/main/ProgressComponent";
import ConfirmModal from "./components/main/ConfirmModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [progressIsActive, setProgressIsActive] = useState(false);
  const [isClearCompleted, setIsClearCompleted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const timeoutRef = useRef(null);

  const completedTasksHandler = () =>
    setTasks((prev) => prev.filter((task) => !task.completed));

  const handleClearClick = () => {
    if (tasks.some((task) => task.completed)) {
      setIsClearCompleted(true); // ανοίγει modal
    } else {
      setShowMessage(true); // εμφανίζει μήνυμα για 3 δευτ.
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowMessage(false);
        timeoutRef.current = null;
      }, 3000);
    }
  };

  return (
    <>
      <Header />
      <div className="appContainer">
        <DateComp />

        <ActionButtons
          handleClearClick={handleClearClick}
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
        />

        {showMessage && (
          <p className={showMessage ? "visible" : ""}>
            No completed tasks to clear! ✅
          </p>
        )}

        {isClearCompleted && (
          <ConfirmModal
            tasks={tasks}
            setTasks={setTasks}
            setIsClearCompleted={setIsClearCompleted}
            completedTasksHandler={completedTasksHandler}
          />
        )}

        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onClose={() => setIsAddTaskModalOpen(false)}
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
        />

        <ProgressStatsToggle
          setProgressIsActive={setProgressIsActive}
          progressIsActive={progressIsActive}
        />

        {progressIsActive && <ProgressComponent tasks={tasks} />}

        <TodoList setTasks={setTasks} tasks={tasks} />
      </div>
    </>
  );
}

export default App;
