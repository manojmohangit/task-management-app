import type { Task } from "../types/index";
import { NavLink } from "react-router";

function TaskItem({ task }:{ task : Task }) {
    return (
        <li className="task-card">
            <i className="bi bi-clock"></i>
            <div className="card-content">
                <div className="card-header">
                    <span className="text-primary title">{task.title}</span>
                    {task.status === 'pending' && <span className="badge badge-warning">Pending</span>}
                    {task.status === 'completed' && <span className="badge badge-success">Completed</span>}
                    {task.status === 'in-progress' && <span className="badge badge-info">In Progress</span>}    
                </div>
                <p>{task.description}</p>
                <div className="task-actions">
                    <NavLink to="/edit" state={{ task: task }}><i className="bi bi-pencil"></i></NavLink>
                    <button className="delete-btn"><i className="bi bi-trash"></i></button>
                </div>
            </div>
        </li>
    );
}
export default TaskItem;