import { NavLink } from "react-router";

function AddTaskForm() {
    
    return (
        <>
            <header>
                <NavLink to="/"><i className="mr-2 bi bi-arrow-left pointer text-white"></i></NavLink> Add Task</header>
        </>
    )
}

export default AddTaskForm;