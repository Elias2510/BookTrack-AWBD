import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <section className="card">
            <h1>Admin Dashboard</h1>
            <p>Gestionează datele principale ale aplicației BookTrack.</p>

            <div className="admin-grid">
                <Link to="/admin/books">Manage Books</Link>
                <Link to="/admin/authors">Manage Authors</Link>
                <Link to="/admin/categories">Manage Categories</Link>
                <Link to="/admin/users">Manage Users</Link>
                <Link to="/admin/roles">Manage Roles</Link>
                <Link to="/admin/reviews">Manage Reviews</Link>
            </div>
        </section>
    );
}

export default AdminDashboard;