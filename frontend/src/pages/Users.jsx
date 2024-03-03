import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../utils/query'

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS)

  return (
    <div>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: ${error.message}</p>}
      {data && data.users.map(user => (
        <p key={user.id}>{user.username}</p>
      ))}
    </div>
  )
}

export default Users