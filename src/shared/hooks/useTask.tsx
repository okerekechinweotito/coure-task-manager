import { useState, useEffect } from "react";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: string;
};

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (id: string, updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    setIsInitialLoad(true);
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isInitialLoad]);

  return { tasks, addTask, updateTask, deleteTask };
};

export default useTasks;
