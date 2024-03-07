import React from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_PRODUCT } from '../utils/mutation'

const DeleteProduct = ({ id, refetch }) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT)

  const handleDeleteProduct = async (e) => {
    e.preventDefault()
    try {
      await deleteProduct({
        variables: { id }
      })
      refetch()
    } catch (deleteError) {
      console.error('Deletion failed:', deleteError.message)
    }
  }

  return (
    <>
      <button onClick={(e) => {
        handleDeleteProduct(e)
      }}>Delete</button>
    </>
  )
}

export default DeleteProduct