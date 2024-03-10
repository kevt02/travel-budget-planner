import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditBalance() {
    const [balance, setBalance] = useState(0); 

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
        setBalance(e.target.value); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:2000/${uid}/balance`, { AccountBalance: balance });
            console.log(response);
            navigate(`/savings`);
        } catch (error) {
            console.error("Error changing balance", error);
        }
    };

    return (
        <div className="edit">
            <h2>Edit Balance</h2>
            <form onSubmit={handleSubmit}>
                <label>Balance</label>
                <input
                    type="text"
                    name="AccountBalance"
                    value={balance}
                    onChange={handleChange}
                />
                <button className="accept" type="submit">
                    Accept Changes
                </button>
            </form>
        </div>
    );
}

export default EditBalance;
