import type { TaskStatus } from "../constants/tasks";

export type { TaskStatus };
export interface Task {
    id: number,
    title: string,
    description: string,
    status: TaskStatus
}
export interface TaskStorageType {
  tasks: Task[];                       
  filteredTasks: Task[];              
  searchTaskQuery: string;
  setsearchTaskQuery: (query: string) => void;
  addTask: ({id: number, title: string, description: string}) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: number) => void;
  localStorageError: string | null;
  setLocalStorageError: (error: string | null) => void;
}
