import ListTask from "../components/ListTask";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router";

function ToDoApp() {
    const navigate = useNavigate();
    
    return (
        <div className="container">
            <div className="" style={{ height: "100%", overflowY: "auto", position: "relative"}}>
                <header className="uppercase">To-Do App</header>
                <SearchBar />
                <ListTask />
            </div>

            <button 
                className='btn btn-primary' 
                id='add-task-btn' 
                onClick={() => navigate('/add')} 
            >+</button>
        </div>
    );
}

export default ToDoApp;