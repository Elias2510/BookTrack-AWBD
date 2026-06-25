import { useEffect, useState } from "react";
import api from "../api/api";

function Books() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [title, setTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [description, setDescription] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    const reviewOptions = [
        "Excellent - 5 stars",
        "Very Good - 4 stars",
        "Good - 3 stars",
        "Average - 2 stars",
        "Poor - 1 star"
    ];

    const loadBooks = () => {
        api.get("/books?page=0&size=100&sort=title,asc")
            .then((res) => setBooks(res.data.content || []))
            .catch(() => setBooks([]));
    };

    const loadAuthorsAndCategories = () => {
        api.get("/authors?page=0&size=100&sort=name,asc")
            .then((res) => setAuthors(res.data.content || []))
            .catch(() => setAuthors([]));

        api.get("/categories?page=0&size=100&sort=name,asc")
            .then((res) => setCategories(res.data.content || []))
            .catch(() => setCategories([]));
    };

    useEffect(() => {
        loadBooks();
        loadAuthorsAndCategories();
    }, []);

    const handleAddBook = async (e) => {
        e.preventDefault();

        if (!description) {
            alert("Please select a review.");
            return;
        }

        try {
            await api.post("/books", {
                title,
                isbn,
                publicationDate,
                description,
                authorId: Number(authorId),
                categoryId: Number(categoryId)
            });

            setTitle("");
            setIsbn("");
            setPublicationDate("");
            setDescription("");
            setAuthorId("");
            setCategoryId("");
            setShowForm(false);

            loadBooks();
            alert("Book added successfully!");
        } catch (error) {
            console.error(error);
            alert("Could not add the book.");
        }
    };

    return (
        <main className="page-shell">
            <section className="page-hero compact">
                <div>
                    <p className="eyebrow">Digital Library</p>
                    <h1>Explore Books</h1>
                    <p>Browse your collection, discover categories, track reviews and manage your personal reading universe.</p>
                </div>

                {user && (
                    <button onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Close Form" : "Add Book"}
                    </button>
                )}
            </section>

            {showForm && (
                <section className="card form-card">
                    <h2>Add a Read Book</h2>

                    <form className="auth-form" onSubmit={handleAddBook}>
                        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                        <input type="date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />

                        <select value={description} onChange={(e) => setDescription(e.target.value)} required>
                            <option value="">Select review</option>
                            {reviewOptions.map((review) => (
                                <option key={review} value={review}>{review}</option>
                            ))}
                        </select>

                        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
                            <option value="">Select author</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>{author.name}</option>
                            ))}
                        </select>

                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                            <option value="">Select category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>

                        <button type="submit">Save Book</button>
                    </form>
                </section>
            )}

            <div className="book-grid">
                {books.map((book) => (
                    <article className="book-card" key={book.id}>
                        <div className="book-cover">📖</div>
                        <h3>{book.title}</h3>
                        <p className="book-review">{book.description || "No review available."}</p>
                        <span>Author: {book.author?.name || "Unknown Author"}</span>
                        <span>Category: {book.category?.name || "No Category"}</span>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default Books;