import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/login', credentials);
            console.log(response.data);
            alert('Login successful!');
            // navigate('/'); // Navigate to the home page after login
        } catch (error) {
            console.error("Login error:", error.response.data.message);
            alert('Login failed: ' + error.response.data.message);
        }
    };

    return (
        <div className="container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LogIn;
