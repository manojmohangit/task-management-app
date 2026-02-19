import ListTask from "../components/ListTask";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router";

function ToDoApp() {
    const navigate = useNavigate();
    
    return (
        <div className="container">
            <header className="uppercase">To-Do App</header>
            <button 
                className='btn btn-primary' 
                id='add-task-btn' 
                onClick={() => navigate('/add')} 
                style={{ 
                    position: "absolute",
                    fontSize: "24px",
                    bottom: "20px",
                    right: "20px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    padding: "0px"
                }}
            >+</button>
            <SearchBar />
            <ListTask />
        </div>
    );
}

export default ToDoApp;