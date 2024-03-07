import React from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PRODUCT } from '../utils/mutation'

const CreateProducts = ({ refetch }) => {
  const [createProduct] = useMutation(CREATE_PRODUCT)
  const [formState, setFormState] = React.useState({
    title: `Product${new Date().getTime()}`,
    price: Math.floor(Math.random() * 100),
    description: 'Description'
  })

  const handleCreateProduct = async (e) => {
    e.preventDefault()
    try {
      await createProduct({
        variables: { ...formState }
      })
      refetch()
    } catch (createError) {
      console.error('Creation failed:', createError.message)
    }
  }

  return (
    <>
      <h2>Create Product</h2>
      <form onSubmit={(e) => {
        handleCreateProduct(e)
      }}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formState.price}
            onChange={(e) =>
              setFormState({ ...formState, price: parseFloat(e.target.value) })
            }
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default CreateProducts