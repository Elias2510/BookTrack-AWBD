import { useEffect, useMemo, useState } from "react";
import api from "../api/api";

function Statistics() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        api.get("/books?page=0&size=100")
            .then((res) => setBooks(res.data.content || []))
            .catch(() => setBooks([]));
    }, []);

    const data = useMemo(() => {
        const categories = {};
        const authors = {};

        books.forEach((book) => {
            const category = book.category?.name || "Unknown";
            const author = book.author?.name || "Unknown Author";

            categories[category] = (categories[category] || 0) + 1;
            authors[author] = (authors[author] || 0) + 1;
        });

        const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
        const sortedAuthors = Object.entries(authors).sort((a, b) => b[1] - a[1]);

        return {
            totalBooks: books.length,
            totalCategories: sortedCategories.length,
            favoriteCategory: sortedCategories[0]?.[0] || "No data",
            topAuthors: sortedAuthors.slice(0, 5),
            categories: sortedCategories,
        };
    }, [books]);

    const maxCategory = Math.max(...data.categories.map((item) => item[1]), 1);

    return (
        <main className="stats-page">
            <section className="stats-hero">
                <div className="stats-hero-content">
                    <p className="stats-label">BookTrack Analytics</p>
                    <h1>Your Reading Dashboard</h1>
                    <p>
                        Discover your favorite categories, most-read authors and personal
                        reading patterns through a modern visual overview.
                    </p>
                </div>

                <div className="stats-orb-card">
                    <div className="stats-orb">
                        <span>{data.totalBooks}</span>
                        <small>Books Tracked</small>
                    </div>
                </div>
            </section>

            <section className="stats-cards">
                <div className="stat-box">
                    <span>Total Books</span>
                    <strong>{data.totalBooks}</strong>
                    <p>Books saved in your library.</p>
                </div>

                <div className="stat-box">
                    <span>Categories</span>
                    <strong>{data.totalCategories}</strong>
                    <p>Different reading interests.</p>
                </div>

                <div className="stat-box stat-box-dark">
                    <span>Favorite Category</span>
                    <strong>{data.favoriteCategory}</strong>
                    <p>Your strongest reading preference.</p>
                </div>
            </section>

            <section className="stats-layout">
                <div className="analytics-card">
                    <div className="stats-section-header">
                        <p>Category Insights</p>
                        <h2>Books by Category</h2>
                    </div>

                    <div className="bar-list">
                        {data.categories.map(([category, count]) => (
                            <div className="bar-item" key={category}>
                                <div className="bar-top">
                                    <span>{category}</span>
                                    <strong>{count} books</strong>
                                </div>

                                <div className="bar-track">
                                    <div
                                        className="bar-fill"
                                        style={{ width: `${(count / maxCategory) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="analytics-card">
                    <div className="stats-section-header">
                        <p>Author Ranking</p>
                        <h2>Top Authors</h2>
                    </div>

                    <div className="author-list">
                        {data.topAuthors.map(([author, count], index) => (
                            <div className="author-card" key={author}>
                                <div className="rank">#{index + 1}</div>
                                <div>
                                    <strong>{author}</strong>
                                    <span>{count} books</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Statistics;