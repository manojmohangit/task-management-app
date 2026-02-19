export type TaskStatus = 'pending' | 'completed' | 'in-progress';

export interface Task {
    id: number,
    title: string,
    description: string,
    status: TaskStatus
}


export interface TaskStorageType {
  tasks: Task[];                       
//   filteredTasks: Task[];              
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
  addTask: ({id: number, title: string, description: string}) => void;
//   updateTaskStatus: (id: string, status: TaskStatus) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: number) => void;
  localStorageError: string | null;
//   tasksByStatus: Record<TaskStatus, Task[]>;
}
