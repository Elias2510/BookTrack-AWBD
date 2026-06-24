import { useEffect, useState } from "react";
import api from "../api/api";

function CrudPage({ title, endpoint, fields }) {
    const initialForm = fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {});

    const [items, setItems] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");

    const loadItems = async () => {
        try {
            const res = await api.get(endpoint);
            setItems(res.data.content || res.data);
        } catch {
            setError("Data could not be loaded.");
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm(initialForm);
        setEditingId(null);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const field of fields) {
            if (field.required && !form[field.name]) {
                setError(`${field.label} is required.`);
                return;
            }
        }

        try {
            if (editingId) {
                await api.put(`${endpoint}/${editingId}`, form);
            } else {
                await api.post(endpoint, form);
            }

            resetForm();
            loadItems();
        } catch {
            setError("The operation could not be completed.");
        }
    };

    const handleEdit = (item) => {
        const nextForm = {};
        fields.forEach((field) => {
            nextForm[field.name] = item[field.name] ?? "";
        });
        setForm(nextForm);
        setEditingId(item.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await api.delete(`${endpoint}/${id}`);
            loadItems();
        } catch {
            setError("The item could not be deleted.");
        }
    };

    return (
        <section className="card">
            <h1>{title}</h1>

            {error && <p className="error">{error}</p>}

            <form className="form" onSubmit={handleSubmit}>
                {fields.map((field) =>
                    field.type === "select" ? (
                        <select
                            key={field.name}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                        >
                            <option value="">Select {field.label}</option>

                            {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            key={field.name}
                            type={field.type || "text"}
                            name={field.name}
                            placeholder={field.label}
                            value={form[field.name]}
                            onChange={handleChange}
                        />
                    )
                )}

                <button type="submit">
                    {editingId ? "Update" : "Create"}
                </button>

                {editingId && (
                    <button type="button" className="secondary" onClick={resetForm}>
                        Cancel
                    </button>
                )}
            </form>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        {fields.map((field) => (
                            <th key={field.name}>{field.label}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>

                            {fields.map((field) => (
                                <td key={field.name}>
                                    {typeof item[field.name] === "object"
                                        ? item[field.name]?.name || item[field.name]?.email || "-"
                                        : item[field.name] || "-"}
                                </td>
                            ))}

                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button className="danger" onClick={() => handleDelete(item.id)}>
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

export default CrudPage;