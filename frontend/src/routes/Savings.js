import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import UserSettings from '../components/UserSettings';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Savings() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  const { uid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (uid === undefined) {
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
      <UserSettings />
      <Graph />
    </div>
  );
}

export default Savings;
