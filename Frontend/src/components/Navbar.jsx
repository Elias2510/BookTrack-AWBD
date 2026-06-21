import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">BookTrack</div>

            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/books">Books</NavLink>
                <NavLink to="/reading-lists">Reading Lists</NavLink>
                <NavLink to="/admin">Admin</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;