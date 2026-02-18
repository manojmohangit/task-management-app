import { useState } from "react";
import type { Task } from "../types";

export default function useTaskList() {
    const [tasks, setTasks] = useState<Array<Task>>(() => {
        const tasks = localStorage.getItem('task-app-storage');
        return tasks ? JSON.parse(tasks) : [];
    });

    function addTask(task: Task) {
        setTasks(prevTasks => [...prevTasks, task]);
    }

    function updateTask(updatedTask: Task) {
        setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    }

    function deleteTask(taskId: number) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }

    return {
        tasks,
        addTask,
        updateTask,
        deleteTask
    };
}  