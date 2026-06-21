import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "USER",
        adminCode: "",
    });
    const [error, setError] = useState("");

    const loadUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data.content || []);
        } catch {
            setError("Nu s-au putut încărca utilizatorii.");
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const createUser = async (e) => {
        e.preventDefault();
        setError("");

        const payload = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
            role: form.role,
        };

        if (form.role === "ADMIN") {
            payload.adminCode = form.adminCode;
        }

        try {
            await api.post("/auth/register", payload);
            setForm({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                role: "USER",
                adminCode: "",
            });
            loadUsers();
        } catch {
            setError("Utilizatorul nu a putut fi creat.");
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Sigur vrei să ștergi utilizatorul?")) return;

        try {
            await api.delete(`/users/${id}`);
            loadUsers();
        } catch {
            setError("Utilizatorul nu a putut fi șters.");
        }
    };

    return (
        <section className="card">
            <h1>Manage Users</h1>

            {error && <p className="error">{error}</p>}

            <form className="form" onSubmit={createUser}>
                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />

                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                {form.role === "ADMIN" && (
                    <input
                        name="adminCode"
                        placeholder="Admin secret code"
                        value={form.adminCode}
                        onChange={handleChange}
                    />
                )}

                <button type="submit">Create User</button>
            </form>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Acțiuni</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role?.name}</td>
                            <td>
                                <button className="danger" onClick={() => deleteUser(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}