import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from '../components/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const CreateAccountDetail = () => {
    const { isLoggedIn, uid } = useAuth();
    const navigate = useNavigate();


    const [userInfo, setuserInfo] = useState({
        FName: "",
        LName: "",
        PaymentInfo: ""
    });

    // const navigate = useNavigate();


    /*useEffect(() => {
        axios.get("http://localhost:2000/createaccount/" + uid)
            .then((res) => {
                console.log("response: ", res);
                setuserInfo(res.data[0]);
            })
            .catch((err) => console.log("Error: ", err));
    }, [uid]);*/


    const handleChange = (e) => {
        setuserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(decodeURI("http://localhost:2000/createaccount/" + uid), userInfo)
            navigate("/setgoal");
        } catch (err) {
            console.log("Error: " + err);
        }
    };

    return (
        <div className="container">
            <h2>Create an account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="FName"
                        class="form-control"
                        value={userInfo.FName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="LName"
                        class="form-control"
                        value={userInfo.LName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Credit/Debit:</label>
                    <input
                        type="text"
                        name="PaymentInfo"
                        class="form-control"
                        pattern="^\d{4}-\d{4}-\d{4}-\d{4}$"
                        value={userInfo.PaymentInfo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );

};

export default CreateAccountDetail;