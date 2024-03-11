import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

function DisplayFlights() {
    const [userFlights, setUserFlights] = useState(0); // State to store flights
    const [userRecentFlights, setUserRecentFlights] = useState([])
    const [sortedFlights, setrecentFlights] = useState()


    const { isLoggedIn, uid } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/createaccount');
        }
    }, [isLoggedIn, navigate]);


    useEffect(() => {
        const fetchUserRecentFlights = async () => {
            if (isLoggedIn && uid) {
                try {
                    const response = await axios.get(`http://localhost:2000/auth/${uid}/flight`);
                    // Sort flights by departure date in descending order
                    const sortedFlights = response.data.sort((a, b) => new Date(b.DepartureDate) - new Date(a.DepartureDate));
                    // Take only the most recent flights (e.g., first 5)
                    setUserRecentFlights(sortedFlights);
                } catch (error) {
                    console.error('Error fetching user flights:', error);
                }
            }
        };



        fetchUserRecentFlights();
    }, [isLoggedIn, uid]);

    // Function to generate flight information text
    const generateFlightInfoText = () => {
        let flightInfoText = '';

        userRecentFlights.forEach((flight, index) => {
            flightInfoText += `Flight ${index + 1}:\n`;
            flightInfoText += `Flight Code: ${flight.FlightCode}\n`;
            flightInfoText += `Departure Airport: ${flight.DepartureAirportName} (${flight.DepartureAirportCode})\n`;
            flightInfoText += `Arrival Airport: ${flight.ArrivalAirportName} (${flight.ArrivalAirportCode})\n`;
            flightInfoText += `Departure Date: ${new Date(flight.DepartureDate).toLocaleDateString()}\n`;
            flightInfoText += `Departure Time: ${flight.DepartureTime}\n`;
            flightInfoText += `Arrival Date: ${new Date(flight.ArrivalDate).toLocaleDateString()}\n`;
            flightInfoText += `Arrival Time: ${flight.ArrivalTime}\n`;
            flightInfoText += `Price: $${flight.Price}\n\n`;
        });

        return flightInfoText;
    };



    return (
        <div>
            <h2>Most Recent Flights:</h2>
            {userRecentFlights.length > 0 ? (
                <textarea rows="10" cols="50" value={generateFlightInfoText()} readOnly />
            ) : (
                <p>No recent flights found.</p>
            )}
        </div>
    );
}





export default DisplayFlights;