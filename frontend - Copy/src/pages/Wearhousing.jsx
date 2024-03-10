import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const locationsImport = ["Location 1", "Location 2", "Location 3"];
const productsImport = [
  {
    id: 1,
    title: "Product 1",
    quantity: 3,
    photo: "photo",
    location: null,
  },
  {
    id: 2,
    title: "Product 2",
    quantity: 5,
    photo: "photo",
    location: null,
  },
  {
    id: 3,
    title: "Product 3",
    quantity: 7,
    photo: "photo",
    location: null,
  },
];


const locationOptions = () => {
  return locationsImport.map((location, index) => (
    <option key={index} value={location}>
      {location}
    </option>
  ));
};

const tableHeaders = () => {
  const keysArray = Object.keys(productsImport[0]);
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
        <th>Checkbox</th>
      </tr>
    </thead>
  );
};

const Wearhousing = () => {
  const navigate = useNavigate()
  const [locations, setLocations] = useState(locationsImport);
  const [products, setProducts] = useState(productsImport);

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [confirmable, setConfirmable] = useState(false);
  const [checkboxState, setCheckboxState] = useState(
    new Array(products.length).fill("unchecked")
  );
  const [finished, setFinished] = useState(false);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleCheckboxChange = (e, index) => {
    const newCheckboxState = [...checkboxState];
    newCheckboxState[index] = e.target.checked ? "checked" : "unchecked";
    setCheckboxState(newCheckboxState);
  };

  const handleConfirmClick = () => {
    const newProducts = [...products];
    newProducts.forEach((product, index) => {
      if (checkboxState[index] === "checked") {
        product.location = selectedLocation;
      }
    });
    const newCheckboxState = [...checkboxState];
    newCheckboxState.forEach((state, index) => {
      if (state === "checked") {
        newCheckboxState[index] = "disabled";
      }
    });
    setProducts(newProducts);
    setCheckboxState(newCheckboxState);
  };

  const handleCheckboxUndo = (index) => {
    const newProducts = [...products];
    newProducts[index].location = null;
    const newCheckboxState = [...checkboxState];
    newCheckboxState[index] = "unchecked";
    setProducts(newProducts);
    setCheckboxState(newCheckboxState);
  };

  useEffect(() => {
    const confirmable = checkboxState.some((state) => state === "checked");
    setConfirmable(confirmable);
  }, [checkboxState]);

  useEffect(() => {
    const finished = checkboxState.every((state) => state === "disabled");
    setFinished(finished);
  }, [checkboxState]);

  return (
    <>
      <select onChange={handleLocationChange}>{locationOptions()}</select>
      <button disabled={!confirmable} onClick={handleConfirmClick}>
        Confirm
      </button>
      <table
        style={{
          border: "1px solid black",
          textAlign: "center",
        }}
      >
        {tableHeaders()}{" "}
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              {Object.values(product).map((value, subIndex) => (
                <td key={subIndex}>{value}</td>
              ))}
              <td>
                <input
                  onChange={(e) => handleCheckboxChange(e, index)}
                  disabled={checkboxState[index] === "disabled"}
                  checked={
                    checkboxState[index] === "checked" ||
                    checkboxState[index] === "disabled"
                  }
                  type="checkbox"
                />
                {checkboxState[index] === "disabled" ? (
                  <>
                    <button
                      onClick={() => {
                        handleCheckboxUndo(index);
                      }}
                    >
                      Undo
                    </button>
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        disabled={!finished}
        onClick={() => {
          navigate('/dashboard')
        }}
      >
        Finished
      </button>

      <div>
        <p>Selected Location: {selectedLocation.toString()}</p>
        <p>Confirmable: {confirmable.toString()}</p>
        <p>Checkbox State: {checkboxState.toString()}</p>
      </div>
    </>
  );
};

export default Wearhousing;
