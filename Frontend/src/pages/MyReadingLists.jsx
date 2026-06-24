import { useEffect, useState } from "react";
import api from "../api/api";

function MyReadingLists() {
    const [readingLists, setReadingLists] = useState([]);

    useEffect(() => {
        api.get("/reading-lists?page=0&size=100")
            .then((res) => setReadingLists(res.data.content || []))
            .catch(() => setReadingLists([]));
    }, []);

    return (
        <section>
            <div className="section-header">
                <p className="eyebrow">Reading</p>
                <h1>My Reading Lists</h1>
                <p>Cărțile salvate pentru citit.</p>
            </div>

            <div className="book-grid">
                {readingLists.map((list) => (
                    <article className="book-card" key={list.id}>
                        <div className="book-cover">📚</div>
                        <h3>{list.name}</h3>

                        {list.books?.map((book) => (
                            <div key={book.id}>
                                <strong>{book.title}</strong>
                                <p>{book.description}</p>
                            </div>
                        ))}
                    </article>
                ))}
            </div>
        </section>
    );
}

export default MyReadingLists;