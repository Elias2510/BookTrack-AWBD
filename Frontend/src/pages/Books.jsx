import { useEffect, useState } from "react";
import api from "../api/api";

function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        api.get("/books?page=0&size=12&sort=title,asc")
            .then((res) => setBooks(res.data.content || []))
            .catch(() => setBooks([]));
    }, []);

    return (
        <section>
            <div className="section-header">
                <p className="eyebrow">Library</p>
                <h1>Explore Books</h1>
                <p>Descoperă cărțile disponibile și organizează-ți lecturile.</p>
            </div>

            <div className="book-grid">
                {books.map((book) => (
                    <article className="book-card" key={book.id}>
                        <div className="book-cover">📖</div>
                        <h3>{book.title}</h3>
                        <p>{book.description || "No description available."}</p>
                        <span>{book.author?.name || "Unknown author"}</span>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Books;