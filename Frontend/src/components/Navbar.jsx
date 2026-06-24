import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const userRole = user?.role?.name || user?.role;
    const isAdmin =
        userRole === "ADMIN" || userRole === "ROLE_ADMIN";

    const isUser = !!user && !isAdmin;

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="logo">BookTrack</div>

            <div className="nav-links">
                <NavLink to="/">Home</NavLink>

                {isUser && (
                    <>
                        <NavLink to="/books">
                            Books
                        </NavLink>

                        <NavLink to="/reading-lists">
                            Reading Lists
                        </NavLink>
                    </>
                )}

                {isAdmin && (
                    <NavLink to="/admin">
                        Admin Dashboard
                    </NavLink>
                )}

                {!user ? (
                    <>
                        <NavLink to="/login">
                            Login
                        </NavLink>

                        <NavLink to="/register">
                            Register
                        </NavLink>
                    </>
                ) : (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;