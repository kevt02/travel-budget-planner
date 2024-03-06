/*import React from 'react'

function Home() {
  return (
    <div className="home"><h1>Home</h1></div>
  )
}

export default Home */




import React from 'react';
import { useLocation } from 'react-router-dom';


function Home() {
  const location = useLocation();
  const selectedTravel = location.state?.selectedTravel;

  // Rest of your component logic

  return (
    <div className="home"><h1>Home</h1>

      {selectedTravel && (
        <div>
          <h3>Selected Travel Details:</h3>
          <p>Transportation Type: {selectedTravel.TravelType}</p>
          <p>Departure Time: {selectedTravel.DepartureTime}</p>
          <p>Arrival Time: {selectedTravel.ArrivalTime}</p>
          <p>Start City: {selectedTravel.StartCity}</p>
          <p>End City: {selectedTravel.EndCity}</p>
          <p>Estimate Price: ${selectedTravel.Price}</p>

        </div>
      )}

  
    </div>
  );
}

export default Home;
