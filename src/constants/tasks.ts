export const TASK_STATUS_MAP = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
} as const;
  
export const TASK_STATUS_OPTIONS = Object.entries(TASK_STATUS_MAP).map(([key, value]) => ({
    value: key,
    label: value,
}));

export type TaskStatus = keyof typeof TASK_STATUS_MAP;