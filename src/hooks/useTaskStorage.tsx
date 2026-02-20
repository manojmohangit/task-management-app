import { useState, useEffect } from "react";
import type { Task } from "../types";

export default function useTaskStorage() {
    const [localStorageError, setLocalStorageError] = useState<string | null>(null);

    // To check if any issue with localStorage, like in private mode or if it's disabled
    const isLocalStorageAvailable = () => {
        try {
            const testKey = "__local_storage_test__";
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    };

    const [tasks, setTasks] = useState<Array<Task>>(() => {
        try {
            if(isLocalStorageAvailable()) {
                const savedTasks = localStorage.getItem('task-app-store');
                if (savedTasks) {
                    return JSON.parse(savedTasks);
                } else {
                    return [];
                }
            }
        } catch (error) {
            setLocalStorageError("Failed to load tasks from local storage");
            return [];
        }
    });

    useEffect(() => {
        try {
            if(isLocalStorageAvailable()) {
                localStorage.setItem('task-app-store', JSON.stringify(tasks));
            }
        } catch (error) {
            setLocalStorageError("Failed to save tasks to local storage");
        }
    }, [tasks]);


    function addTask({id, title, description}: {id: number, title: string, description: string}) {
        setTasks(prevTasks => [...prevTasks, {id, title, description, status: 'PENDING'}]);
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
        deleteTask,
        localStorageError
    };
}  