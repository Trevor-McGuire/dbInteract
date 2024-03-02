import React from 'react'
import { Link } from 'react-router-dom'

const RoutesList = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/user">User</Link>
      </li>
      <li>
        <Link to='/users'>Users</Link>
      </li>
    </ul>
  )
}

export default RoutesList