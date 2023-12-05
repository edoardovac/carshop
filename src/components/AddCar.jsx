// 30. copy and adapt code from mui/form dialog
// 31. render compoent in Carlist.jsx
// 32. modify form content so that it asks for everything it needs
// 33. create car state
// 34. modify dialogcontent w/ one textfield for each field
// 35. check on browser that everything is correct
// 36. send post request to backend
// 37. create new fuction handleSave()
// 38. you need url, method, headers and body as attributes of the fetch method
// car needs to be in JSON form
// handle errors
// to re-render cars use props
// then close the form
// 39. edit functionality --> create new component EditCar.jsx

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function AddCar(props) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    year: "",
    price: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const addCar = () => {
    props.saveCar(car);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        Add Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="brand"
            value={car.brand}
            onChange={(e) => handleInputChange(e)}
            label="Brand"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="model"
            value={car.model}
            onChange={(e) => handleInputChange(e)}
            label="Model"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="color"
            value={car.color}
            onChange={(e) => handleInputChange(e)}
            label="Color"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="year"
            value={car.year}
            onChange={(e) => handleInputChange(e)}
            label="Year"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="fuel"
            value={car.fuel}
            onChange={(e) => handleInputChange(e)}
            label="Fuel"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="price"
            value={car.price}
            onChange={(e) => handleInputChange(e)}
            label="Price"
            type="name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCar}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;
