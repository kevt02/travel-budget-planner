import './CreateAccount.css';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const CreateAccount = () => {
    const [credentials, setCredentials] = useState({
        UID: "",
        Password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrorMessage(""); // Clear any previous error message
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:2000/", credentials);
            console.log(response.data);
            // Extract UID from credentials and navigate to the URL with UID
            const { UID } = credentials;
            navigate(`/${UID}`);
        } catch (err) {
            if (err.response && err.response.status === 400 && err.response.data && err.response.data.Error) {
                setErrorMessage("Email already exist. Please try different email.");
            } else {
                console.log("Error: " + err);
            }
        }
    };

    return (
        <div className="container">
            <h2>Create an account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        name="UID"
                        className="form-control"
                        value={credentials.UID}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        name="Password"
                        className="form-control"
                        value={credentials.Password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errorMessage && <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Email already exist! Please try different email.</strong>
                </div>}
                <button type="submit" className="btn btn-primary">Create Account</button>
                <br/>
                <br/>
                <Link to="/login" className="btn btn-primary">Already Have an Account?</Link>
            </form>
        </div>
    );
};

export default CreateAccount;
