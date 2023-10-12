import React from 'react'
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client'
import { READ_USER } from '../utils/queries'

const Profile = () => {
  const { data, error, loading } = useQuery(READ_USER)
  const user = data?.readUser || {}
  if (loading) {return <h2>LOADING...</h2>}
  if (error) {return <h2>{error.message}</h2>}
  if (!user) {return <h2>Please log in to view your profile.</h2>}
  
  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Billing Address: {user.billingAddress}</p>
      <p>Shipping Address: {user.shippingAddress}</p>
    </div>
  )
}

export default Profile