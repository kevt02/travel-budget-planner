import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

function DisplayFlights() {
    const [userRecentFlights, setUserRecentFlights] = useState([]);
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
                    if (response.data && response.data.length > 0) {
                        const flightsWithDepartDate = response.data.map(flight => ({
                            ...flight,
                            DepartDate: flight.DepartureDate ? new Date(flight.DepartureDate).toLocaleDateString() : null
                        }));
                        const sortedFlights = flightsWithDepartDate.sort((a, b) => new Date(b.DepartureDate) - new Date(a.DepartureDate));
                        setUserRecentFlights(sortedFlights);
                    } else {
                        console.log('No recent flights found.');
                    }
                } catch (error) {
                    console.error('Error fetching user flights:', error);
                }
            }
        };

        fetchUserRecentFlights();
    }, [isLoggedIn, uid]);

    const generateFlightInfoText = () => {
        let flightInfoText = '';

        userRecentFlights.forEach((flight, index) => {
            // Check if flight and DepartDate are defined
            if (flight && flight.DepartDate) {
                flightInfoText += `Flight ${index + 1}:\n`;
                flightInfoText += `Flight Code: ${flight.FlightCode}\n`;
                flightInfoText += `Departure Airport: ${flight.DepartureAirportName} (${flight.DepartureAirportCode})\n`;
                flightInfoText += `Arrival Airport: ${flight.ArrivalAirportName} (${flight.ArrivalAirportCode})\n`;
                flightInfoText += `Departure Date: ${flight.DepartDate}\n`;
                flightInfoText += `Departure Time: ${flight.DepartureTime}\n`;
                flightInfoText += `Arrival Date: ${flight.ArrivalDate ? new Date(flight.ArrivalDate).toLocaleDateString() : 'N/A'}\n`;
                flightInfoText += `Arrival Time: ${flight.ArrivalTime}\n`;
                flightInfoText += `Price: $${flight.Price}\n\n`;
            }
        });

        return flightInfoText || "No recent flights found.";
    };

    return (
        <div className="displayflights">
            <h2>Most Recent Flights:</h2>
            <br />
            {userRecentFlights.length > 0 ? (
                <textarea style={{ width: '100%' }} rows="10" cols="25" value={generateFlightInfoText()} readOnly />
            ) : (
                <p>No recent flights found.</p>
            )}
        </div>
    );
}

export default DisplayFlights;