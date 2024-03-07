import React from 'react'
import { Link } from 'react-router-dom';

function UserSettings() {
  return (
    <div className="usersettings">
        <Link to="!#" className="settings">Add Credit</Link>
        <Link to="!#" className="settings">Edit Goal</Link>
    </div>
  )
}

export default UserSettings