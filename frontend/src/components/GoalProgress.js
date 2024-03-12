import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

function GoalProgress() {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [goalBalance, setGoalBalance] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(true); 
  const { uid } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceResponse = await axios.get(`http://localhost:2000/savings/${uid}/balance`);
        // Check if there is no AccountBalance object
        if (!balanceResponse.data[0].AccountBalance) {
          setCurrentBalance(0);
        } else {
          setCurrentBalance(balanceResponse.data[0].AccountBalance);
        }
        const budgetResponse = await axios.get(`http://localhost:2000/savings/${uid}/goals`);

        // Set goalBalance and update showProgressBar based on its value
        const budget = budgetResponse.data[0].Budget;
        setGoalBalance(budget);
        setShowProgressBar(budget > 0);

      } catch (error) {
        console.error("Error getting balance", error);
      }
    };

    fetchData();
  }, [uid]);

  useEffect(() => {
    // Calculate percentage only if the progress bar is supposed to be shown
    if (showProgressBar) {
      const calculatedPercentage = (currentBalance / goalBalance) * 100;

      // Ensure the percentage does not exceed 100
      const clampedPercentage = Math.min(calculatedPercentage, 100);

      setPercentage(clampedPercentage);
    }
  }, [currentBalance, goalBalance, showProgressBar]);

  return (
    <div className="goal-progress">
      {showProgressBar && (
        <div className="goal-progress-bar">
          <div className="goal-progress-bar-fill" style={{ width: `${percentage}%` }}></div>
          <label className="progress-title">
            {currentBalance} out of {goalBalance} Reached!
            {percentage >= 100 && " - Goal Completed"}
          </label>
        </div>
      )}
      {!showProgressBar && <p>No Current Goal</p>}
    </div>
  );
}

export default GoalProgress;
