import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GiPiggyBank } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { useAuth } from './AuthContext';

function Header() {

  const { isLoggedIn, uid, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(`/createaccount`);
  };



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