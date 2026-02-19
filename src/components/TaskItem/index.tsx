import type { Task } from "../../types/index";
import { NavLink } from "react-router";
import './index.scss';
import { useTaskContext } from "../../TaskStorageContext";

function TaskItem({ task }:{ task : Task }) {
    const { deleteTask } = useTaskContext();
    return (
        <li className={`task-card ${task.status}`}>
            <i className="bi bi-clock"></i>
            <div className='card-content'>
                <div className="card-header">
                    <span className="text-primary title">{task.title}</span>
                    <span className="status">
                        {task.status === 'pending' && <><i className="bi bi-circle-fill mr-1"></i>Pending</>}
                        {task.status === 'completed' && <><i className="bi bi-circle-fill mr-1"></i>Completed</>}
                        {task.status === 'in-progress' && <><i className="bi bi-circle-fill mr-1"></i>In Progress</>}    
                    </span>
                </div>
                <p>{task.description}</p>
                <div className="task-actions">
                    <NavLink to={`/edit/${task.id}`}><i className="bi bi-pencil"></i></NavLink>
                    <button className="delete-btn" onClick={() => { deleteTask(task.id); }}><i className="bi bi-trash text-red"></i></button>
                </div>
            </div>
        </li>
    );
}
export default TaskItem;