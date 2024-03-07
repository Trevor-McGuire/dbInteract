import React from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_LOCATION } from '../utils/mutation'

const DeleteLocation = ({ id, refetch }) => {
  const [deleteLocation] = useMutation(DELETE_LOCATION)

  const handleDeleteLocation = async (e) => {
    e.preventDefault()
    try {
      await deleteLocation({
        variables: { id }
      })
      refetch()
    } catch (deleteError) {
      console.error('Delete failed:', deleteError.message)
    }
  }

  return (
    <>
      <button onClick={handleDeleteLocation}>Delete</button>
    </>
  )
}

export default DeleteLocation