import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Flights() {
  const { isLoggedIn, uid } = useAuth();
  const [flights, setFlights] = useState([]);
  const [departAirportCode, setDepartAirportCode] = useState('');
  const [destAirportCode, setDestAirportCode] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  const fetchFlightData = async () => {
    setError(''); 
    if (!departAirportCode || !destAirportCode || !date) {
      setError('Please fill out all fields to search for flights!');
      setSearchPerformed(false);
      return;
    }

    try {
      const response = await axios.get('https://flight-fare-search.p.rapidapi.com/v2/flights/', {
        params: { from: departAirportCode, to: destAirportCode, date, type: 'economy', currency: 'USD' },
        headers: {
          'X-RapidAPI-Key': '17bb424841msh89c59abdc2c6ca2p18caeajsnc82d63b3e68f',
         // 'X-RapidAPI-Key': '570c04da9dmshbf7dc3f7da9503ep12a0edjsn1b82ee6baf4e',
          //'X-RapidAPI-Key': '331d9b53f7mshc90d0bdd81195f0p1568a1jsnf78fe26e2c3c',
          'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
        }
      });

      const results = response.data?.results || [];
      if (results.length > 0) {
        const flightsData = results.map(flight => ({
          FlightName: flight.flight_name,
          FlightCode: flight.flight_code,
          DepartureAirportCode: flight.departureAirport.code,
          DepartureAirportName: flight.departureAirport.label,
          ArrivalAirportCode: flight.arrivalAirport.code,
          ArrivalAirportName: flight.arrivalAirport.label,
          DepartureDate: flight.departureAirport.time.split('T')[0],
          DepartureTime: flight.departureAirport.time.split('T')[1],
          ArrivalDate: flight.arrivalAirport.time.split('T')[0],
          ArrivalTime: flight.arrivalAirport.time.split('T')[1],
          Price: flight.totals.total.toFixed(2)
        }));
        setFlights(flightsData);
      } else {
        setError('');
        setFlights([]);
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setError('');
    } finally {
      setSearchPerformed(true);
    }
  };
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/createaccount');
    }
  }, [isLoggedIn, uid, navigate]);

  const saveFlightData = async (flight) => {
    if (!isLoggedIn) {
      setError('You must be logged in to apply for flights.');
      return;
    }


    const flightDataWithUID = {
      userId: uid,
      flightCode: flight.FlightCode, 
      departureAirport: flight.DepartureAirportCode, 
      departureAirportName: flight.DepartureAirportName, 
      arrivalAirport: flight.ArrivalAirportCode, 
      arrivalAirportName: flight.ArrivalAirportName, 
      departureDate: flight.DepartureDate, 
      departureTime: flight.DepartureTime, 
      arrivalDate: flight.ArrivalDate, 
      arrivalTime: flight.ArrivalTime, 
      price: flight.Price, 
    };


    try {
      const response = await axios.post('http://localhost:2000/auth/saveFlight', flightDataWithUID);
      console.log('Flight saved:', response.data);
      navigate('/savings'); 
    } catch (error) {
     
      console.error('Error saving flight:', error.response ? error.response.data : error);
      setError('Unable to save flight. Please try again later.'); 
    }
  };




  return (
    <div className="flights-container">
      <h1>Search Flights</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="search-fields">
        <input
          type="text"
          value={departAirportCode}
          onChange={(e) => setDepartAirportCode(e.target.value)}
          placeholder="Depart Airport Code"
        />
        <input
          type="text"
          value={destAirportCode}
          onChange={(e) => setDestAirportCode(e.target.value)}
          placeholder="Destin Airport Code"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Departure Date"
        />
        <button onClick={fetchFlightData} className="btn btn-warning">Search</button>
      </div>
      
      <div className="flight-results">
        {searchPerformed && (
          flights.length > 0 ? (
            flights.map((flight, index) => (
              <div className="flight-card" key={index}>
                <div className="flight-card" key={index}>
                  <div className="flight-header">
                    <span className="flight-name">{flight.FlightName}</span>
                    <span className="flight-code">{flight.FlightCode}</span>
                    <span className="flight-price">{`$${flight.Price}`}</span>
                  </div>
                  <div className="flight-body">
                    <div className="flight-info">
                      <span className="label">Departure:</span>
                      <span>{flight.DepartureAirportName}</span>
                      <span>{flight.DepartureDate}</span>
                      <span>{flight.DepartureTime}</span>
                    </div>
                    <div className="flight-info">
                      <span className="label">Arrival:</span>
                      <span>{flight.ArrivalAirportName}</span>
                      <span>{flight.ArrivalDate}</span>
                      <span>{flight.ArrivalTime}</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-warning" onClick={() => saveFlightData(flight)}>
                  Apply
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">No flights found. Please adjust your search criteria.</div>
          )
        )}
      </div>
      <Link to="/" className="btn btn-warning">Back to Home Page</Link>
    </div>
  );
}

export default Flights;