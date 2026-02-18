import React from "react";
import { NavLink, useNavigate } from "react-router";
import type { Task } from "../types";

function EditTaskForm({ task }:{ task ?: Task }) {
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!task) {
            navigate('/', {replace: true});
        }
    });
    console.log(task);

    return task ? (
        <header>
            <NavLink to="/"><i className="mr-2 bi bi-arrow-left"></i></NavLink>
            Edit Task
        </header>
        
    ) : task;
    
}

export default EditTaskForm;