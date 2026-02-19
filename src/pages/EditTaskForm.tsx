import React, { useEffect} from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { useTaskContext } from "../TaskStorageContext";
import type { Task } from "../types";

function EditTaskForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { tasks, updateTask } = useTaskContext();
    const [task, setTask] = React.useState<Task | null>(null);
    

    useEffect(() => {
        console.log(id);
        if(id) {

            navigate('/', {replace: true});
        } else {
            tasks.forEach(t => {
                if(id && t.id === parseInt(id)) {
                    setTask(t);
                }
            });
        }
    }, []);

    function formSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedTask = {
            id: id,
            title: formData.get("title") as string,
            description: formData.get("description") as string,
        };
        
        navigate("/", { replace: true });
    }

    return task ? (
        <div className="container">
            <header>
                <NavLink to="/"><i className="mr-2 bi bi-arrow-left"></i></NavLink>
                Edit Task
            </header>
            <form action="post" onSubmit={formSubmitHandler}>
                <div className="input-group">
                    <input type="text" placeholder="Enter the title" name="title" className="" required defaultValue={task.title}/>
                </div>
                <div className="input-group">
                    <textarea placeholder="Enter the description" name="description" className="form-control mb-4" rows={5} required defaultValue={task.description}></textarea>
                </div>
                <div className="input-group">
                    <NavLink to="/" className="btn btn-outline-primary">Cancel</NavLink>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
        
    ) : (<>NO Task</>);
    
}

export default EditTaskForm;