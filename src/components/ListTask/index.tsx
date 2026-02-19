import type { Task, TaskStatus } from "../../types";
import TaskItem from "../TaskItem";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../Accordion";
import './index.scss';
import { useTaskContext } from "../../TaskStorageContext";

function ListTask() {
    const taskStatuses = {'in-progress': 'In Progress', 'pending': 'Pending', 'completed': 'Completed'} as Record<TaskStatus, string>;
    const { filteredTasks } = useTaskContext();
        
    let tasksByStatus = Object.keys(taskStatuses).reduce((resultTask, status) => {
        if (!resultTask[status as TaskStatus]) {
            resultTask[status as TaskStatus] = [];
        }
        return resultTask;
    }, {} as Partial<Record<TaskStatus, Task[]>>); 
    
    tasksByStatus = filteredTasks.reduce((groupedTask, task) => {
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
                    <AccordionTrigger id={status}><div>{`${taskStatuses[status]}`} (<span className='task-count'>{`${tasks.length}`}</span>)</div></AccordionTrigger>
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