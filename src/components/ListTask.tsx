import type { Task, TaskStatus } from "../types";
import TaskItem from "./TaskItem";

function ListTask({ tasks }: { tasks: Array<Task> }) {
    const taskStatuses = ['pending', 'completed' , 'in-progress'] as const;
    
    let tasksByStatus = taskStatuses.reduce((resultTask, status) => {
        if (!resultTask[status]) {
            resultTask[status] = [];
        }
        return resultTask;
    }, {} as Partial<Record<TaskStatus, Task[]>>); 
    
    tasksByStatus = tasks.reduce((groupedTask, task) => {
        const { status } = task;
        
        if (!groupedTask[status]) {
            groupedTask[status] = [];
        }
        
        groupedTask[status].push(task);
        return groupedTask;
    }, tasksByStatus);


    return (
        <>
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
                <div key={status}>
                    <h2 className="capitalize">{status}({tasks.length})</h2>
                    <ul>
                        {tasks.map(task => (
                            <TaskItem task={task} />
                        ))}
                    </ul>
                </div>
            ))}        
        </>
    );
}

export default ListTask;