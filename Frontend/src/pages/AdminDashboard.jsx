import { useEffect, useState } from "react";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/admin/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error(err));

        fetch("http://localhost:8080/api/admin/books")
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((err) => console.error(err));
    }, []);

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        await fetch(`http://localhost:8080/api/admin/users/${id}`, {
            method: "DELETE",
        });

        setUsers(users.filter((user) => user.id !== id));
    };

    const deleteBook = async (id) => {
        if (!window.confirm("Delete this book?")) return;

        await fetch(`http://localhost:8080/api/admin/books/${id}`, {
            method: "DELETE",
        });

        setBooks(books.filter((book) => book.id !== id));
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <section className="card">
                <h2>Users</h2>

                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            <section className="card">
                <h2>Books</h2>

                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author?.name || "-"}</td>
                            <td>
                                <button
                                    onClick={() => deleteBook(book.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default AdminDashboard;