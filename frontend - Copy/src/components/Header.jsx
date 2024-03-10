import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
    </header>
  )
}

export default Header