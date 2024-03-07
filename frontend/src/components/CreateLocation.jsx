import React from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_LOCATION } from '../utils/mutation'
import { useState } from 'react'

const CreateLocation = ({ refetch }) => {
  const [createLocation] = useMutation(CREATE_LOCATION)
  const [formState, setFormState] = useState({
    name: ''
  })

  const handleCreateLocation = async (e) => {
    e.preventDefault()
    try {
      await createLocation({
        variables: { ...formState }
      })
      refetch()
    } catch (createError) {
      console.error('Create failed:', createError.message)
    }
  }

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleCreateLocation(e)
      }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateLocation
