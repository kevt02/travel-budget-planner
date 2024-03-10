import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditBalance() {

    const [balance, setBalance] = useState("");

    const { isLoggedIn, uid, login, logout } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/${uid}/balance`);
                console.log("get data:", response.data[0]);
                setBalance(response.data[0].AccountBalance);
            } catch (error) {
                console.error("Error getting balance", error);
            }
        };

        fetchData();
    }, [uid]);

    const handleChange = (e) => {
        setBalance((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }






    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(decodeURI(`http://localhost:2000/${uid}/balance`), balance);
            console.log(response);
            navigate(`/savings`);
        } catch (error) {
            console.error("Error changing balance", error);
        }
    };

    return (
        <div className="edit">
            <h2>EditBalance</h2>
            <form onSubmit={handleSubmit}>
                <label>Budget</label>
                <input
                    type="text"
                    name="AccountBalance"
                    value={balance.AccountBalance}
                    onChange={handleChange}
                />
                <button className="accept" type="submit">Accept Changes</button>
            </form>
        </div>
    )
}

export default EditBalance