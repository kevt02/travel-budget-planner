import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Flights() {
  const [travels, setTravels] = useState([]);
  const [travelType, setTravelType] = useState('Plane');
  const [startCity, setStartCity] = useState('');
  const [endCity, setEndCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  const fetchTravelData = async () => {
    if (!startCity || !endCity || !startDate || !endDate) {
      setError('Please fill out all fields to search for your preferred travel type.');
      setSearchPerformed(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:2000/auth/travel`, {
        params: {
          type: travelType,
          startDate: startDate,
          endDate: endDate,
          startCity: startCity,
          endCity: endCity,
        },
      });
      if (response.data.length > 0) {
        const sortedData = response.data.sort((a, b) => a.price - b.price);
        setTravels(sortedData);
        setError('');
      } else {
        setTravels([]);
        setError('');
      }
    } catch (error) {
      console.error('There was an error fetching the travel data:', error);
      setError('Failed to fetch travel data.');
    } finally {
      setSearchPerformed(true);
    }
  };


  const handleApply = (travel) => {
    console.log('Applying for travel:', travel);
    navigate('/', { state: { selectedTravel: travel } });
    //navigate('/'); // Navigate back to the homepage 
  };

  return (
    <div className="flights-container">
      <h1>Search Transportation</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="search-fields">
        <input
          type="text"
          value={startCity}
          onChange={(e) => setStartCity(e.target.value)}
          placeholder="Start City"
        />
        <input
          type="text"
          value={endCity}
          onChange={(e) => setEndCity(e.target.value)}
          placeholder="End City"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <select
          value={travelType}
          onChange={(e) => setTravelType(e.target.value)}
        >
          <option value="Plane">Plane</option>
          <option value="Train">Train</option>
        </select>
        <button onClick={fetchTravelData}>Search</button>
      </div>
      <div className="flight-results">
        {searchPerformed ? (
          travels.length > 0 ? (
            travels.map((travel) => (
              <div className="flight-card" key={travel.TravelID}>
               
                <div className="flight-info">
                  <div className="flight-info time-info">
                    <span className="label">Departure Time:</span>
                    <span>{travel.DepartureTime}</span>
                  </div>
                  <div className="flight-info time-info">
                    <span className="label">Arrival Time:</span>
                    <span>{travel.ArrivalTime}</span>
                  </div>
                  <div className="flight-info time-info">
                    <span className="label">Start Date:</span>
                    <span>{new Date(travel.StartDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flight-info time-info">
                    <span className="label">End Date:</span>
                    <span>{new Date(travel.EndDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flight-info price-highlight">
                    <span className="label">Price:</span>
                    <span>${travel.Price}</span>
                    <button className="apply-button" onClick={() => handleApply(travel)}>
                      Apply
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="no-results">
                No information on this date. Please select another day.
            </div>
          )
        ) : null}
      </div>
      <Link to="/" className="back-home-link">Back to Home Page</Link>

    </div>
  );
}

export default Flights;
