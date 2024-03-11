import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LogIn = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:2000/auth/login', credentials);
            console.log(response.data);
            const { uid } = response.data;
            login(uid); // Set the user as logged in with the UID
            console.log(uid);
            navigate(`/savings`);
        } catch (error) {
            console.error('Login error:', error?.response?.data?.message || 'An unexpected error occurred');
            alert('Login failed: ' + (error?.response?.data?.message || 'An unexpected error occurred'));
        }
    };

    return (
        <div className="loginpage">
            <img src="https://qph.cf2.quoracdn.net/main-qimg-e50b26ef8f519d5b0f14407159bf1851-lq" alt="Travel Person" />
            <div className="container">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <br />
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            style={{ width: '300px' }}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            style={{ width: '300px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-warning">Log In</button>
                </form>
            </div>
        </div>

    );
};

export default LogIn;