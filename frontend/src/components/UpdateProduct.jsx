import React from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_PRODUCT } from '../utils/mutation'

const UpdateProduct = ({ product, refetch, setEditingProduct }) => {
  const [updateProduct] = useMutation(UPDATE_PRODUCT)
  const [formState, setFormState] = React.useState({
    title: product.title,
    price: product.price,
    description: product.description
  })

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    try {
      await updateProduct({
        variables: { id: product._id, ...formState,
        // turn price into number
        price: parseFloat(formState.price)
        }
      })
      refetch()
      setEditingProduct(null)
    } catch (updateError) {
      console.error('Update failed:', updateError.message)
    }
  }

  return (
    <>
      <td>
        <input 
          type="text" 
          name="title" 
          value={formState.title} 
          onChange={(e) => setFormState({ ...formState, title: e.target.value })}
        />
      </td>
      <td>
        <input 
          type="text" 
          name="price" 
          value={formState.price} 
          onChange={(e) => setFormState({ ...formState, price: e.target.value })}
        />
      </td>
      <td>
        <input 
          type="text" 
          name="description" 
          value={formState.description} 
          onChange={(e) => setFormState({ ...formState, description: e.target.value })}
        />
      </td>
      <td>
        <button onClick={handleUpdateProduct}>Update</button>
      </td>
      <td>
        <button onClick={() => setEditingProduct(null)}>Cancel</button>
      </td>
    </>
  )
}

export default UpdateProduct