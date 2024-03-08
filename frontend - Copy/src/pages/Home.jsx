import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const features = [
    'Start creating products',
    'Add pictures from your phone',
  ]

  return (
    <>
      <h1>DB Interact</h1>
      <p>DB Interact allows users to connect to their ebay accounts and have enhanced features</p>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </>
  )
}

export default Home