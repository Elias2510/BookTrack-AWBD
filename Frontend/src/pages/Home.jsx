function Home() {
    return (
        <main className="home-page">
            <section className="home-container">
                <div className="home-copy">
                    <div className="pill">BookTrack Library System</div>

                    <h1>Build your personal reading universe.</h1>

                    <p>
                        Manage books, authors, categories, reviews and reading insights
                        from one elegant dashboard.
                    </p>

                    <div className="home-actions">
                        <a href="/books" className="btn-primary">Explore Books</a>
                        <a href="/statistics" className="btn-secondary">View Analytics</a>
                    </div>
                </div>

                <div className="home-dashboard">
                    <div className="dash-header">
                        <span>📚</span>
                        <div>
                            <strong>My Library</strong>
                            <small>Reading overview</small>
                        </div>
                    </div>

                    <div className="dash-number">128</div>
                    <p>Books organized beautifully</p>

                    <div className="dash-bars">
                        <div><span>Business</span><b style={{ width: "86%" }} /></div>
                        <div><span>Biography</span><b style={{ width: "62%" }} /></div>
                        <div><span>Adventure</span><b style={{ width: "44%" }} /></div>
                    </div>

                    <div className="dash-bottom">
                        <div>
                            <strong>Top Review</strong>
                            <small>Excellent - 5 stars</small>
                        </div>
                        <span>⭐</span>
                    </div>
                </div>
            </section>

            <section className="home-features">
                <div>
                    <span>📖</span>
                    <h3>Books</h3>
                    <p>Keep your library structured and easy to browse.</p>
                </div>

                <div>
                    <span>✍️</span>
                    <h3>Authors</h3>
                    <p>Discover patterns across your favorite writers.</p>
                </div>

                <div>
                    <span>📊</span>
                    <h3>Analytics</h3>
                    <p>Understand your reading habits with visual insights.</p>
                </div>
            </section>
        </main>
    );
}

export default Home;