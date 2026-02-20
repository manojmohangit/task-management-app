import ListTask from "../components/ListTask";
import SearchBar from "../components/SearchBar";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation  } from "react-router";
import { useTaskContext } from "../TaskStorageContext";
import { useToast } from "../components/Toast/context";

function ToDoApp() {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToast } = useToast();
    const { localStorageError, setLocalStorageError } = useTaskContext();
    const toastProcessed = useRef(false);

    useEffect(() => {
        if (location.state?.toastMessage && !toastProcessed.current) {
            addToast(location.state.toastMessage, 'success');
            toastProcessed.current = true;
            window.history.replaceState({}, '', location.pathname);
        }
        return () => {
            window.history.replaceState({}, '', location.pathname);
        }
    }, [location.state?.toastMessage])

    useEffect(() => {
        if(localStorageError != null && !toastProcessed.current) {
            addToast(localStorageError, 'error');
            toastProcessed.current = true;
            setLocalStorageError(null);
        }
    }, [localStorageError])

    return (
        <div className="container">
            <div style={{ height: "100%", overflowY: "auto", position: "relative"}}>
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