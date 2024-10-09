import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// CO2 (g) production per kilometer
const transportOptions = [
  { label: "Car", co2PerKm: 100 },
  { label: "Hybrid Car", co2PerKm: 70 },
  { label: "Bus", co2PerKm: 50 },
  { label: "Train", co2PerKm: 20 },
  { label: "Airplane", co2PerKm: 120 },
];

function TransportUsage({
  open,
  handleClose,
  transportsEmissions,
  setTransportsEmission,
}) {
  const [transportType, setTransportType] = useState(
    transportOptions[0].co2PerKm
  );
  const [distance, setDistance] = useState(0);

  const handleTransportChange = (event) => {
    const selectedOption = transportOptions.find(
      (option) => option.label === event.target.value
    );
    setTransportType(selectedOption.co2PerKm);
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const handleSubmit = useCallback(() => {
    if (!distance || distance <= 0) {
      alert("All fields are required");
      return;
    }

    if (!distance || distance <= 0) {
      alert("All fields are required");
      return;
    }

    const co2Produced = distance * transportType * 0.001;
    setTransportsEmission((prev) =>
      (parseFloat(prev) + co2Produced).toFixed(2)
    );
    handleClose();
  }, [transportType, distance]);

  useEffect(() => {
    setDistance(0);
    setTransportType(transportOptions[0].co2PerKm);
  }, [transportsEmissions]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Transport Usage</h2>
        <FormControl fullWidth margin="normal">
          <InputLabel color="success">Type</InputLabel>
          <Select
            color="success"
            defaultValue={transportOptions[0].label}
            onChange={handleTransportChange}
            style={{ marginTop: "10px" }}
          >
            {transportOptions.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          color="success"
          label="Distance Traveled (km)"
          type="number"
          fullWidth
          value={distance}
          onChange={handleDistanceChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          style={{ marginTop: "1rem" }}
        >
          <SaveAltIcon style={{ marginRight: ".2rem" }} /> Save
        </Button>
      </Box>
    </Modal>
  );
}

export default TransportUsage;
