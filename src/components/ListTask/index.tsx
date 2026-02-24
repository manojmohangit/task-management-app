import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Task, TaskStatus } from "../../types";
import TaskItem from "../TaskItem";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../Accordion";
import './index.css';
import { useTaskContext } from "../../TaskStorageContext";
import { TASK_STATUS_MAP } from "../../constants/tasks";

function ListTask() {
    const { filteredTasks, searchTaskQuery } = useTaskContext();
    const [activeIds, setActiveIds] = useState<string[]>([]);
    
    const tasksByStatus = useMemo(() => {
        const grouped = Object.keys(TASK_STATUS_MAP).reduce((resultTask, status) => {
            resultTask[status as TaskStatus] = [];
            return resultTask;
        }, {} as Record<TaskStatus, Task[]>);
        
        return filteredTasks.reduce((groupedTask, task) => {
            groupedTask[task.status].push(task);
            return groupedTask;
        }, grouped);
    }, [filteredTasks]);

    useEffect(() => {
        if(searchTaskQuery.length > 0) {
            const ids = Object.entries(tasksByStatus)
                .filter(([, tasks]) => tasks.length > 0)
                .map(([status]) => status);
            setActiveIds(ids);
        } else {
            setActiveIds([]);
        }
    }, [searchTaskQuery, tasksByStatus])

    const handleAccordionChange = useCallback((ids: string[]) => {
        setActiveIds(ids);
    }, []);

    return (
        <Accordion allowMultiple onChange={handleAccordionChange} activeIds={activeIds}>
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
                <AccordionItem 
                    key={`${status}-${tasks.length}`} 
                    id={status} 
                    isExpanded={searchTaskQuery.length > 0 ? activeIds.includes(status) : undefined}
                >
                    <AccordionTrigger id={status}><div>{`${TASK_STATUS_MAP[status as TaskStatus]}`} (<span className='task-count'>{`${tasks.length}`}</span>)</div></AccordionTrigger>
                    <AccordionContent id={status}>
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