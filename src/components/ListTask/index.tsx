import type { Task, TaskStatus } from "../../types";
import TaskItem from "../TaskItem";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../Accordion";
import './index.scss';

function ListTask({ tasks }: { tasks: Array<Task> }) {
    const taskStatuses = ['pending', 'in-progress', 'completed'] as const;
    
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
        <Accordion>
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
                <AccordionItem key={status} id={status}>
                    <AccordionTrigger id={status}>{`${status} (${tasks.length})`}</AccordionTrigger>
                    <AccordionContent id={status}>
                        <ul className="task-list">
                            {tasks.map(task => (
                                <TaskItem key={`task-${task.id}`} task={task} />
                            ))}
                            {tasks.length === 0 && <li style={{ textAlign: "center"}}>Oops! No task exist in this category</li>}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
             ))}
        </Accordion>
    );
}

export default ListTask;