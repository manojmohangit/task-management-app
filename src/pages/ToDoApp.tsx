import ListTask from "../components/ListTask";
import { useNavigate } from "react-router";
import { useTaskContext } from "../TaskStorageContext";

function ToDoApp() {
    const navigate = useNavigate();
    const { tasks } = useTaskContext();
    return (
        <div className="container">
            <header className="uppercase">To-Do App</header>
            <button className='btn btn-primary' id='add-task-btn' onClick={() => navigate('/add')}>+</button>
            <ListTask tasks={tasks} />
        </div>
    );
}

export default ToDoApp;