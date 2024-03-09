import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Flights() {
  const [flights, setFlights] = useState([]);
  const [departAirportCode, setDepartAirportCode] = useState('');
  const [destAirportCode, setDestAirportCode] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  const fetchFlightData = async () => {
    if (!departAirportCode || !destAirportCode || !date) {
      setError('Please fill out all fields to search for flights.');
      setSearchPerformed(false);
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://flight-fare-search.p.rapidapi.com/v2/flights/',
      params: {
        from: departAirportCode,
        to: destAirportCode,
        date: date,
        type: 'economy',
        currency: 'USD'
      },
      headers: {
        'X-RapidAPI-Key': '570c04da9dmshbf7dc3f7da9503ep12a0edjsn1b82ee6baf4e',
        'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log('Response:', response.data);

      const { results } = response.data;
      if (results && results.length > 0) {
        const flightsData = results.map(flight => {
          const departureDate = flight.departureAirport.time.split('T')[0];
          const departureTime = flight.departureAirport.time.split('T')[1];
          const arrivalDate = flight.arrivalAirport.time.split('T')[0];
          const arrivalTime = flight.arrivalAirport.time.split('T')[1];

          return {
            flightName: flight.flight_name,
            flightCode: flight.flight_code,
            
            departureAirport: {
              date: departureDate,
              time: departureTime,
              code: flight.departureAirport.code,
              label: flight.departureAirport.label
            },
            arrivalAirport: {
              date: arrivalDate,
              time: arrivalTime,
              code: flight.arrivalAirport.code,
              label: flight.arrivalAirport.label
            },
            price: flight.totals.total
          };
        });
        setFlights(flightsData);
        setError('');
      } else {
        setFlights([]);
        setError('No flights found for the given criteria.');
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setError('Failed to fetch flight data. Please try again later.');
    } finally {
      setSearchPerformed(true);
    }
  };


  const saveFlightData = async (flight) => {
   
    const flightData = {
      flightCode: flight.flightCode,
      departureAirport: {
      code: flight.departureAirport.code,
      },
      arrivalAirport: {
        code: flight.arrivalAirport.code,
      },
      departureDate: flight.departureAirport.date, 
      departureTime: flight.departureAirport.time, 
      arrivalDate: flight.arrivalAirport.date,     
      arrivalTime: flight.arrivalAirport.time,    
      price: flight.price.toFixed(2)
    };

    try {
      const response = await axios.post('http://localhost:2000/auth/saveFlight', flightData);
      console.log('Flight saved:', response.data);
      navigate('/', { state: { savedFlight: flight } });
    } catch (error) {
      console.error('Error saving flight:', error);
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
          placeholder="Departure Airport Code"
        />
        <input
          type="text"
          value={destAirportCode}
          onChange={(e) => setDestAirportCode(e.target.value)}
          placeholder="Destination Airport Code"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Departure Date"
        />
        <button onClick={fetchFlightData}>Search</button>
      </div>
      
      <div className="flight-results">
        {searchPerformed && (
          flights.length > 0 ? (
            flights.map((flight, index) => (
              <div className="flight-card" key={index}>
                <div className="flight-header">
                  <span className="flight-name">{flight.flightName}</span>
                  <span className="flight-code">{flight.flightCode}</span>
                  <span className="flight-price">{`$${flight.price}`}</span>
                </div>
                <div className="flight-body">
                  <div className="flight-info">
                    <span className="label">Departure:</span>
                    <span>{flight.departureAirport.label}</span>
                    <span>{flight.departureAirport.date}</span>
                    <span>{flight.departureAirport.time}</span>
                  </div>
                  <div className="flight-info">
                    <span className="label">Arrival:</span>
                    <span>{flight.arrivalAirport.label}</span>
                    <span>{flight.arrivalAirport.date}</span>
                    <span>{flight.arrivalAirport.time}</span>
                  </div>
                </div>
                <button className="apply-button" onClick={() => saveFlightData(flight)}>
                  Apply
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">No flights found. Please adjust your search criteria.</div>
          )
        )}
      </div>
      <Link to="/" className="back-home-link">Back to Home Page</Link>
    </div>
  );
}

export default Flights;