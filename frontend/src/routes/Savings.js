import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import GoalProgress from '../components/GoalProgress';
import DisplayFlights from '../components/DisplayFlights';

function Savings() {
  const [fname, setFname] = useState('');
  const { isLoggedIn, uid } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/createaccount');
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:2000/${uid}/name`);
          setFname(response.data[0].fname);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [uid, navigate]);

  return (
    <div className="savings">
      <div className="quadrant">
        <h1>Welcome {fname}!</h1>
        <GoalProgress />
        <div className="usersettings">
          <Link to="/editbalance" className="settings">Add Credit</Link>
          <Link to="/editgoal" className="settings">Edit Goal</Link>
        </div>
      </div>
      <div className="quadrant"><DisplayFlights /></div>
      <Graph />
    </div>
  );
}

export default Savings;
