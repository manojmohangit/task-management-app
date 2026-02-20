import { useTaskContext } from "../../TaskStorageContext";
import './index.css';

export default function SearchBar() {
    const { searchTaskQuery, setsearchTaskQuery } = useTaskContext();
    return (
        <div className="search-bar-container">
            <input 
                type="text" 
                name="search-to-do"
                placeholder="Search To-Do"
                value={searchTaskQuery}
                onChange={(e) => setsearchTaskQuery(e.target.value)}
            />
            <i className="bi bi-search"></i>
            <i 
                className="bi bi-x"
                style={{
                    opacity: searchTaskQuery.length > 0 ? 1 : 0,
                }}
                onClick={() => setsearchTaskQuery("")}
            ></i>
        </div>
    );
}