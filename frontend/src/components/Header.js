import React from 'react'
import { Link } from 'react-router-dom'
import { GiPiggyBank } from "react-icons/gi";
import { FaUser } from "react-icons/fa";

function Header() {
  return (
    <nav className="header">
        <Link to="/" className="title">
            <GiPiggyBank />
            Penny Pilot
        </Link>
        <Link to="/createaccount" className="login"><FaUser />Login</Link>
    </nav>
  )
}

export default Header