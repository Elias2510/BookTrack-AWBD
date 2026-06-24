import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [adminCode, setAdminCode] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const requestBody = {
            firstName,
            lastName,
            email,
            password,
            role,
            adminCode: role === "ADMIN" ? adminCode : null,
        };

        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            alert("Eroare la înregistrare. Verifică datele sau codul de admin.");
            return;
        }

        alert("Cont creat cu succes!");
        navigate("/login");
    };

    return (
        <section className="card auth-card">
            <h1>Create account</h1>
            <p>Înregistrează-te în BookTrack.</p>

            <form className="auth-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />

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

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>

                {role === "ADMIN" && (
                    <input
                        type="password"
                        placeholder="Admin registration code"
                        value={adminCode}
                        onChange={(e) => setAdminCode(e.target.value)}
                        required
                    />
                )}

                <button type="submit">Register</button>
            </form>

            <p>
                Ai deja cont?{" "}
                <button className="link-button" onClick={() => navigate("/login")}>
                    Login
                </button>
            </p>
        </section>
    );
}

export default Register;