import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';

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

const Wearhousing = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState(locationsImport);
  const [products, setProducts] = useState(productsImport);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [confirmable, setConfirmable] = useState(false);
  const [checkboxState, setCheckboxState] = useState(new Array(products.length).fill("unchecked"));
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
    <Container         sx={{
      marginTop: 2,
      maxWidth: 600,
      margin: "auto",
    }}>
      <FormControl>
        <Select value={selectedLocation} onChange={handleLocationChange}>
          {locations.map((location, index) => (
            <MenuItem key={index} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button disabled={!confirmable} onClick={handleConfirmClick} variant="contained">Confirm</Button>
      <TableContainer

      >
        <Table>
          <TableHead>
            <TableRow>

              <TableCell>Checkbox</TableCell>
              {Object.keys(products[0]).map((key, index) => (
                <TableCell key={index}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>

                <TableCell>
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(e, index)}
                    disabled={checkboxState[index] === "disabled"}
                    checked={
                      checkboxState[index] === "checked" ||
                      checkboxState[index] === "disabled"
                    }
                  />
                  {checkboxState[index] === "disabled" && (
                    <Button onClick={() => handleCheckboxUndo(index)} variant="outlined">Undo</Button>
                  )}
                </TableCell>
                {Object.values(product).map((value, subIndex) => (
                  <TableCell key={subIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        disabled={!finished}
        onClick={() => {
          navigate('/dashboard')
        }}
        variant="contained"
      >
        Finished
      </Button>
    </Container>
  );
};

export default Wearhousing;
