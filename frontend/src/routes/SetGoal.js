import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SetGoal() {

    const { isLoggedIn, uid, login, logout } = useAuth();

    const navigate = useNavigate();

    const [goals, setGoals] = useState({
        Budget: "",
        StartCity: "",
        EndCity: "",
        DepartDate: "",
        MaxDuration: ""
    });



    const handleChange = (e) => {
        setGoals((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        console.log("changed goals", goals);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post((`http://localhost:2000/savings/${uid}/goals`), goals);
            console.log(response);
            console.log("submitted goals", goals);
            navigate(`/savings`);
        } catch (error) {
            console.error("Error changing goals", error);
        }
    };

    return (
        <div className="edit">
            <h2>Set Goal</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Budget</label>
                    <input
                        type="text"
                        name="Budget"
                        value={goals.Budget}
                        onChange={handleChange}
                    />
                    <label>Departure City</label>
                    <input
                        type="text"
                        name="StartCity"
                        value={goals.StartCity}
                        onChange={handleChange}
                    />
                    <label>Arrival City</label>
                    <input
                        type="text"
                        name="EndCity"
                        value={goals.EndCity}
                        onChange={handleChange}
                    />
                    <label>Departure Date</label>
                    <input
                        type="date"
                        name="DepartDate"
                        value={goals.DepartDate.toString().split('T')[0]}
                        onChange={handleChange}
                    />
                    <label>Max Duration</label>
                    <input
                        type="text"
                        name="MaxDuration"
                        value={goals.MaxDuration}
                        onChange={handleChange}
                    />
                </div>
                <button className="accept" type="submit">Accept Changes</button>
            </form>
        </div>
    )
}

export default SetGoal