import ListTask from "../components/ListTask";
import { useNavigate } from "react-router";
function ToDoApp() {
    const navigate = useNavigate();
    return (
        <>
            <header className="uppercase">To-Do App</header>
            <button className='btn btn-primary' id='add-task-btn' onClick={() => navigate('/add')}>+</button>
            <ListTask tasks={[{id: 1, title: 'Task1', description: 'TEsting Appp', status: 'pending'}]} />
        </>
    );
}

export default ToDoApp;