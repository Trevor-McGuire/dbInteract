import React from 'react'

import CreateLocation from '../components/CreateLocation'

const locationsImport = [{
  id: 1,
  name: "Location 1",
  status: "Partially Used"
},
{
  id: 2,
  name: "Location 2",
  status: "Empty"
},
{
  id: 3,  
  name: "Location 3",
  status: "Full"
},
{
  id: 4,
  name: "Location 4",
  status: "Inactive"
}
]

const tableHeaders = () => {
  const keysArray = Object.keys(locationsImport[0]);
  keysArray.forEach((key, index) => {
    keysArray[index] = key.replace(/([A-Z])/g, " $1").trim();
    keysArray[index] =
      keysArray[index].charAt(0).toUpperCase() + keysArray[index].slice(1);
  });

  return (
    <thead>
      <tr>
        {keysArray.map((key, index) => (
          <th key={index}>{key}</th>
        ))}
      </tr>
    </thead>
  );
};


const ViewLocations = () => {
  return (
    <>
      <CreateLocation />
      <h1>View Locations</h1>
      <table
        style={{
          textAlign: 'center',
          border: '1px solid black',
          borderCollapse: 'collapse',
        }}
      >
        {tableHeaders()}
        <tbody>
          {locationsImport.map((location) => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>{location.name}</td>
              <td>{location.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ViewLocations