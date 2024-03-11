import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import GoalProgress from '../components/GoalProgress';

function Savings() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  // const { uid } = useParams();

  const { isLoggedIn, uid, login, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/createaccount');
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:2000/${uid}/name`);
          setFname(response.data[0].fname);
          setLname(response.data[0].lname);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData(); // Call the async function
    }
  }, [uid, navigate]);

  return (
    <div className="savings">
      <h1>Welcome {fname}!</h1>
      <div className="usersettings">
        <Link to="/editbalance" className="settings">Add Credit</Link>
        <Link to="/editgoal" className="settings">Edit Goal</Link>
    </div>
    <GoalProgress />
      <Graph />
    </div>
  );
}

export default Savings;
