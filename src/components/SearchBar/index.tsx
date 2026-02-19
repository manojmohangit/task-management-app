import { useTaskContext } from "../../TaskStorageContext";

export default function SearchBar() {
    const { searchQuery, setSearchQuery } = useTaskContext();
    return (
        <div 
            className="search-bar-container"
            style={{
                width: "100%",
                padding: "0.5rem",
                boxSizing: "border-box",
                position: "relative"
            }}
        >
            <input 
                type="text" 
                placeholder="Search To-Do"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    minWidth: "100%",
                    boxSizing: "border-box",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                    fontSize: "12px",
                    transition: "all 0.2s ease-in-out"
                }}
            />
            <i className="bi bi-search" style={{
                position: "absolute",
                left: "1rem",
                color: "#034EA2",
                fontSize: "12px",
                top: "50%",
                transform: "translateY(-50%)"
            }}></i>

            <i className="bi bi-x" style={{
                position: "absolute",
                right: "1rem",
                opacity: searchQuery.length > 0 ? 1 : 0,
                color: "#034EA2",
                fontSize: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                transition: "opacity 0.2s ease-in-out"
                }}
                onClick={() => setSearchQuery("")}
            ></i>
        </div>
    );
}