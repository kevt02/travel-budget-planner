/*import React from 'react'

function Home() {
  return (
    <div className="home"><h1>Home</h1></div>
  )
}

export default Home */




import { useLocation } from 'react-router-dom';

function HomePage() {
  const location = useLocation();
  const savedFlight = location.state?.savedFlight; 


  return (
    <div>
      {savedFlight && (
        <div>
          <h2>Saved Flight Information:</h2>
          <p>Flight Code: {savedFlight.flightCode}</p>
        
        </div>
      )}
    </div>
  );
}
export default HomePage;
