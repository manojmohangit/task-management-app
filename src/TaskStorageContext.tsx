import { createContext, useContext } from "react";
import useTaskStorage from "./hooks/useTaskStorage";
import type { ReactNode } from "react";
import type { TaskStorageType } from "./types";

const TaskStorageContext = createContext<TaskStorageType | null>(null);


export const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const taskStorage = useTaskStorage();
  
  return (
    <TaskStorageContext.Provider value={taskStorage}>
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