import React from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_LOCATION } from '../utils/mutation'


const UpdateLocations = ({ location, refetch, setEditingLocation }) => {
  const [updateLocation] = useMutation(UPDATE_LOCATION)
  const [formState, setFormState] = React.useState({
    name: location.name
  })

  const handleUpdateLocation = async (e) => {
    e.preventDefault()
    try {
      await updateLocation({
        variables: { id: location._id, ...formState }
      })
      refetch()
      setEditingLocation(null)
    } catch (updateError) {
      console.error('Update failed:', updateError.message)
    }
  }

  return (
    <>
      <td>
        <input 
          type="text" 
          name="name" 
          value={formState.name} 
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />
      </td>
      <td>
        <button onClick={handleUpdateLocation}>Update</button>
      </td>
      <td>
        <button onClick={() => setEditingLocation(null)}>Cancel</button>
      </td>
    </>
  )
}

export default UpdateLocations