import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../utils/query'


const User = () => {

    const { loading, error, data } = useQuery(GET_USER)

  return (
    <div>
      <h1>User</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: ${error.message}</p>}
      {data && (
        <p>
          {data.user.username} ({data.user.password})
        </p>
      )}
    </div>
  )
}

export default User