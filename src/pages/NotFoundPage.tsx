import { NavLink } from "react-router";

export default function NotFoundPage() {
    return (
        <div className="container">
            <div className="content">
                <h1>404 - Not Found</h1>
                <p>Oops. You got into wrong place.</p>

                <NavLink to="/" className="btn btn-primary" style={{
                    alignSelf: 'center',
                }}>
                    Back
                </NavLink>
            </div>
        </div>
    );
}