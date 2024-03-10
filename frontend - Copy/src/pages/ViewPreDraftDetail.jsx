import React from 'react'

const productImport = {
  id: 1,
  title: "Product 1",
  photo: "photo",
  category: "watch",
  requiredFeatures: {
    brand: "Rolex",
    model: "Submariner",
    year: 2021,
    condition: "new",
  },
  features: {
    color: "black",
    material: "steel",
    movement: "automatic",
  },
  customFeatures: {
    waterResistance: "100m",
    powerReserve: "48h",
  },
  quantity: 3,
  location: "ww4",
  status: "draft",
  createdDate: "2021-06-23",
  createdBy: "John Doe",
};

const ViewPreDraftDetail = () => {
  return (
    <div>
      <h1>View Pre Draft Detail</h1>
      <table
        style={{
          textAlign: "center",
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Photo</th>
            <th>Category</th>
            <th>Required Features</th>
            <th>Features</th>
            <th>Custom Features</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{productImport.title}</td>
            <td>{productImport.photo}</td>
            <td>{productImport.category}</td>
            <td>
              <ul>
                <li>Brand: {productImport.requiredFeatures.brand}</li>
                <li>Model: {productImport.requiredFeatures.model}</li>
                <li>Year: {productImport.requiredFeatures.year}</li>
                <li>Condition: {productImport.requiredFeatures.condition}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Color: {productImport.features.color}</li>
                <li>Material: {productImport.features.material}</li>
                <li>Movement: {productImport.features.movement}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Water Resistance: {productImport.customFeatures.waterResistance}</li>
                <li>Power Reserve: {productImport.customFeatures.powerReserve}</li>
              </ul>
            </td>
            <td>{productImport.quantity}</td>
            <td>{productImport.location}</td>
            <td>{productImport.status}</td>
            <td>{productImport.createdDate}</td>
            <td>{productImport.createdBy}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewPreDraftDetail