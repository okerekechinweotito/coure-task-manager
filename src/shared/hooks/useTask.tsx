import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string | Date;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Completed" | "InProgress";
};

const tasksAtom = atomWithStorage<Task[]>("tasks", []);

const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find((task) => task.id === id);
  };

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
  };

  const updateTask = (id: string, updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask, getTaskById };
};

export default useTasks;
