import React from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";

function Header() {
  return (
    <nav className="header">
        <Link to="/" className="title">
            <img src={FaIcons.FaPiggyBank}/> 
            Penny Pilot
        </Link>
        <Link to="/login" className="login">Login</Link>
    </nav>
  )
}

export default Header