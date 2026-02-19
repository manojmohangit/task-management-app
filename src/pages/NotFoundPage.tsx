import { NavLink } from "react-router";

export default function NotFoundPage() {
    return (
        <div className="container p-2">
            <h1>404 - Not Found</h1>
            <p>Oops. You got into wrong place.</p>

            <NavLink to="/" className="btn btn-primary">Back</NavLink>
        </div>
    );
}