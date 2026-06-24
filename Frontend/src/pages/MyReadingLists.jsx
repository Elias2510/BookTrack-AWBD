import { useEffect, useState } from "react";
import api from "../api/api";

function MyReadingLists() {
    const [books, setBooks] = useState([]);
    const [sortBy, setSortBy] = useState("title");
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    useEffect(() => {
        api.get("/books?page=0&size=100")
            .then((res) => setBooks(res.data.content || []))
            .catch(() => setBooks([]));
    }, []);

    const getReviewScore = (review) => {
        if (!review) return 0;
        if (review.includes("Excellent")) return 5;
        if (review.includes("Very Good")) return 4;
        if (review.includes("Good")) return 3;
        if (review.includes("Average")) return 2;
        if (review.includes("Poor")) return 1;
        return 0;
    };

    const categories = [
        ...new Set(
            books
                .map((book) => book.category?.name)
                .filter(Boolean)
        )
    ];

    const filteredBooks = books.filter((book) => {
        const title = book.title?.toLowerCase() || "";
        const author = book.author?.name?.toLowerCase() || "";
        const category = book.category?.name?.toLowerCase() || "";
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            title.includes(search) ||
            author.includes(search) ||
            category.includes(search);

        const matchesCategory =
            !categoryFilter ||
            category === categoryFilter.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    const sortedBooks = [...filteredBooks].sort((a, b) => {
        switch (sortBy) {
            case "author":
                return (a.author?.name || "").localeCompare(b.author?.name || "");

            case "category":
                return (a.category?.name || "").localeCompare(b.category?.name || "");

            case "review":
                return getReviewScore(b.description) - getReviewScore(a.description);

            default:
                return (a.title || "").localeCompare(b.title || "");
        }
    });

    return (
        <section>
            <div className="section-header">
                <div>
                    <p className="eyebrow">Library</p>
                    <h1>Reading Lists</h1>
                </div>
            </div>

            <section className="card filter-card">
                <div className="search-box">
                    <span>🔎</span>
                    <input
                        type="text"
                        placeholder="Caută după titlu, autor sau categorie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">Toate categoriile</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="title">Sort by Title</option>
                    <option value="author">Sort by Author</option>
                    <option value="category">Sort by Category</option>
                    <option value="review">Sort by Review</option>
                </select>
            </section>

            <div className="book-grid">
                {sortedBooks.length > 0 ? (
                    sortedBooks.map((book) => (
                        <article className="book-card" key={book.id}>
                            <div className="book-cover">📚</div>

                            <h3>{book.title}</h3>

                            <p className="book-review">
                                Review:{" "}
                                {book.description && book.description.trim() !== ""
                                    ? book.description
                                    : "No review available."}
                            </p>

                            <span>
                                Author: {book.author?.name || "Unknown Author"}
                            </span>

                            <span>
                                Category: {book.category?.name || "No Category"}
                            </span>
                        </article>
                    ))
                ) : (
                    <p>Nu există cărți care să corespundă filtrării.</p>
                )}
            </div>
        </section>
    );
}

export default MyReadingLists;