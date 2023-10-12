import React from 'react'

const loggedIn = () => {
  return (
    <>
    <Link
      to="/cart"
      className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-xxlarge w3-round-large"
    >
      <i className="fa fa-shopping-cart"></i>
      <span>{numberOfItems}</span>
    </Link>
    <Link to="/profile"className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-xxlarge w3-round-large">
      <i className="fa fa-user"></i>
    </Link>
    <Link to="/"className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-xxlarge w3-round-large" onClick={() => {Auth.logout()}}>
      <i className="fa fa-sign-out"></i>
    </Link>
  </>
  )
}

export default loggedIn