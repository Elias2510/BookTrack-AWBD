import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Books from "./pages/Books";
import MyReadingLists from "./pages/MyReadingLists";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Statistics from "./pages/Statistics";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main className="container">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/reading-lists" element={<MyReadingLists />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;