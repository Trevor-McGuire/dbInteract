import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../utils/query'
import RoutesList from "../components/RoutesList";


const User = () => {

    const { loading, error, data } = useQuery(GET_USER, {
        variables: { userId: 1 }
    });

  return (
    <div>
      <h1>User</h1>
      <RoutesList />
      {loading && <p>Loading...</p>}
      {error && <p>Error: ${error.message}</p>}
      {data && (
        <p>
          {data.user.name} ({data.user.email})
        </p>
      )}
    </div>
  )
}

export default User