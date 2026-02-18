export type TaskStatus = 'pending' | 'completed' | 'in-progress';

export interface Task {
    id: number,
    title: string,
    description: string,
    status: TaskStatus
}

