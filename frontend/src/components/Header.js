import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GiPiggyBank } from "react-icons/gi";
import { FaUser } from "react-icons/fa";

function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any necessary logout actions
    // ...

    // Update the login status
    setIsLoggedIn(false);
    navigate(`/createaccount`);
  };

  useEffect(() => {
    // Check if the user is logged in based on the current location
    setIsLoggedIn(location.pathname.startsWith('/savings'));
  }, [location.pathname]);

  return (
    <nav className="header">
        <Link to="/" className="title">
            <GiPiggyBank />
            Penny Pilot
        </Link>
        {isLoggedIn ? (
        // If logged in, show the logout button
        <button onClick={handleLogout} className="login">
          <FaUser />
          Logout
        </button>
      ) : (
        // If not logged in, show the login link
        <Link to="/createaccount" className="login">
          <FaUser />
          Login
        </Link>
      )}
    </nav>
  )
}

export default Header