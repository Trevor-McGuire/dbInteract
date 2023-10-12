import React from 'react'

const loggedOut = () => {
  return (
    <>
    <Link to="login"className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-xxlarge w3-round-large">
      <i className="fa fa-sign-in"></i>
    </Link>
    <Link to="register"className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-xxlarge w3-round-large">
      <i className="fa fa-user-plus"></i>
    </Link>
  </>
  )
}

export default loggedOut