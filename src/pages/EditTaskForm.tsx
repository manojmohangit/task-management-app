import { useEffect, useState} from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import type { SubmitEvent } from "react";
import type { Task, TaskStatus } from "../types";
import { useTaskContext } from "../TaskStorageContext";
import { Select } from "../components/Select";
import { Option } from "../components/Select/Option";
import { TASK_STATUS_OPTIONS } from '../constants/tasks';

function EditTaskForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { tasks, updateTask } = useTaskContext();
    const [task, setTask] = useState<Task | null>(null);
    
    useEffect(() => {    
        if(!id) {
            navigate('/', { replace: true, viewTransition: true });
        } else {
            if(task == null) {
                tasks.forEach(t => {
                    if(id && t.id === parseInt(id)) {
                        setTask(t);
                    }
                });
            }     
        }
    }, []);

    function editFormSubmitHandler(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if(task && task.id) {
            const updatedTask = {
                id: task?.id || 0,
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                status: formData.get("status") as TaskStatus,
            };
            updateTask(updatedTask);
            navigate("/", { state: { toastMessage: "Task updated successfully!" }, viewTransition: true });
        }   
    }

    return task ? (
        <div className="container">
            <header>
                <NavLink to="/" viewTransition><i className="mr-2 bi bi-arrow-left text-white"></i></NavLink>
                Edit Task
            </header>
            <div className="content" style={{ viewTransitionName: "list" }}>
                <form action="post" onSubmit={editFormSubmitHandler}>
                    <div className="input-group">
                        <input type="text" placeholder="Enter the title" name="title" required defaultValue={task.title}/>
                    </div>
                    <div className="input-group">
                        <textarea placeholder="Enter the description" name="description" rows={5} required defaultValue={task.description}></textarea>
                    </div>

                    <div className="input-group">
                        <Select name="status" defaultValue={task.status}>
                            {TASK_STATUS_OPTIONS.map(options => (
                                <Option 
                                    key={options.value} 
                                    value={options.value} 
                                    label={<><i className={`bi bi-circle-fill mr-1 ${options.value.toLowerCase()}`}></i>{options.label}</>} 
                                />
                            ))}
                        </Select>
                    </div>
                    <div className="input-group" style={{ marginTop: '2rem'}}>
                        <NavLink to="/" className="btn btn-outline-primary" viewTransition>Cancel</NavLink>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
        
    ) : (<>NO Task</>);
    
}

export default EditTaskForm;