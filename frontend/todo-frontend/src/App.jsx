import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import DateComp from "./components/main/DateComp";
import TodoList from "./components/main/TodoList";
import ActionButtons from "./components/main/ActionButtons";
import ProgressStatsToggle from "./components/main/ProgressStatsToggle";
import AddTaskModal from "./components/main/AddTaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="appContainer">
        <DateComp />
        <ActionButtons
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setTasks={setTasks}
        />
        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onClose={() => setIsAddTaskModalOpen(false)}
        />
        <ProgressStatsToggle />
        <div>
          <TodoList setTasks={setTasks} tasks={tasks} />
        </div>
      </div>
    </>
  );
}

export default App;
