import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            alert("Email sau parolă incorectă");
            return;
        }

        const user = await response.json();

        localStorage.setItem("user", JSON.stringify(user));

        if (user.role?.name === "ADMIN") {
            navigate("/admin");
        } else {
            navigate("/books");
        }

        window.location.reload();
    };

    return (
        <section className="card auth-card">
            <h1>Login</h1>
            <p>Autentifică-te în BookTrack.</p>

            <form className="auth-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </section>
    );
}

export default Login;