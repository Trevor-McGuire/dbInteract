import React from 'react'
import { useQuery } from '@apollo/client'
import { READ_PRODUCTS } from '../utils/query'
import CreateProducts from '../components/CreateProducts'
import DeleteProduct from '../components/DeleteProduct'

const Products = () => {
  const { loading, error, data, refetch } = useQuery(READ_PRODUCTS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <h1>Products</h1>
      <CreateProducts refetch={refetch} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.readProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <DeleteProduct id={product._id} refetch={refetch} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Products