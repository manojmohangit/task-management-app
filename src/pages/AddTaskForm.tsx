import { NavLink, useNavigate } from "react-router";
import type { SubmitEvent } from "react";
import { useTaskContext }  from "../TaskStorageContext";

function AddTaskForm() {
    const { addTask } = useTaskContext();
    const navigate = useNavigate();

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        addTask({
            id: Date.now(),
            title,
            description
        });
        navigate('/', { state: { toastMessage: "Task added successfully!" } });
    }

    return (
        <div className="container">
            <header>
                <NavLink to="/"><i className="mr-2 bi bi-arrow-left pointer text-white"></i></NavLink> Add Task
            </header>
            <div className="content">
                <form action="post" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" placeholder="Enter the title" name="title" className="" required/>
                    </div>
                    <div className="input-group">
                        <textarea placeholder="Enter the description" name="description" className="form-control mb-4" rows={5} required></textarea>
                    </div>
                    <div className="input-group" style={{ marginTop: '2rem'}}>
                        <NavLink to="/" className="btn btn-outline-primary">Cancel</NavLink>
                        <button type="submit" className="btn btn-primary">ADD</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTaskForm;