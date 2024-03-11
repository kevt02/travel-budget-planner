import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userFlights, setUserFlights] = useState([]);
  const { isLoggedIn, uid } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/createaccount');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchUserFlights = async () => {
      if (isLoggedIn && uid) {
        try {
          const response = await axios.get(`http://localhost:2000/auth/${uid}/flight`);
          setUserFlights(response.data);
        } catch (error) {
          console.error('Error fetching user flights:', error);
        }
      }
    };

    fetchUserFlights();
  }, [isLoggedIn, uid]);

  return (
    <div>
      <h2>User Flights:</h2>
      {userFlights.length > 0 ? (
        userFlights.map((flight, index) => (
          <div key={index}>
            <p>Flight Code: {flight.FlightCode}</p>
            <p>Departure Airport: {flight.DepartureAirportName} ({flight.DepartureAirportCode})</p>
            <p>Arrival Airport: {flight.ArrivalAirportName} ({flight.ArrivalAirportCode})</p>
            <p>Departure Date: {new Date(flight.DepartureDate).toLocaleDateString()}</p>
            <p>Departure Time: {flight.DepartureTime}</p>
            <p>Arrival Date: {new Date(flight.ArrivalDate).toLocaleDateString()}</p>
            <p>Arrival Time: {flight.ArrivalTime}</p>
            <p>Price: ${flight.Price}</p>
          </div>
        ))
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
}

export default Home;
