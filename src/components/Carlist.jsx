// 4. create basic empty component (function, return, export default)
// 5. create functionality
// 6. create state for fetched cars (empty array, see documentation)
// 7. implement fetch functionality
// 8. import useEffect, and inside of it call fetchCars function, so it's called once
// and gives you the opportunity of calling it again
// 9. import Carlist to App to render it (go back to App.jsx)

// 12. check AgGrid documentation and add imports
// 13. create columnDefs state for AgGrid, enable sorting and filter
// 14. render AgGrid (go back to App.jsx)

// 17. render delete button on each row w/ cellRenderer inside columnDefs state
// 18. create deleteCar function
// 19. refine params passed to deleteCar inside cellRenderer
// 20. import Button from mui and modify it in cellRenderer
// 21. modify deleteCar so that it gets passsed the car url and set method as DELETE
// 22. add confirmation before deleting car by adding window.confirm
// 23. add message to the user to confirm deletion w/ snackbar from MUI
// 24. you also need open boolean state (a flag for the message to appear)
// 25. you can also set duration in milliseconds
// 26. set open state to true in deleteCar if response status is ok
// ---
// NEW LESSON
// hardcoded stuff is bad, no hardcoded url in the fetch function
// you need enviroment variables --> check vite documentation
// 27. create .env file in the project's root level and add one with url (nothing after .com)
// 28. modify fetch url with enviromental variable
// 29. create new component AddCar.jsx

// 43. import EditCar
// 44. create edit button --> will call EditCar component when pressed
// it's inside columnDefs

import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Snackbar, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Addcar from "./Addcar";
import Editcar from "./Editcar";

function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  const [columnDefs] = useState([
    { field: "brand", sortable: true, filter: true },
    { field: "model", sortable: true, filter: true },
    { field: "color", sortable: true, filter: true },
    { field: "fuel", sortable: true, filter: true, width: 100 },
    { field: "year", sortable: true, filter: true, width: 100 },
    { field: "price", sortable: true, filter: true, width: 100 },
    {
      cellRenderer: (row) => <Editcar updateCar={updateCar} car={row.data} />,
      width: 150,
    },
    {
      width: 150,
      cellRenderer: (params) => (
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          size="small"
          onClick={() => deleteCar(params.data._links.car.href)}
        >
          Delete
        </Button>
      ),
    },
  ]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    fetch("https://carrestapi.herokuapp.com/cars")
      .then((response) => {
        if (!response.ok)
          throw new Error("Something went wrong: " + response.statusText);

        return response.json();
      })
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

  const deleteCar = (url) => {
    console.log(url);
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" }).then((response) => {
        if (!response.ok) {
          throw new Error("Error in deletion: " + response.statusText);
        } else {
          setOpen(true);
          fetchCars();
        }
      });
    }
  };

  const saveCar = (car) => {
    fetch("https://carrestapi.herokuapp.com/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => fetchCars())
      .catch((err) => console.error(err));
  };

  const updateCar = (car, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => fetchCars())
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="ag-theme-material" style={{ width: "90%", height: 600 }}>
        <AgGridReact
          rowData={cars}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
      <Addcar saveCar={saveCar} />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Car deleted successfully"
      />
    </>
  );
}

export default Carlist;
