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

        try {
            await api.post("/books", {
                title,
                isbn,
                publicationDate,
                description,
                authorId: Number(authorId),
                categoryId: Number(categoryId),
            });

            setTitle("");
            setIsbn("");
            setPublicationDate("");
            setDescription("");
            setAuthorId("");
            setCategoryId("");
            setShowForm(false);

            loadBooks();
            alert("Cartea a fost adăugată cu succes!");
        } catch (error) {
            alert("Eroare la adăugarea cărții.");
        }
    };

    const addToReadingList = async (bookId) => {
        if (!user) {
            alert("Trebuie să fii logat.");
            return;
        }

        try {
            await api.post("/reading-lists", {
                name: "My Reading List",
                userId: user.id,
                bookIds: [bookId],
            });

            alert("Cartea a fost adăugată în Reading List!");
        } catch (error) {
            alert("Eroare la adăugarea în Reading List.");
        }
    };

    return (
        <section>
            <div className="section-header">
                <p className="eyebrow">Library</p>
                <h1>Explore Books</h1>
                <p>Descoperă cărțile disponibile și organizează-ți lecturile.</p>

                {user && (
                    <button onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Închide formularul" : "Adaugă carte"}
                    </button>
                )}
            </div>

            {showForm && (
                <section className="card">
                    <h2>Adaugă o carte citită</h2>

                    <form className="auth-form" onSubmit={handleAddBook}>
                        <input
                            type="text"
                            placeholder="Titlu"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="ISBN"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                        />

                        <input
                            type="date"
                            value={publicationDate}
                            onChange={(e) => setPublicationDate(e.target.value)}
                            required
                        />

                        <textarea
                            placeholder="Descriere / review scurt"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <select
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}
                            required
                        >
                            <option value="">Selectează autorul</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        >
                            <option value="">Selectează categoria</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <button type="submit">Salvează cartea</button>
                    </form>
                </section>
            )}

            <div className="book-grid">
                {books.map((book) => (
                    <article className="book-card" key={book.id}>
                        <div className="book-cover">📖</div>

                        <h3>{book.title}</h3>
                        <p>{book.description || "No description available."}</p>

                        <span>{book.author?.name || "Unknown author"}</span>
                        <br />
                        <span>{book.category?.name || "No category"}</span>

                        {user && (
                            <button onClick={() => addToReadingList(book.id)}>
                                Add to Reading List
                            </button>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Books;