import type { Task, TaskStatus } from "../../types";
import TaskItem from "../TaskItem";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../Accordion";
import './index.css';
import { useTaskContext } from "../../TaskStorageContext";
import { TASK_STATUS_MAP } from "../../constants/tasks";

function ListTask() {
    const { filteredTasks, searchTaskQuery } = useTaskContext();
        
    let tasksByStatus = Object.keys(TASK_STATUS_MAP).reduce((resultTask, status) => {
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
                    <AccordionTrigger id={status} isExpanded={searchTaskQuery.length > 0 && tasks.length > 0}><div>{`${TASK_STATUS_MAP[status as TaskStatus]}`} (<span className='task-count'>{`${tasks.length}`}</span>)</div></AccordionTrigger>
                    <AccordionContent id={status} isExpanded={searchTaskQuery.length > 0 && tasks.length > 0}>
                        <ul className="task-list">
                            {tasks.map(task => (
                                <TaskItem key={`task-${task.id}`} task={task} />
                            ))}
                            {tasks.length === 0 && searchTaskQuery.length > 0&& <li style={{ textAlign: "center"}}>Oops! No task exist for this search</li>}
                            {tasks.length === 0 && searchTaskQuery.length === 0&& <li style={{ textAlign: "center"}}>Oops! No task exist in this category</li>}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
             ))}
        </Accordion>
    );
}

export default ListTask;