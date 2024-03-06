import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Flights() {
  const [travels, setTravels] = useState([]);
  const [travelType, setTravelType] = useState('Plane');
  const [startCity, setStartCity] = useState('');
  const [endCity, setEndCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  // Function to fetch travel data based on the user's input
  const fetchTravelData = () => {
    axios.get(`http://localhost:2000/auth/travel`, {
      params: {
        type: travelType,
       // startDate: startDate,
       // endDate: endDate,
        date: endDate,
        startCity: startCity,
        endCity: endCity
      }
    })
      .then(res => {
        setTravels(res.data);
      })
      .catch(error => {
        console.error('There was an error fetching the travel data:', error);
      });
  };

  const handleSearch = () => {
    fetchTravelData();
  };

  // Sort the fetched travel data by price to identify the cheapest option
  const sortedTravelsByPrice = [...travels].sort((a, b) => a.Price - b.Price);


  const handleApply = (travel) => {
    console.log('Applying for travel deal:', travel);
    //navigate('/', { state: { selectedTravel: travel } }); // Pass the selected travel option to the homepage
  };

  return (
    <div className="flights">
      <h1>Flights</h1>
      <div>
        {/* Input fields for start city, end city, start date, end date, and travel type */}
        <input type="text" value={startCity} onChange={(e) => setStartCity(e.target.value)} placeholder="Start City" />
        <input type="text" value={endCity} onChange={(e) => setEndCity(e.target.value)} placeholder="End City" />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
        <select value={travelType} onChange={(e) => setTravelType(e.target.value)}>
          <option value="Plane">Plane</option>
          <option value="Train">Train</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      {travels.length > 0 ? (
        <div>
          {/* List of all options */}
          <ul>
            {travels.map(travel => (
              <li key={travel.TravelID}>
                {travel.StartCity} to {travel.EndCity} - {travel.Price}
                <button onClick={() => handleApply(travel)}>Apply</button>
              </li>
            ))}
          </ul>
          {/* Displaying the cheapest option */}
          <h2>Cheapest Option</h2>
          <div>
            {sortedTravelsByPrice[0] && (
              <div>
                {sortedTravelsByPrice[0].StartCity} to {sortedTravelsByPrice[0].EndCity} - {sortedTravelsByPrice[0].Price}
                <button onClick={() => handleApply(sortedTravelsByPrice[0])}>Apply</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No flight options available.</p>
      )}
      <Link to="/">Back to Home Page</Link>
    </div>
  );
}

export default Flights;
