import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../utils/query'
import RoutesList from "../components/RoutesList";

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS)

  return (
    <div>
      <h1>Users</h1>
      <RoutesList />
      {loading && <p>Loading...</p>}
      {error && <p>Error: ${error.message}</p>}
      {data && data.users.map(user => (
        <p key={user.id}>{user.username}</p>
      ))}
    </div>
  )
}

export default Users