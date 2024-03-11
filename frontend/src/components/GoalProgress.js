import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

function GoalProgress() {
    const [currentBalance, setCurrentBalance] = useState(0);
    const [goalBalance, setGoalBalance] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const { uid } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const balanceResponse = await axios.get(`http://localhost:2000/${uid}/balance`);
                setCurrentBalance(balanceResponse.data[0].AccountBalance);

                const totalResponse = await axios.get(`http://localhost:2000/${uid}/totalprice`);
                const total = totalResponse.data[0].HotelPrice + totalResponse.data[0].FlightPrice;
                setGoalBalance(total);
            } catch (error) {
                console.error("Error getting balance", error);
            }
        };

        fetchData();
    }, [uid]);

    useEffect(() => {
        setPercentage((prevPercentage) => (currentBalance / goalBalance) * 100);
    }, [currentBalance, goalBalance]);

    return (
        <div className="goal-progress">
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
                <label className="progress-label">{currentBalance} out of {goalBalance}</label>
            </div>
        </div>
    );
}

export default GoalProgress;