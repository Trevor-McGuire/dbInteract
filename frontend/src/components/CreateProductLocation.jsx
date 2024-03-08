import React from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PRODUCT_LOCATION } from '../utils/mutation'

const CreateProductLocation = ({ refetch, editingLocation, setEditingLocation }) => {
  const [createProductLocation] = useMutation(CREATE_PRODUCT_LOCATION)
  const [formState, setFormState] = React.useState({
    title: editingLocation.title,
  })

  const handleCreateProductLocation = async (e) => {
    e.preventDefault()
    try {
      await createProductLocation({
        variables: { ...formState }
      })
      refetch()
    } catch (createError) {
      console.error('Create failed:', createError.message)
    }
  }

  return (
    <>
      
      <form onSubmit={(e) => {
        e.preventDefault()
        handleCreateProductLocation(e)
      }}>
        <h2>Create Product Location</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formState.quantity}
            onChange={(e) => setFormState({ ...formState, quantity: parseInt(e.target.value) })}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default CreateProductLocation