import { createContext, useContext, useState, useMemo } from "react";
import useTaskStorage from "./hooks/useTaskStorage";
import type { ReactNode } from "react";
import type { TaskStorageType } from "./types";

const TaskStorageContext = createContext<TaskStorageType | null>(null);


export const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const taskStorage = useTaskStorage();
  const [searchQuery, setSearchQuery] = useState("");

  

  const filteredTasks = useMemo(() => {
    return taskStorage.tasks.filter(task =>
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [taskStorage.tasks, searchQuery]);
  
  return (
    <TaskStorageContext.Provider value={{ ...taskStorage, searchQuery, setSearchQuery, filteredTasks }}>
      {children}
    </TaskStorageContext.Provider>
  );
};


export const useTaskContext = () => {
  const context = useContext(TaskStorageContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskContextProvider');
  }
  return context;
};