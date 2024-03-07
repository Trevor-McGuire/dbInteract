import React from 'react'
import { READ_LOCATIONS } from '../utils/query'
import { useQuery } from '@apollo/client'
import CreateLocation from '../components/CreateLocation'
import DeleteLocation from '../components/DeleteLocation'
import { useState } from 'react'
import UpdateLocation from '../components/UpdateLocation'

const Locations = () => {
  const { loading, error, data, refetch } = useQuery(READ_LOCATIONS)
  const [editingLocation, setEditingLocation] = useState(null)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <h1>Locations</h1>
      <CreateLocation refetch={refetch} />
      <table>
        <thead>
          <tr>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.readLocations && data.readLocations.map((location) => (
            <tr key={location._id}>
              {editingLocation?._id === location._id ? (
                <>
                  <UpdateLocation location={location} refetch={refetch} setEditingLocation={setEditingLocation} />
                </>
              ) : (
                <>
                  <td>{location.name}</td>
                  <td>{location._id}</td>
                  <td>
                    <DeleteLocation id={location._id} refetch={refetch} />
                  </td>
                  <td>
                    <button onClick={() => setEditingLocation(location)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Locations